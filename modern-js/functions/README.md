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
