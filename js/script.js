const Person = function(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;

    // NEVER DO THIS. This causes performance issues
    // Doing it this way attaches the function to each object
    // using unnecessary memory
    // this.calcAge = function() {
    //     console.log(2037 - this.birthYear);
    // }
}

const bathala = new Person('Bathala', 2017);

// This is the best way to add methods when setting up a class this way. Prototypes.
// Objects created using the class has access to the class's prototype
// thru prototypal inheritance. 
// All functions has prototype 
// Top most prototype in the prototype chain is the Object()'s prototype
Person.prototype.calcAge = function() {
    console.log(2037 - this.birthYear);
}

const arr  = [3,4,5,6,3,9,8,6,4];
// We can add new methods to existing object prototypes
// but it is not a good idea. DO NOT DO IT
// Array.prototype.unique = function() {
//     return [...new Set(this)];
// }

// console.log(arr.unique());
// ES6 classes
// class expression
// const PersonCLE = class {

// }

class PersonCL {
    constructor(firstName, birthYear) {
        this.firstName = firstName;
        this.birthYear = birthYear;
    }
    
    // this is the same way as PersonCL.prototype.calcAge
    // this is not on the object, but will be added to the prototype
    calcAge() {
        console.log(2037 - this.birthYear);
    }
}

const kibou = new PersonCL('Kibou', 2017);

console.log(kibou);
console.log(kibou.__proto__);
kibou.calcAge();

// you can still do this to add methods
PersonCL.prototype.greet = function() {
    console.log(`Hey ${this.firstName}!`);
}

kibou.greet();


// 1. Classes are NOT hoisted. They need to be declared before calling them
// 2. Classes are first-class citizens. You can pass them in functions and return them in functions.
// 3. Classes are executed in strict mode.