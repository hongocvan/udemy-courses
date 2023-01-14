# Global Scope

-   Outside of **any** function or block
-   Variables declared in global scope are accessible **everywhere**

# Function Scope

-   Variables are accessible only **inside function, NOT** outside
-   Also called local scope

# Block Scope (ES6)

-   Variables are accessible only **inside block** (block scoped)
-   **HOWEVER**, this only applies to **let** and **const** variables
-   Functions are **also block scoped** (only in strict mode)

# Example:

```js
'use strict';

const myName = 'Ho Ngoc Van';

const first = () => {
    const age = 25;
    if (age >= 20) {
        const decade = 2;
        var millenial = false;
    }

    const second = () => {
        const job = 'software developer';
        console.log(`${myName} is a ${age}-old, ${job}`);
        console.log('millenial', millenial); // Can access to millenial variable
        console.log('decade', decade); // Cannot access to decade variable
    };

    second();
};

first();
```

**Global Scope**

```js
const myName = 'Ho Ngoc Van';
```

**Function Scope**

```js
// first() scope
const age = 25;
var millenial = false;
```

```js
// second() scope
const job = 'software developer';
```

**Block Scope**

```js
// if block scope
const decade = 2;
```

# Scope Chain vs Call Stack

Call Stack:

-   Order in which functions were **called**

Scope chain:

-   Order in which functions are **written in the code**
-   Has **nothing** to do with order in which functions were **called**!
