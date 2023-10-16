import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

//Firebase credentials
const appSettings = {
    databaseURL: "https://quick-cart-9316c-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const cartDB = ref(database, "cart")

//DOM elements
const inputEl = document.getElementById("input-el")
const addEl = document.getElementById('btn-add')
const listEl = document.getElementById("list-el")

addEl.addEventListener("click", () => {
    let inputValue = inputEl.value

    // push(cartDB, inputValue)
    // console.log(`${inputValue} added to database`)
    // addListEl(inputValue)
    clearInputEl()
})

function addListEl(item) {
    // listEl.innerHTML += `<li>${itemValue}</li>`
    let itemID = item[0]
    let itemValue = item[1]

    let newEL = document.createElement("li")
    newEL.textContent = itemValue
    listEl.append(newEL)
}

function clearInputEl() {
    inputEl.value = ''
}

function clearListEl() {
    listEl.innerHTML = ""
}

onValue(cartDB, (snapshot) => {
    let itemsArray = Object.entries(snapshot.val())

    clearListEl()
    for(let i = 0; i < itemsArray.length; i++){
        let currentItem = itemsArray[i]
        let currentItemID = currentItem[0]
        let currentItemValue = currentItem[1]

        addListEl(currentItem)
    }
})
