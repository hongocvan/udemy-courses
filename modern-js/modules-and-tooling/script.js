// Exporting module
import totals, { cart, addToCart } from './shoppingCart.js';
import * as ShoppingCart from './shoppingCart.js';

console.log('------------------------');
console.log('Importing module');

console.log('totals', totals);
console.log(ShoppingCart);

addToCart('cake', 2);
ShoppingCart.addToCart('bread', 10);

console.log('cart', cart);

// console.log('------------------------');
// console.log('Global await');
// const res = await fetch('https://jsonplaceholder.typicode.com/todos/');
// const data = await res.json();
// console.log('data', data);

// const getLastTodo = async function () {
//     const res = await fetch('https://jsonplaceholder.typicode.com/todos/');
//     const data = await res.json();
//     return data.at(-1);
// };

// const lastTodo = await getLastTodo();
// console.log('lastTodo', lastTodo);

console.log('------------------------');
console.log('Module pattern');
const ShoppingCart2 = (function () {
    const cart = [];

    const shippingCost = 10;
    const totalPrice = 123;
    const totalQuantity = 23;

    const addToCart = function (product, quantity) {
        cart.push({ product, quantity });
        console.log(
            `${quantity} ${product} added to cart (shipping cost ${shippingCost})`
        );
    };

    const orderStock = function (product, quantity) {
        console.log(`${quantity} ${product} ordered from supplier`);
    };

    const printSummary = function () {
        console.log('cart', cart);
        console.log('shippingCost', shippingCost);
        console.log('totalPrice', totalPrice);
        console.log('totalQuantity', totalQuantity);
    };

    return {
        addToCart,
        orderStock,
        shippingCost,
        printSummary,
    };
})();

ShoppingCart2.addToCart('car', 3);
ShoppingCart2.addToCart('bread', 10);
ShoppingCart2.shippingCost = 15;
ShoppingCart2.printSummary();

console.log('------------------------');

import { cloneDeep } from 'lodash';

const state = {
    cart: [
        { product: 'car', quantity: 3 },
        { product: 'bread', quantity: 20 },
    ],
    user: { loggedIn: true },
};

const stateClone = cloneDeep(state);
state.user.loggedIn = false;
console.log(stateClone);

// if (module.hot) {
//     module.hot.accept();
// }
