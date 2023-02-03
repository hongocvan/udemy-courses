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