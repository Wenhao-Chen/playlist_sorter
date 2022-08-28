let sortFunc = (sortField, sortOrder, tab) => {
    //alert("hello again "+sortField+" "+sortOrder+" "+tab.id+" "+tab.url)
    
}

const sortButton = document.getElementById("sortButton");
if (sortButton) {
  sortButton.onclick = function() {
    const sortField = document.querySelector("input[name='sortField']:checked").value
    const sortOrder = document.querySelector("input[name='sortOrder']:checked").value
    chrome.tabs.query({active: true, currentWindow: true}).then(([tab])=>{
        if (!tab.url.startsWith("https://music.youtube.com/playlist?")) {
            console.log("Not a youtube music playlist page")
            return
        }
        chrome.scripting.executeScript({
            target: {tabId: tab.id},
            args: [sortField, sortOrder, tab],
            func: sortFunc
        });
    })
  };
}