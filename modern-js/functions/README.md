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
