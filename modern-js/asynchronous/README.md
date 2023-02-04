# Promise [ES6]

An object that is used as a placeholder for the future result of an asynchronous operation

We no longer need to rely on events and callbacks passed into asynchronous functions to
handler asynchronous results

Instead of nesting callbacks, we can **chain promises** for a sequence of asynchronous
operations: **escaping callback hell**

```
PENDING -------async task-------> SETTLED                          BUILD PROMISE
                                     |                                    |
                     FULFILLED <-----|-----> REJECTED                     |  
       <Success! value is available> | <An error happended>       CONSUME PROMISE
```

# How Asynchronous JavaScript Works Behind The Scenes

**Microtasks queue** like **callback queue**, but for callbacks related to **promise**. Has **priority** over callback queue!

At the end of an event loop tick, so after a callback has been taken from the callback queue, the event loop will check if there are any callbacks in the microtasks queue. And if there are, it will run all of them before it will run any more callbacks from the regular callback queue.

```js
// 1. Test start
// 2. Test end
// 3. Resolved promise 1 (microtasks queue)
// 4. Resolved promise 2 (microtasks queue)
// 5. 0 sec timer (regular callback queue)
console.log('Test start');
setTimeout(() => console.log('0 sec timer'), 0);
Promise.resolve('Resolved promise 1').then((res) => console.log(res));
Promise.resolve('Resolved promise 2').then((res) => {
    for (let i = 0; i < 10 ** 10; i++) {}
    console.log(res);
});
console.log('Test end');
```