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