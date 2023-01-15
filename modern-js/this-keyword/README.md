# this keyword/variable

Special variable that tis created for every execution context (every function). Takes the value of (points to) the "owner" of the function in which the **this** keyword is used.

**this** is **NOT** static. It depends on **how** the function is called, and its value is only assigned when the function **is actually called**

> **Method** this = Object that is calling the method.
> **Simple function call** this = undefined (In strict mode, otherwise window (in the browser)).
> **Arrow function** this = this of surrounding function (lexical this).
> **Event listenter** this = DOM element that the handler is attached to.

=>>> **this** does **NOT** point to the function itself, and also **NOT** the its variable environment!
