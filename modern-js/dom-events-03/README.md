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