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

Destructuring objects inside object

```js
const vanObj = {
    name: 'Ho Ngoc Van',
    birthYear: 1997,
    favorites: {
        math: {
            displayName: 'Math',
            level: 'High',
        },
        science: {
            displayName: 'Computer Science',
            level: 'High',
        },
        book: {
            displayName: 'Reading Book',
            level: 'Medium',
        },
        sport: {
            displayName: 'Sport',
            level: 'Low',
        },
    },
};

const {
    math: { displayName: favoriteName, level: favoriteLevel },
} = vanObj.favorites;

console.log(`Name of favorite: ${favoriteName}`); // Math
console.log(`Favorite level: ${favoriteLevel}`); // High
```

# Spread and Rest Operator

Shallow copy with spread operator

```js
const favorites = ['Math', 'Science', { name: 'Ho Ngoc Van' }];
const newFavorites = [...favorites, 'Reading Book'];
newFavorites[2].birthYear = 1997;
console.log(favorites); // [...{name: 'Ho Ngoc Van', birthYear: 1997}]
console.log(newFavorites); // [...{name: 'Ho Ngoc Van', birthYear: 1997}]
```

Rest operator

```js
const newFavorites = ['Math', 'Science', 'Reading Book', 'Sleeping'];
const [firstFavorite, , ...otherFavorites] = newFavorites;
console.log(otherFavorites); // ['Reading Book', 'Sleeping']

// Work with functions
const sum = ([firstNumber, ...otherNumbers]) => {
    console.log(otherNumbers);
    if (otherNumbers.length === 0) return firstNumber;
    return firstNumber + sum(otherNumbers);
};

console.log(sum([1, 2, 1, -3])); // 1
```
