const URL = "http://localhost:3000/pups"

document.addEventListener("DOMContentLoaded", function() {
    fetchDogs();
    document.addEventListener("click", handleEvents)
})

function fetchDogs() {

    fetch(URL)
    .then(resp => resp.json())
    .then(json => renderDogs(json))
}

function renderDogs(data) {
    data.forEach(dog => {
        renderDog(dog)
    }) 
}

function renderDog(dog) {
    const dogBar = document.getElementById("dog-bar");
    dogBar.innerHTML += `<span class="dog-tag" data-dog-id="${dog.id}">${dog.name}</span>`
    const dogInfo = document.getElementById("dog-info")
    let addedHTML = ""
    addedHTML += `<div class="dog-info" style="display: none" id=${dog.id}>
    <img src=${dog.image}>
    <h2>${dog.name}</h2>`
    let goodStatus = `${dog.isGoodDog}`
    if (goodStatus === "true" ) {
        addedHTML += `<button>Good Dog!</button>
        </div>`
    } else {
        addedHTML += `<button>Bad Dog!</button>
        </div>`
    }
    dogInfo.innerHTML += addedHTML
}

function handleEvents(event) {
    if (event.target.className === "dog-tag") {
        const allDogs = document.getElementsByClassName("dog-info")
        for (let i=0; i<allDogs.length; i++) {
        allDogs[i].style.display = "none"
        let dogInfo = document.getElementById(`${event.target.dataset.dogId}`)
        dogInfo.style.display = "block" 
    } 
} else if (event.target.textContent === "Good Dog!") {
    dogIsBad(event.target)
} else if (event.target.textContent === "Bad Dog!") {
    dogIsGood(event.target)
} else if (event.target.id === "good-dog-filter"){
    filterDogs(event.target)
}
}

function dogIsBad(eventTarget) {
    const dogId = eventTarget.parentNode.id
    eventTarget.textContent = "Bad Dog!"
    const dogUrl = URL + '/' + dogId
    payload = {
        isGoodDog: false
    }
    reqObj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    }
    fetch(dogUrl, reqObj)
    .then(resp => resp.json())
}

function dogIsGood(eventTarget) {
    const dogId = eventTarget.parentNode.id
    eventTarget.textContent = "Good Dog!"
    const dogUrl = URL + '/' + dogId
    payload = {
        isGoodDog: true
    }
    reqObj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    }
    fetch(dogUrl, reqObj)
    .then(resp => resp.json())
}

function filterDogs(eventTarget) {
    if (eventTarget.textContent === "Filter good dogs: OFF") {
        filterDogsOn(eventTarget)
    } else {
        filterDogsOff(eventTarget)
    }
}

function filterDogsOn(eventTarget) {
    eventTarget.textContent = "Filter good dogs: ON"
    const dogTags = document.getElementsByClassName("dog-tag")
    for (let i=0; i<dogTags.length; i++) {
        let dogTagToFind = i + 1 
        let thisDiv = document.getElementById(`${dogTagToFind}`)
        let thisButton = thisDiv.querySelector("button")
        if (thisButton.textContent === "Bad Dog!") {
            dogTags[i].style.display = "none"
        }
    }
}

function filterDogsOff(eventTarget) {
    eventTarget.textContent = "Filter good dogs: OFF"
    const dogTags = document.getElementsByClassName("dog-tag")
    for (let i=0; i<dogTags.length; i++) {
            dogTags[i].style.display = "flex"
    }
}