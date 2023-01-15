'use strict';

console.log('Global scope', this); // window object

const data = [1, 4, 7, 2, 1];

const add = (num1, num2) => num1 + num2;

const calcAverage = (nums) => nums.reduce(add, 0) / nums.length;

const calcAverageDecl = function (nums) {
    console.log('Simple function call:', this); // undefined
    return calcAverage(nums);
};

const calcAverageArrow = (nums) => {
    // lexical this keyword
    console.log('Arrow function call:', this); // window object
    return calcAverage(nums);
};

calcAverageDecl(data);
calcAverageArrow(data);

// this keyword with object
console.log('\n');
const vanObj = {
    name: 'Ho Ngoc Van',
    birthYear: 1997,
    callAge: function () {
        console.log('Function call inside object:', this); // object itself
        this.printSummary();
        return 2023 - this.callAge;
    },
    printSummary: function () {
        console.log('Function called inside object function:', this); // object
        console.log(`My name is ${this.name} - Software Developer`);
    },
};

vanObj.callAge();

// Copy object =>>> this keyword is dynamic, not static
console.log('\n');

const newObj = {
    name: 'Art And Science',
    birthYear: 2023,
};

newObj.calcAge = vanObj.callAge;
newObj.printSummary = vanObj.printSummary;
newObj.calcAge();
