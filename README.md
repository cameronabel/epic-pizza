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
Code: myPizza.leftToppings.add(menu.toppings.pepperoni)
myPizza.rightToppings.add(menu.toppings.pepperoni)
myPizza.reconcileSides()
myPizza
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
