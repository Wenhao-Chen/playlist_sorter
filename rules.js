function loadRules(key, callback) {
    chrome.storage.sync.get([key], (res) => {
        const rules = res[key]
        callback(rules)
    })
}

function loadTitleRules(callback) {
    loadRules("titleRules", callback)
}

function loadArtistRules(callback) {
    loadRules("artistRules", callback)
}

function setTitleRules(rules, callback) {
    chrome.storage.sync.set({"titleRules": rules}, ()=>{
        callback()
    })
}

function setArtistRules(rules, callback) {
    chrome.storage.sync.set({"artistRules": rules}, ()=>{
        callback()
    })
}

function addTitleRule(title, newTitle, newArtist, callback) {
    loadTitleRules((rules)=>{
        var newRules = rules? rules: {}
        newRules[title] = [newTitle, newArtist]
        chrome.storage.sync.set({"titleRules": newRules}, ()=>{
            callback(newRules)
        })
    })
}

function addArtistRule(artist, newArtist, callback) {
    loadArtistRules((rules)=>{
        var newRules = rules? rules: {}
        newRules[artist] = newArtist
        chrome.storage.sync.set({"artistRules": newRules}, ()=>{
            callback(newRules)
        })
    })
}

function removeTitleRule(title, callback) {
    loadTitleRules((rules)=>{
        if (rules && rules[title]) {
            var newRules = rules
            delete newRules[title]
            chrome.storage.sync.set({"titleRules": newRules}, ()=>{
                callback(newRules)
            })
        }
    })
}

function removeArtistRule(artist, callback) {
    loadArtistRules((rules)=>{
        if (rules && rules[artist]) {
            var newRules = rules
            delete newRules[artist]
            chrome.storage.sync.set({"artistRules": newRules}, ()=>{
                callback(newRules)
            })
        }
    })
}