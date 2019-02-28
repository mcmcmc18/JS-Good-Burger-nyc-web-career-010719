burgerMenu = document.querySelector('#burger-menu')
customBurgerForm = document.querySelector('#custom-burger')
myOrder = []

burgerMenu.addEventListener('click', masterEventListener)
customBurgerForm.addEventListener('submit', createCustomBurger)


document.addEventListener("DOMContentLoaded", () => {
  //Implement Your Code Here
  fetchBurgers();
})

function fetchBurgers(){
  fetch(`http://localhost:3000/burgers`)
  .then(function(response) {
   return response.json();
 })
 .then(function(myJson) {
   console.log(JSON.stringify(myJson));
   allBurgers = myJson
   displayBurgers(allBurgers)
 });
} // end fetch function

function displaySingleBurger(burger){
  burgerMenu.innerHTML += `<div class="burger">
  <h3 class="burger_title">${burger.name}</h3>
    <img src="${burger.image}">
    <p class="${burger.description}">
      What a Good Burger!
    </p>
    <button class="button" data-action="add-burger" data-id="${burger.id}">Add to Order</button></div>`
} // end of single burger func

function displayBurgers(burgers){
  burgerMenu.innerHTML = ""
  burgers.forEach(function(e){
    displaySingleBurger(e)
  })
} // end of display burgers func

function masterEventListener(e){
  e.preventDefault()
  if (e.target.dataset.action == "add-burger"){
    addBurgerToOrder(e)
  }
}

function addBurgerToOrder(e){
  orderList = document.querySelector('#order-list')
  let burger = allBurgers.find(burger => burger.id == e.target.dataset.id)
  myOrder.push(burger)
  renderBurgerToOrder(myOrder)
}

function renderBurgerToOrder(myOrder){
  orderList.innerHTML = ""
  myOrder.forEach(function(burger){
  orderList.innerHTML += `<li>${burger.name}</li>`
  })
}

function createCustomBurger(e){
  e.preventDefault()
  let name = customBurgerForm.querySelector('#burger-name').value
  let description = customBurgerForm.querySelector('#burger-description').value
  let image = customBurgerForm.querySelector('#burger-image').value
  let data = {
    name: name,
    description: description,
    image: image
  }
    fetch(`http://localhost:3000/burgers`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data),
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      console.log(JSON.stringify(myJson));
      newBurger = myJson
      myOrder.push(newBurger)
      allBurgers.push(newBurger)
      displayBurgers(allBurgers)
      renderBurgerToOrder(myOrder)
    });

} //end of createCustomBurger func
