let sortFunc = (sortField, sortOrder, titleRules, artistRules) => {
  let container = document.querySelector("div#contents.style-scope.ytmusic-playlist-shelf-renderer")
  if (container.childNodes.length == 99) {
    alert("There are 99 songs currently listed. Please scroll down and re-run if there are more than 99 songs.")
  }
  var songNames = {}
  var duplicatedSongs = []
  // collect songs into array
  var songs = []
  container.childNodes.forEach(card => {
    let titleElement = card.querySelector("div.title-column yt-formatted-string[title]")
    let title = titleElement.getAttribute("title")
    let metaInfo = card.querySelectorAll("div.secondary-flex-columns yt-formatted-string[title]")
    let artistElement = metaInfo[0]
    let artist = artistElement.getAttribute("title")
    let album = metaInfo.length > 1 ? metaInfo[1].getAttribute("title") : " "
    console.log(`[${title}] [${artist}] [${album}]`)
    if (title in titleRules) {
      let newInfo = titleRules[title]
      console.log(`=== modifying song [${title}] with title [${newInfo[0]}] and artist [${newInfo[1]}]`)
      title = newInfo[0]
      artist = newInfo[1]
      titleElement.querySelector("a").textContent = title
      artistElement.querySelector("a").textContent = artist
    }
    if (artist in artistRules) {
      let newName = artistRules[artist]
      console.log(`=== modifying artist name [${artist}] with [${newName}]`)
      artist = newName
      artistElement.querySelector("a").textContent = artist
    }
    let uniqueName = title + "-" + artist
    if (uniqueName in songNames) {
      duplicatedSongs.push(uniqueName)
    } else {
      songNames[uniqueName] = 1
    }
    songs.push({
      t: title.replace(/[[ (]/, "").trim(),
      a: artist.replace(/[[ (]/, "").trim(),
      ab: album,
      c: card
    })
  });
  // Sort by song: title > artist > album
  // Sort by artist: artist > album > title
  songs.sort((s1, s2) => {
    var res = 0
    if (sortField == "Song") {
      res = s1.t.localeCompare(s2.t)
      if (res == 0) { res = s1.a.localeCompare(s2.a) }
      if (res == 0) { res = s1.ab.localeCompare(s2.ab) }
    } else {
      res = s1.a.localeCompare(s2.a)
      if (res == 0) { res = s1.ab.localeCompare(s2.ab) }
      if (res == 0) { res = s1.t.localeCompare(s2.t) }
    }
    return sortOrder == "Ascending" ? res : -res;
  })
  // re-order the DOM
  container.innerHTML = ""
  songs.forEach(song => {
    container.appendChild(song.c)
  });
  // report duplicated songs
  if (duplicatedSongs.length > 0) {
    alert("Duplicated songs:" + duplicatedSongs.join(", "))
  }
}

const sortButton = document.getElementById("sortButton");
if (sortButton) {
  sortButton.onclick = function () {
    const sortField = document.querySelector("input[name='sortField']:checked").value
    const sortOrder = document.querySelector("input[name='sortOrder']:checked").value
    chrome.tabs.query({ active: true, currentWindow: true }).then(([tab]) => {
      if (!tab.url.startsWith("https://music.youtube.com/playlist?")) {
        console.log("Not a youtube music playlist page")
        return
      }
      loadTitleRules((titleRules) => {
        loadArtistRules((artistRules) => {
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            args: [sortField, sortOrder, titleRules?? {}, artistRules?? {}],
            func: sortFunc
          }, () => {
            window.close();
          });
        })
      })

    })
  };
}