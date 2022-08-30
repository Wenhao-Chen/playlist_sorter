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
        removeTitleRule(originalTitle, (newRules)=>{
            titleRuleTable.removeChild(newRow)
            console.log(newRules)
            updateTitleRulesCount(Object.getOwnPropertyNames(newRules).length)
        })
    })
    td4.appendChild(b)
    newRow.appendChild(td4)

    if (titleRuleTable.childElementCount > 2) {
        titleRuleTable.insertBefore(newRow, titleRuleTable.childNodes[2])
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
        removeArtistRule(originalArtist, (newRules)=>{
            artistRuleTable.removeChild(newRow)
            updateArtistRulesCount(Object.getOwnPropertyNames(newRules).length)
        })
    })
    td3.appendChild(b)
    newRow.appendChild(td3)

    if (artistRuleTable.childElementCount > 2) {
        artistRuleTable.insertBefore(newRow, artistRuleTable.childNodes[2])
    } else {
        artistRuleTable.appendChild(newRow)
    }
}

function updateTitleRulesCount(count) {
    document.getElementById("h3_titleRules").textContent = "Title Rules (count: "+count+")"
}

function updateArtistRulesCount(count) {
    document.getElementById("h3_artistRules").textContent = "Artist Rules (count: "+count+")"
}

function resetTable(table) {
    let allRows = table.childNodes;
    let child0 = allRows[0]
    let child1 = allRows[1]

    table.innerHTML = ""
    table.appendChild(child0)
    table.appendChild(child1)
}

function showTitleRules(rules) {
    let titles = Object.getOwnPropertyNames(rules)
    resetTable(titleRuleTable)
    titles.forEach(title=>{
        const info = rules[title]
        showTitleRule(title, info[0], info[1])
    })
    updateTitleRulesCount(titles.length)
}

function showArtistRules(rules) {
    let artists = Object.getOwnPropertyNames(rules)
    resetTable(artistRuleTable)
    artists.forEach(artist=>{
        showArtistRule(artist, rules[artist])
    })
    updateArtistRulesCount(artists.length)
}

loadTitleRules((rules)=>{
    if (rules) {
        showTitleRules(rules)
    }
})

loadArtistRules((rules)=>{
    if (rules) {
        showArtistRules(rules)
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

    addTitleRule(originalTitle, newTitle, newArtist, (newRules)=>{
        showTitleRule(originalTitle, newTitle, newArtist)
        updateTitleRulesCount(newRules.length)
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

    addArtistRule(originalArtist, newArtist, (newRules)=>{
        showArtistRule(originalArtist, newArtist)
        updateArtistRulesCount(newRules.length)
    })
})


/* Sorting */
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

/* Import and Export */
function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

document.getElementById("export_titleRules").addEventListener("click",()=>{
    loadTitleRules((rules)=>{
        if (rules) {
            download(JSON.stringify(rules), "title_rules.json", 'text/plain')
        }
    })
})

document.getElementById("import_titleRules").addEventListener("click",()=>{
    document.getElementById("upload_titleFile").click()
})

document.getElementById("export_artistRules").addEventListener("click",()=>{
    loadArtistRules((rules)=>{
        if (rules) {
            download(JSON.stringify(rules), "artist_rules.json", 'text/plain')
        }
    })
})

document.getElementById("import_artistRules").addEventListener("click",()=>{
    document.getElementById("upload_artistFile").click()
})

function importJSON(e, callback) {
    var uploadedFile = e.target.files[0];
    if (!uploadedFile) {return}
    if (uploadedFile.type != "application/json") {
        alert("Not a valid JSON file")
        return
    }
    console.log("file uploaded: "+uploadedFile.name)
    var reader = new FileReader()
    reader.onload = (ev)=>{
        let obj = JSON.parse(ev.target.result)
        console.log("json parsed:")
        console.log(obj)
        callback(obj)
    }
    reader.onerror = (ev)=>{
        console.log("error occured while reading file "+uploadedFile.name)
    }
    reader.readAsText(uploadedFile)
}
document.getElementById("upload_titleFile").addEventListener("change",(e)=>{
    importJSON(e, obj=>{
        setTitleRules(obj, ()=>{
            showTitleRules(obj)
            header_newArtist1.click()
            document.getElementById("upload_titleFile").value = ''
        })
    })
})

document.getElementById("upload_artistFile").addEventListener("change",(e)=>{
    importJSON(e, obj=>{
        setArtistRules(obj, ()=>{
            showArtistRules(obj)
            header_newArtist2.click()
            document.getElementById("upload_artistFile").value = ''
        })
    })
})