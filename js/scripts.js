class Pizza {
  constructor() {
    this.size = "large";
    this.crust = menu.crusts.handTossed;
    this.sauce = menu.sauces.tomato;
    this.fullToppings = new Set();
    this.leftToppings = new Set();
    this.rightToppings = new Set();
  }
  reconcileSides() {
    const intersection = new Set(
      [...this.leftToppings].filter((topping) => this.rightToppings.has(topping))
    );
    intersection.forEach(topping => this.fullToppings.add(topping));
    this.leftToppings = new Set(
      [...this.leftToppings].filter(topping => !this.fullToppings.has(topping))
    );
    this.rightToppings = new Set(
      [...this.rightToppings].filter(topping => !this.fullToppings.has(topping))
    );
  }
}

window.onload = function() {
  fetch('./data/menu.json')
    .then(response => response.json())
    .then(data => menu = data)
    .catch(error => console.log(error));
}