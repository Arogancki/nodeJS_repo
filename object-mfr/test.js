require('./index.js')(Object);

let guests = {
    mr: 'Bob',
    mrs: 'Alice',
    greeting: "Hi"
};

let caller = {
    greeting: "Hello"
};

guests.map(function(val, key, obj){
    console.log(`${this.greeting} ${key} ${val}! `);
}, caller);