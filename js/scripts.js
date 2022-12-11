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
  crustPrice() {
    if (this.crust.premium) {
      return menu.prices.crust.premium[this.size];
    } else {
      return menu.prices.crust.regular[this.size];
    }
  }
  toppingPrice() {
    let total = 0;
    self = this;
    this.fullToppings.forEach(function(topping) {
      if (topping.premium) {
        total += menu.prices.topping.premium[self.size];
      } else {
        total += menu.prices.topping.regular[self.size];
      }
    });
    [this.leftToppings, this.rightToppings].forEach(function(side) {
      side.forEach(function(topping) {
        if (topping.premium) {
          total += menu.prices.topping.premium[self.size] - .5;
        } else {
          total += menu.prices.topping.regular[self.size] - .5;
        }
      });
    });
    return total;
  }
  computePrice() {
    return this.crustPrice() + this.toppingPrice();
  }
}

window.onload = function() {
  fetch('./data/menu.json')
    .then(response => response.json())
    .then(data => menu = data)
    .catch(error => console.log(error));
}