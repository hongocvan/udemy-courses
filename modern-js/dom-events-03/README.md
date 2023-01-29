# Selecting elements

```js
// NodeList
const allSections = document.querySelectorAll('.section');

// HTMLCollection - life collection (update immediately)
const allButtons = document.getElementsByTagName('button');
```

# Selecting and inserting elements

```js
// DOM Element
const message = document.createElement('div');
message.classList.add('cookie-message');
const messageText = 'We use cookied for improved functionality and analytics.';
const messageBtnHTML = '<button class="btn btn--close-cookie">Got it!</button>';
message.innerHTML = `${messageText} ${messageBtnHTML}`;

// Inserting at once -> life element living in the DOM -> cannot have multiple
header.append(message);
header.prepend(message);
// header.append(message.cloneNode(true));

header.after(message);
header.before(message);
```

# Deleting elements

```js
message.remove();
```

# Styles and Attributes

```js
message.style.backgroundColor = '#37383d';
console.log(message.style.height); // -> NOT log
console.log(getComputedStyle(message).height); // 50px

message.style.height =
    Number.parseFloat(getComputedStyle(message).height, 10) + 10 + 'px';
console.log(getComputedStyle(message).height); // 60px

document.documentElement.style.setProperty('--color-primary', 'orangered');

const logo = document.querySelector('.nav__logo');

// Bankist logo http://127.0.0.1:5500/dom-events-03/img/logo.png
console.log(logo.alt, logo.src);

// Non-standard attributes
logo.setAttribute('developer', 'Ho Ngoc Van');
console.log(logo.developer); // undefined
console.log(logo.getAttribute('developer')); // Ho Ngoc Van

console.log(logo.src); // http://127.0.0.1:5500/dom-events-03/img/logo.png
console.log(logo.getAttribute('src')); // img/logo.png

const link = document.querySelector('.twitter-link');
console.log(link.href); // https://twitter.com/jonasschmedtman
console.log(link.getAttribute('href')); // https://twitter.com/jonasschmedtman

// Data attributes
console.log(logo.dataset); // DOMStringMap

// Classes
logo.classList.add('test-class');
logo.classList.remove('test-class');
logo.classList.toggle('test-class');
logo.classList.contains('test-class');

// Don't use
logo.className = 'test-class';
```