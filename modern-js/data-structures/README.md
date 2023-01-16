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

# And Operator (&&)

```js
const myEmail = 'hongocvan@artandscience.vn';
const vanObj = {
    name: 'Ho Ngoc van',
    birthYear: 1997,
    randNumber: 0,
};

vanObj.email &&= myEmail;
console.log(vanObj); // {...}

vanObj.email = vanObj.email && myEmail;
console.log(vanObj); // {..., email: undefined}
```

# Nullish Operator (??)

```js
// Nullish: null and undefined (NOT 0 or '')
console.log(null ?? 'value'); // value
console.log(undefined ?? 'value'); // value
console.log(0 ?? 'value'); // 0
console.log(false ?? 'value'); // false
```

# Arrays

```js
const favorites = ['Math', 'Science', 'Reading Book', 'Running'];

// Array Iterator
for (const [idx, favorite] of favorites.entries()) {
    console.log(idx, favorite); // 0 Math ...
}
```

# Optional Chainig (?.)

```js
const keys = ['name', 'birthYear', 'favorites', 'favorites2'];

const vanObj = {
    [keys[0]]: 'Ho Ngoc Van',
    [keys[1]]: 1997,
    [keys[2]]: {
        displayName: 'Math',
        level: 'High',
    },
    favorites2: null,
    calcAge() {
        return 2023 - this[keys[1]];
    },
    printSummary() {
        const job = 'Software Developer';
        console.log(`My name is ${this.name} ${this.calcAge()}-old, ${job}`);
    },
    calcAvgNumbers(nums) {
        return nums.reduce((a, b) => a + b, 0) / nums.length;
    },
};

console.log(vanObj); // {name: 'Ho Ngoc Van', birthYear: 1997, ...}
console.log(vanObj.favorites.displayName); // Math

// Work with function
vanObj.printSummary(); // My name is Ho Ngoc Van 26-old, Software Developer
console.log(vanObj.calcAge()); // 26
console.log(vanObj.calcAvgNumbers([1, 2, 3, 7])); // 5.25 = 13/4
console.log(vanObj.calcAvg?.([1, 2, 3, 7])); // undefined
console.log(vanObj.calcAvg?.([1, 2, 3, 7]) ?? 'Method does not exists'); // Method..

// Work with object key
console.log(vanObj.favorites1?.displayName); // undefined =>>> NOT throw ERROR
console.log(vanObj[keys[3]]?.displayName); // STILL undefined

console.log(vanObj.favorites1.displayName); // TypeError
console.log(vanObj?.favorites1.displayName); // TypeError =>>> STILL throw ERROR

// Work with arrays
const vanArr = [{}];
console.log(vanArr[0]?.name); // undefined
```

# Objects

```js
const favorites = {
    math: {
        displayName: 'Math',
        level: 'High',
    },
    science: {
        displayName: 'Science',
        level: 'High',
    },
    reading: {
        displayName: 'Reading Book',
        level: 'High',
    },
    running: {
        displayName: 'Running',
        level: 'Medium',
    },
};

for (const [
    favoriteKey,
    { displayName: favoriteName, level: favoriteLevel },
] of Object.entries(favorites)) {
    console.log(favoriteKey, favoriteName, favoriteLevel); // math Math High
}
```

# Sets

```js
const vanArray = ['Ho', 'Ngoc', 'Van', 'Ho'];
const vanSet = new Set(vanArray); // {'Ho', 'Ngoc', 'Van'}
const newVanArray = [...vanSet];

console.log(vanSet.size, vanSet[0]); // 3 undefined
console.log(vanSet.has('Ho'), vanSet.has('1997')); // true false

for (const item of vanSet) console.log(item);

vanSet.add('CS');
vanSet.delete('Ngoc');
console.log(vanSet); // {'Ho', 'Van', 'CS'}
vanSet.clear();
console.log(vanSet); // {}
```
