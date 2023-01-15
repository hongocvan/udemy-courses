# Destructuring Arrays, Objects

```js
// Receive variables from a function
function initVariables() {
    return [1, 2, { name: 'Ho Ngoc Van', birthYear: 1997 }];
}

// Get and create a new variable called 'fullName' from 'name'
// Default value for job variable
let [a, b, { name: fullName, job = 'Software Developer' }] = initVariables();
console.log('Before:', a, b); // Before: 1, 2
// Switching variables
[a, b] = [b, a];

console.log('After:', a, b); // After: 2, 1
console.log(`Hello, my name is ${fullName}`); // Hello, my name is Ho Ngoc Van
console.log(`Have a default value for job variable: ${job}`);
```
