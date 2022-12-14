# _EPIC Pizza_

#### By _**Cameron Abel**_

#### _A JS Exercise on Objects_

## Technologies Used

- HTML
- CSS
- JavaScript

## Description

A test site for calculating pizza prices.

## Setup/Installation Requirements

This site may be accessed on [GitHub pages](https://cameronabel.github.io/epic-pizza/). To host this site locally:

- Clone this repository to your local machine
- Navigate to the top level directory
- Open `index.html` in your browser

Once active, make your pizza selections and see your price in the lower right corner.

## Known Bugs

- Currently no way to clear a topping
- Topping half labels dont always play nice with extreme screen sizes

## License

[MIT](https://opensource.org/licenses/MIT)

## TDD Elements

Describe Pizza()

Test: "It should return a Pizza object with properties for size, crust, sauce, and toppings. Default properties are Large size, Hand-Tossed crust, Tomato sauce, no toppings"
Code: const myPizza = new Pizza();
Expected Output: Pizza {
"size": "large",
"crust": {
"name": "Hand-Tossed",
"type": "vegan",
"premium": false
},
"sauce": {
"name": "Tomato Base",
"type": "vegan",
"premium": false
},
"fullToppings": {},
"leftToppings": {},
"rightToppings": {}
}

Describe Pizza().reconcileSides()

Test: "It should add toppings to the full pizza if present on both halves, and remove toppings from the left or right halves of the pizza if that topping is present in the full pizza toppings"

Code: myPizza.leftToppings.add(menu.toppings.pepperoni);
myPizza.rightToppings.add(menu.toppings.pepperoni);
myPizza.reconcileSides();
myPizza;
Expected Output:

```
{
  "size": "large",
  "crust": {
    "name": "Hand-Tossed",
    "type": "vegan",
    "premium": false
  },
  "sauce": {
    "name": "Tomato Base",
    "type": "vegan",
    "premium": false
  },
  "fullToppings": {{name: 'Pepperoni', type: 'non-vegetarian'}},
  "leftToppings": {},
  "rightToppings": {}
}
```

Describe Pizza().crustPrice()

Test: "It should return the price of the pizza's crust based on size/type"
Code: const myPizza = new Pizza();
myPizza.crustPrice();
Expected Output: 16

Describe Pizza().toppingPrice()

Test: "It should return the price of the pizza's toppings based on size/type"
Code: const myPizza = new Pizza();
myPizza.toppingPrice();
myPizza.fullToppings.add(menu.toppings.pepperoni);
myPizza.toppingPrice();
myPizza.leftToppings.add(menu.toppings.beyondChicken);
myPizza.toppingPrice();

Expected Output: 0
2
4.5

Describe Pizza().computePrice()

Test: "It should return the total price of the pizza"
Code: const myPizza = new Pizza();
myPizza.fullToppings.add(menu.toppings.pepperoni);
myPizza.leftToppings.add(menu.toppings.beyondChicken);
myPizza.computePrice();
Expected Output: 20.5
