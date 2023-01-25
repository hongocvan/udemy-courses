# How Passing Arguments Works: Value vs. Reference

```js
'use strict';

const flight = '123';
const vanhn = {
    name: 'Ho Ngoc Van',
    passport: 1234567890,
};

const checkIn = function (flightNum, passenger) {
    flightNum = 'VN' + flightNum;

    passenger.name = 'Mr. ' + passenger.name;
};

checkIn(flight, vanhn);
console.log(flight); // 123
console.log(vanhn); // {name: 'Mr. Ho Ngoc Van', passport: 1234567890}
```

# First-class and Higher-Order Functions

```js
'use strict';

const oneWord = function (str) {
    return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
    const [first, ...others] = str.split(' ');
    return [first.toUpperCase(), ...others].join(' ');
};

// Higher-order function
const transformer = function (str, fn) {
    return fn(str);
};

transformer('JavaScript is the best!', upperFirstWord); // JAVASCRIPT is the best!
```

# Function Methods

## Call, Apply

```js
'use strict';

const vanhn = {
    name: 'Ho Ngoc Van',
    birthYear: 1997,
    friends: [],
    calcAge() {
        console.log(`Your age is: ${2023 - this.birthYear}`);
    },
    addFriend(friendName) {
        this.friends.push(friendName);
        console.log(this.friends);
    },
};

vanhn.calcAge(); // Your age is: 26

const calcAge = vanhn.calcAge;
const addFriend = vanhn.addFriend;

// Error: regular function call => this = undefined
// calcAge();
// addFriend('Van')

// Call method
calcAge.call(vanhn); // Your age is: 26
addFriend.call(vanhn, 'Van'); // [Van]

// Apply method
calcAge.apply(vanhn, []); // Your age is: 26
addFriend.apply(vanhn, ['Anh']); // [Van, Anh]
```

## Bind method

Does not immediately call the function. It returns a new function where this keyword is bound

```js
const calcAgeVanHN = calcAge.bind(vanhn);
console.log(calcAgeVanHN, calcAge === calcAgeVanHN); // calcAge() false
calcAgeVanHN(); // Your age is: 26

const addFriendVanHN = addFriend.bind(vanhn);
addFriendVanHN('Van'); // [Van, Anh, Van]

const addFriendVanHNVan = addFriend.bind(vanhn, 'Van');
addFriendVanHNVan(); // [Van, Anh, Van, Van]
```

## Partial application

A part of the arguments of the original function are already applied

```js
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200)); // 220

const addVAT = addTax.bind(null, 0.15);
console.log(addVAT(100)); // 115
```

# Immediately Invoked Function Expression (IIFE)

```js
'use strict';

(function () {
    console.log('This will never run again!');
})();

(() => {
    console.log('This will ALSO never run again!');
})();
```
