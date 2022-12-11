class Pizza {
  constructor() {
    this.size = "large";
    this.crust = menu.crusts.handTossed;
    this.sauce = menu.sauces.tomato;
    this.fullToppings = new Set();
    this.leftToppings = new Set();
    this.rightToppings = new Set();
  }
}

window.onload = function() {
  fetch('./data/menu.json')
    .then(response => response.json())
    .then(data => menu = data)
    .catch(error => console.log(error));
}