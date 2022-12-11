class Pizza {
  constructor(menu) {
    this.menu = menu;
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
    if (this.menu.crusts[this.crust].premium) {
      return this.menu.prices.crust.premium[this.size];
    } else {
      return this.menu.prices.crust.regular[this.size];
    }
  }
  toppingPrice() {
    let total = 0;
    self = this;
    this.fullToppings.forEach(function(topping) {
      if (self.menu.toppings[topping].premium) {
        total += self.menu.prices.topping.premium[self.size];
      } else {
        total += self.menu.prices.topping.regular[self.size];
      }
    });
    [this.leftToppings, this.rightToppings].forEach(function(side) {
      side.forEach(function(topping) {
        console.log(topping)
        console.log(self.menu)
        if (self.menu.toppings[topping].premium) {
          total += self.menu.prices.topping.premium[self.size] - .5;
        } else {
          total += self.menu.prices.topping.regular[self.size] - .5;
        }
      });
    });
    return total;
  }
  computePrice() {
    return this.crustPrice() + this.toppingPrice();
  }
}

function loadCrusts(menu) {
  const crustArea = document.getElementById('crust-area');
  for (const crust in menu.crusts) {
    const radio = document.createElement('input');
    radio.setAttribute('type', 'radio');
    radio.setAttribute('value', crust)
    radio.setAttribute('id', crust)
    radio.setAttribute('name', 'crust-selection')
    if (crust === 'handTossed') {
      radio.setAttribute('checked', true);
    }
    const label = document.createElement('label');
    label.setAttribute('for', crust);
    label.append(menu.crusts[crust].name);
    crustArea.append(radio);
    crustArea.append(label);
    const br = document.createElement('br');
    crustArea.append(br);
    const p = document.createElement('p');
    p.append(menu.crusts[crust].description);
    crustArea.append(p);
  }
}

function loadSauces(menu) {
  const sauceArea = document.getElementById('sauce-area');
  for (const sauce in menu.sauces) {
    const radio = document.createElement('input');
    radio.setAttribute('type', 'radio');
    radio.setAttribute('value', sauce)
    radio.setAttribute('id', sauce)
    radio.setAttribute('name', 'sauce-selection')
    if (sauce === 'tomato') {
      radio.setAttribute('checked', true);
    }
    const label = document.createElement('label');
    label.setAttribute('for', sauce);
    label.append(menu.sauces[sauce].name);
    sauceArea.append(radio);
    sauceArea.append(label);
    const br = document.createElement('br');
    sauceArea.append(br);
    const p = document.createElement('p');
    p.append(menu.sauces[sauce].description);
    sauceArea.append(p);
  }
}

function loadToppings(menu) {
  const toppingArea = document.getElementById('topping-area');

  function toppingRow (topping) {
    const row = document.createElement('div');
    row.classList.add('topping-row');

    const left = document.createElement('div');
    left.classList.add('pizza-segment');
    const leftRadio = document.createElement('input');
    leftRadio.setAttribute('type', 'radio');
    leftRadio.setAttribute('name', topping);
    leftRadio.setAttribute('value', 'left');
    left.append(leftRadio);
    row.append(left);

    const full = document.createElement('div');
    full.classList.add('pizza-segment');
    const fullRadio = document.createElement('input');
    fullRadio.setAttribute('type', 'radio');
    fullRadio.setAttribute('name', topping);
    fullRadio.setAttribute('value', 'full');
    full.append(fullRadio);
    row.append(full);

    const right = document.createElement('div');
    right.classList.add('pizza-segment');
    const rightRadio = document.createElement('input');
    rightRadio.setAttribute('type', 'radio');
    rightRadio.setAttribute('name', topping);
    rightRadio.setAttribute('value', 'right');
    right.append(rightRadio);
    row.append(right);

    const toppingName = document.createElement('div');
    toppingName.classList.add('topping-label');
    toppingName.append(menu.toppings[topping].name);
    if (menu.toppings[topping].type === 'vegan') {
      toppingName.append('🌱')
    }
    if (menu.toppings[topping].premium) {
      toppingName.append('⭐')
    }
    row.append(toppingName);

    return row;
  }
  for (const topping in menu.toppings) {
    const row = toppingRow(topping)
    toppingArea.append(row);
  }
}

function loadFields(menu) {
  loadCrusts(menu);
  loadSauces(menu);
  loadToppings(menu);
  const inputs = document.getElementsByTagName('input');

  for (const input of inputs) {
    input.addEventListener("click", function() {
      pizzaSelectionHandler(event, menu);
    });
  }
  pizzaSelectionHandler(event, menu)
}

async function readMenu() {
  const menuUrl = './data/menu.json';
  const request = new Request(menuUrl);
  const response = await fetch(request);
  const menu = await response.json();
  return menu;
}

function pizzaSelectionHandler (event, menu) {
  const pizza = new Pizza(menu);
  function updatePizza () {
    pizza.size = document.querySelector('input[name="size-selection"]:checked').value;
    pizza.crust = document.querySelector('input[name="crust-selection"]:checked').value;
    for (const topping in menu.toppings) {
      const field = document.querySelector(`input[name="${topping}"]:checked`);
      if (field) {
        if (field.value === 'left') {
          pizza.leftToppings.add(topping)
        } else if (field.value === 'right') {
          pizza.rightToppings.add(topping)
        } else if (field.value === 'full') {
          pizza.fullToppings.add(topping)
        }

      }
    }
  }

  updatePizza(pizza, menu);
  const price = pizza.computePrice();
  document.getElementById('price').innerText = `Price: ${price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })}`;
}

window.onload = function() {
  readMenu()
  .then(menu => loadFields(menu));



}