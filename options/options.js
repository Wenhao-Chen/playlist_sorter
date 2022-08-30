let arrowString = "    =>    "

let titleRuleTable = document.getElementById("titleRules")
let artistRuleTable = document.getElementById("artistRules")

function showTitleRule(originalTitle, newTitle, newArtist) {
    var newRow = document.createElement("tr")
    var td1 = document.createElement("td")
    td1.textContent = originalTitle
    newRow.appendChild(td1)

    const arrow = document.createElement("td")
    arrow.textContent = arrowString
    newRow.appendChild(arrow)

    var td2 = document.createElement("td")
    td2.textContent = newTitle
    newRow.appendChild(td2)

    var td3 = document.createElement("td")
    td3.textContent = newArtist
    newRow.appendChild(td3)

    var td4 = document.createElement("td")
    var b = document.createElement("button")
    b.textContent = "-"
    b.addEventListener("click", () => {
        removeTitleRule(originalTitle, ()=>{
            titleRuleTable.removeChild(newRow)
        })
    })
    td4.appendChild(b)
    newRow.appendChild(td4)

    if (titleRuleTable.childElementCount > 1) {
        titleRuleTable.insertBefore(newRow, titleRuleTable.lastChild)
    } else {
        titleRuleTable.appendChild(newRow)
    }
}

function showArtistRule(originalArtist, newArtist) {
    var newRow = document.createElement("tr")

    var td1 = document.createElement("td")
    td1.textContent = originalArtist
    newRow.appendChild(td1)

    const arrow = document.createElement("td")
    arrow.textContent = arrowString
    newRow.appendChild(arrow)

    var td2 = document.createElement("td")
    td2.textContent = newArtist
    newRow.appendChild(td2)

    var td3 = document.createElement("td")
    var b = document.createElement("button")
    b.textContent = "-"
    b.addEventListener("click", () => {
        removeArtistRule(originalArtist, ()=>{
            artistRuleTable.removeChild(newRow)
        })
    })
    td3.appendChild(b)
    newRow.appendChild(td3)

    if (artistRuleTable.childElementCount > 1) {
        artistRuleTable.insertBefore(newRow, artistRuleTable.lastChild)
    } else {
        artistRuleTable.appendChild(newRow)
    }
}

loadTitleRules((rules)=>{
    if (rules) {
        let titles = Object.getOwnPropertyNames(rules)
        document.getElementById("h3_titleRules").textContent = "Title Rules (count: "+titles.length+")"
        titles.forEach(title=>{
            const info = rules[title]
            showTitleRule(title, info[0], info[1])
        })
    }
})

loadArtistRules((rules)=>{
    if (rules) {
        let artists = Object.getOwnPropertyNames(rules)
        document.getElementById("h3_artistRules").textContent = "Artist Name Rules (count: "+artists.length+")"
        artists.forEach(artist=>{
            showArtistRule(artist, rules[artist])
        })
    }
})

document.getElementById("b_title").addEventListener("click", () => {

    let i1 = document.getElementById("originalTitle")
    let i2 = document.getElementById("newTitle")
    let i3 = document.getElementById("newArtist1")
    let originalTitle = i1.value
    let newTitle = i2.value
    let newArtist = i3.value

    if (originalTitle.trim() == "") {
        return
    }

    i1.value = ""
    i2.value = ""
    i3.value = ""

    addTitleRule(originalTitle, newTitle, newArtist, ()=>{
        showTitleRule(originalTitle, newTitle, newArtist)
    })
})


document.getElementById("b_artist").addEventListener("click", () => {

    let i1 = document.getElementById("originalArtist")
    let i2 = document.getElementById("newArtist2")
    let originalArtist = i1.value
    let newArtist = i2.value

    if (originalArtist.trim() == "") {
        return
    }

    i1.value = ""
    i2.value = ""

    addArtistRule(originalArtist, newArtist, ()=>{
        showArtistRule(originalArtist, newArtist)
    })
})

// Down arrow:  &#9660; 25BC
// Up arrow:    &#9650; 25B2
let header_originalTitle = document.getElementById("header_originalTitle")
let header_newTitle = document.getElementById("header_newTitle")
let header_newArtist1 = document.getElementById("header_newArtist1")
let header_originalArtist = document.getElementById("header_originalArtist")
let header_newArtist2 = document.getElementById("header_newArtist2")


header_originalTitle.addEventListener("click", () => {
    header_originalTitle.textContent = "Original Title" + " \u25BC"
    header_newTitle.textContent = "New Title"
    header_newArtist1.textContent = "New Artist Name"
    sortTitleRules(0)
})

header_newTitle.addEventListener("click", () => {
    header_originalTitle.textContent = "Original Title"
    header_newTitle.textContent = "New Title" + " \u25BC"
    header_newArtist1.textContent = "New Artist Name"
    sortTitleRules(2)
})

header_newArtist1.addEventListener("click", () => {
    header_originalTitle.textContent = "Original Title"
    header_newTitle.textContent = "New Title"
    header_newArtist1.textContent = "New Artist Name" + " \u25BC"
    sortTitleRules(3)
})

function sortTitleRules(header) {
    let allRows = titleRuleTable.childNodes;
    if (allRows && allRows.length > 1) {
        let child0 = allRows[0]
        let child1 = allRows[1]
        let rules = []
        for (var i=2; i<allRows.length; i++) {
            rules.push(allRows[i])
        }
        
        titleRuleTable.innerHTML = ""
        titleRuleTable.appendChild(child0)
        titleRuleTable.appendChild(child1)

        rules.sort((r1,r2)=>{
            return r1.childNodes[header].textContent.localeCompare(r2.childNodes[header].textContent)
        }).forEach(r=>{
            titleRuleTable.appendChild(r)
        })
    }
}

header_originalArtist.addEventListener("click", () => {
    header_originalArtist.textContent = "Original Artist Name" + " \u25BC"
    header_newArtist2.textContent = "New Artist Name"
    sortArtistRules(0)
})

header_newArtist2.addEventListener("click", () => {
    header_originalArtist.textContent = "Original Artist Name"
    header_newArtist2.textContent = "New Artist Name" + " \u25BC"
    sortArtistRules(2)
})

function sortArtistRules(header) {
    let allRows = artistRuleTable.childNodes;
    if (allRows && allRows.length > 1) {
        let child0 = allRows[0]
        let child1 = allRows[1]
        let rules = []
        for (var i=2; i<allRows.length; i++) {
            rules.push(allRows[i])
        }
        
        artistRuleTable.innerHTML = ""
        artistRuleTable.appendChild(child0)
        artistRuleTable.appendChild(child1)

        rules.sort((r1,r2)=>{
            return r1.childNodes[header].textContent.localeCompare(r2.childNodes[header].textContent)
        }).forEach(r=>{
            artistRuleTable.appendChild(r)
        })
    }
}

header_newArtist1.click()
header_newArtist2.click()