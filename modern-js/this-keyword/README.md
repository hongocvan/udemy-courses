# this keyword/variable

Special variable that tis created for every execution context (every function). Takes the value of (points to) the "owner" of the function in which the **this** keyword is used.

**this** is **NOT** static. It depends on **how** the function is called, and its value is only assigned when the function **is actually called**

> **Method** this = Object that is calling the method.
> **Simple function call** this = undefined (In strict mode, otherwise window (in the browser)).
> **Arrow function** this = this of surrounding function (lexical this).
> **Event listenter** this = DOM element that the handler is attached to.

=>>> **this** does **NOT** point to the function itself, and also **NOT** the its variable environment!

# Regular functions and Arrow functions

```js
'use strict';

const vanObj = {
    name: 'Ho Ngoc Van',
    birthYear: 1997,
    callAge: function () {
        const isAdultDecl = function () {
            // Simple function call
            // undefined with strict mode, window object otherwise
            console.log(this);
            return 2023 - this.birthYear >= 18; // error
        };

        const isAdultArrow = () => {
            // Arrow function
            console.log(this); // vanObj
            return 2023 - this.birthYear >= 18; // error
        };

        return [2023 - this.birthYear, isAdultDecl(), isAdultArrow()];
    },
    hello: () => {
        // this = window object
        console.log(`Hello, my name is ${this.name}`); // this.name = undefined
    },
};

vanObj.hello();
console.log(vanObj.callAge());
```
