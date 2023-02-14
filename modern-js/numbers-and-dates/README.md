```js
0.1 + 0.2 === 0.3; // false =>>> JavaScript is not working well with the number

Number.parseInt('  101xa '); // 101
Number.parseInt('  101xa ', 2); // 5
Number.parseFloat('1.2BA'); // 1.2
```

# Numeric Separators and BigInt

```js
const diameter = 123_345_000_000; // 123,345,000,000

const priceCents = 11_99; // 1199

const x = 13289127381230146102371790123n;
const y = BigInt(12731283129182312837012712379n);

console.log(Number.MAX_SAFE_INTEGER); // 9,007,199,254,740,991
console.log(x, y); // 13289127381230146102371790123n 12731283129182312837012712379n
console.log(x * y); // 169187643230210088853626463388176103456571431945952032617n
console.log(x ** 4); // TypeError: Cannot mix BigInt and other types...
```

# Dates

```js
// Tue Nov 19 2019 04:31:17 GMT+0700 (Indochina Time)
console.log(new Date('2019-11-18T21:31:17.178Z'));

// Thu Jan 01 1970 08:00:00 GMT+0800 (Indochina Time)
console.log(new Date(0));

// Mon Jan 26 1970 08:00:00 GMT+0800 (Indochina Time)
console.log(new Date(25 * 24 * 60 * 60 * 1000));

const birth = new Date(1997, 11, 25, 18, 7, 0);

// Thu Dec 25 1997 00:00:00 GMT+0700 (Indochina Time)
console.log(birth);
console.log(birth.getFullYear()); // 1997
console.log(birth.getMonth()); // 11
console.log(birth.getDate()); // 25
console.log(birth.toISOString()); // 1997-12-25T11:07:00.000Z
```

# Internationalizing Dates and Numbers

```js
const now = new Date();
const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    weekday: 'long',
    hour: 'numeric',
    minute: 'numeric',
};

new Intl.DateTimeFormat(
    currentAccount.locale,
    options
).format(now);
```

```js
const num = 251218.97;

const options = {
    style: 'unit',
    unit: 'mile-per-hour',
};

// US: 251,218.97 mph
console.log('US:', new Intl.NumberFormat('en-US', options).format(num));

// VN: 251.218,97 mi/h
console.log('VN:', new Intl.NumberFormat('vi-VN', options).format(num));

// const curr = 25.12;
// const options = {
//     style: 'currency',
//     currency: 'VND',
// };
```