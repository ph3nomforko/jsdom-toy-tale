const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  const addToyForm = document.querySelector(".add-toy-form");
  addToyForm.addEventListener("submit", addNewToy);
  fetchToys()
  addNewToy()
});

function fetchToys() {
  fetch("http://localhost:3000/toys")
 .then(response => response.json())
 .then(json => showToys(json));
}

function showToys(json) {
 let toyCollection = document.getElementById("toy-collection")
 json.forEach(element => {
   let cardDiv = document.createElement("div")
   cardDiv.className = "card"
   let button = document.createElement("button")
   button.className = "like-btn"
   button.id = element.id
   button.innerText = "Like Me!"
   button.addEventListener("click", function(event) {
     addLikes(event)
   })
   let h2 = document.createElement("h2")
   h2.innerHTML = element.name
   let img = document.createElement("img")
   img.src = element.image
   img.alt = element.name
   img.className = "toy-avatar"
   let p = document.createElement("p")
   p.innerText = `${element.likes} Likes`

   cardDiv.append(h2, img, button, p)
   toyCollection.appendChild(cardDiv)
 });
}

function addNewToy(event) {
  fetch('http://localhost:3000/toys/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': "application/json"
    },
    body: JSON.stringify({
      name: `${event.target.name.value}`,
      image: `${event.target.image.value}`,
      likes: 0
    })
  })
    .then(resp => resp.json())
    .then(showToys)
}

function addLikes(event) {
   let likeToAdd = document.getElementById(event.target.id)
   let int = parseInt(likeToAdd.nextSibling.innerText[0])
   let numToUpdate = int + 1
   console.log("int", int)
   event.preventDefault()
    fetch(`http://localhost:3000/toys/${int}`, {
     method: "PATCH",
     headers: 
     {
       "Content-Type": "application/json",
       Accept: "application/json"
     }, 
     body: JSON.stringify({
       "likes": numToUpdate
     })
   })
   .then(response => response.json())
   .then(json =>  {likeToAdd.nextSibling.innerText = `${json.likes} likes`})
 }
