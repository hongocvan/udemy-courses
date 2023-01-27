Data:

```js
const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
};

const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};

const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};

const account5 = {
    owner: 'Ho Ngoc Van',
    movements: [250, 90, -12, 300, -57, 24, 97, -700, 345, 100, -420, 197],
    interestRate: 0.1,
    pin: 1807,
};

const accounts = [account1, account2, account3, account4, account5];
```

# Some simple methods

```js
// SLICE method: NOT change original array
const newAccounts = accounts.slice(); // SHALLOW Copy
newAccounts[0].owner = 'Ho Ngoc Van';
console.log(accounts[0], newAccounts[0]); // {owner:Ho Ngoc Van}, {onwer: Ho Ngoc Van}

newAccounts[0] = {};
console.log(accounts[0], newAccounts[0]); // {owner:Ho Ngoc Van}, {}

// SPLICE method: change original array
console.log(accounts.splice(2)); // [account3, account4]
console.log(accounts); // [account1, account2]

// REVERSE method: change original array
console.log(accounts.reverse()); // [account2, account1]
console.log(accounts); // [account2, account1]

// CONCAT method
console.log(['v', 'a'].concat(['v'])); // [v, a, v]

// JOIN method
console.log(['v', 'a'].join('')); // va
```

# Looping Arrays

FOREACH method: NOT work for continue and break statements

```js
accounts.forEach(function (account, idx, array) {
    console.log(idx, account, array); // 0 {} [{}, {}]
});
```

FOREACH with maps and sets

```js
const currencies = new Map([
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
    // key as index
    console.log(key, value, map); // USD 'United States dollar' {...}
});

const currenciesUnique = new Set(['USD', 'GBP', 'VND', 'USD', 'VND']);

currenciesUnique.forEach(function (value, key, set) {
    // key as value
    console.log(key, value, set); // VND VND {...}
});
```

# Data Transformations: map, filter, reduce

**map** returns a **new array** containing the results of applying an operation on all original array elements

```js
const newAccountsMap = accounts.map(function (account, idx) {
    console.log(idx, account);
    return `${account.owner} - ${account.pin}`;
});

console.log(newAccountsMap); // [Jonas Schmedtmann - 1111, ...]
```

**filter** returns a **new array** containing the array elements that passed a specified **test condition**

```js
const newAccountsFilter = accounts.filter(function (account) {
    return account.interestRate < 1;
});

console.log(newAccountsFilter); // [{Ho Ngoc Van}, {Steven Thomas Williams}]
```

**reduce** boils ("reduces") all array elements down to one single value

```js
const totalMovements = accounts.map(function (account) {
    // acc = accumulator, cur = current
    return account.movements.reduce(
        (acc, cur, i, arr) => acc + cur,
        0 // initial value for accumulator
    );
});

console.log(totalMovements); // [3840, 11720, 10, 2270, 214]
```

**find** returns an element of the array, **findIndex** returns index of the element

```js
console.log(
    accounts.find((account) => {
        return account.interestRate < 0.5; // {Ho Ngoc Van}
    })
);

console.log(accounts.findIndex((account) => account.interestRate < 0.5)); // 4
```
