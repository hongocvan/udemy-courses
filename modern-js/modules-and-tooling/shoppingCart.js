console.log('Start loading users...');
// await fetch('https://jsonplaceholder.typicode.com/users/');
console.log('Finish loading users');

const shippingCost = 10;
export const cart = [];

export const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to cart`);
};

const totalPrice = 124;
const totalQuantity = 13;

export default { totalPrice, totalQuantity };

console.log('Exporting module');
