# Four Fundamental OPP Principles

**Abstraction**: Ignoring or hiding details that **don't matter**, allowing us to get an **overview** perspective of the thing we're implementing, instead of messing with details that don't really matter to our implementation.

**Encapsulation**: Keeping properties and methods **private** inside the class, so they are **not accessible from outside the class**. Some methods can be **exposed** as a public interface (API).

**Inheritance**: Making all properties and methods of a certain class **available to a child class**, forming a hierarchical relationshop between classes. This allows us to **reuse common login** and to model real-world relationships.

**Polymorphism**: A child class can **overwrite** a method it inherited from a parent class [it's more complex that that, but enough for our purposes.]

# Prototypal inheritance

Objects are **linked** to a prototype object

The prototype contains methods (behavior) that are **accessible to all objects linked to that prototype**

Behavior is **delegated** to the linked prototype object

# 3 Ways of Implementing Prototypal Inheritance in JavaScript

Constructor functions

```js
'use strict';

const Person = function (firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
};

const hnv = new Person('Ho Ngoc Van', 1997);
console.log(hnv);

// 1. New {} is created
// 2. Function is called, this = {}
// 3. {} linked to prototype
// 4. Function automatically return {}

console.log(hnv instanceof Person); // True

// Prototypes
Person.prototype.calcAge = function () {
    return new Date().getFullYear() - this.birthYear;
};

console.log(hnv.calcAge());

// Static method
Person.hey = function(){
    console.log('Hey there!');
    console.log(this); // constructor function
}
```

ES6 classes

```js
// class expression
// const PersonCl = class {};

// class declaration
class PersonCl {
    constructor(firstName, birthYear) {
        this.firstName = firstName;
        this.birthYear = birthYear;
    }

    // Methods will be added to .prototype property
    calcAge() {
        console.log(new Date().getFullYear() - this.birthYear);
    }

    get age() {
        return new Date().getFullYear() - this.birthYear;
    }

    // Static method
    static hey(){
        console.log('Hey there!');
        console.log(this); // constructor function
    }
}

const hnv = new PersonCl('Ho Ngoc Van', 1997);
hnv.calcAge();
console.log(hnv.age);

PersonCl.hey();

console.log(hnv.__proto__ === PersonCl.prototype); // True

// 1. Classes are NOT hoisted
// 2. Classes are first-class citizes
// 3. Classes are executed in strict mode
```

Object.create()

```js
const PersonProto = {
    fullName: 'Ho Ngoc Van',
    calcAge() {
        console.log(new Date().getFullYear() - this.birthYear);
    },

    init(firstName, birthYear) {
        this.firstName = firstName;
        this.birthYear = birthYear;
    },
};

const hnv = Object.create(PersonProto);
console.log(hnv); // {} [[Prototype]]: {calcAge, name}

hnv.init('Van', 1997);
console.log(hnv); // {firstName, birthYear} [[Prototype]]: {calcAge, name}
hnv.calcAge();
```

# Inheritance Between "Classes": ES6 Classses

```js
class Student extends PersonCl {
    constructor(firstName, birthYear, course) {
        super(firstName, birthYear);
        this.course = course;
    }
}
```

# Encapsulation

```js
class Account {
    // Public fields (instances)
    locale = navigator.language;

    // Private fields
    #movements = [];
    #pin;

    constructor(owner, currency, pin) {
        this.owner = owner;
        this.currency = currency;
        // Protected property
        this.#pin = pin;
    }

    // Public interface
    getMovements() {
        return this.#movements;
    }

    // Public methods
    deposit(val) {
        this.#movements.push(val);
        return this;
    }

    withdraw(val) {
        this.deposit(-val);
        return this;
    }

    requestLoan(val) {
        if (this._approveLoan(val)) {
            this.deposit(val);
            return this;
        }
    }

    // Private methods
    _approveLoan(val) {
        return true;
    }
}

const acc = new Account('Ho Ngoc Van', 'VND', 1807);
console.log(acc);

// Chaining
acc.deposit(5000).withdraw(300).withdraw(125).deposit(710).requestLoan(800);
console.log(acc.getMovements());
```

