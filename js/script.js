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

// To add a static method
// Static methods are not inherited by instances
Person.hey = function() {
    console.log('Hey there!😀');
    
    console.log(this);// this refers to the constructor function
}

Person.hey();

// TypeError - bathala.hey is not a function
// bathala.hey(); 

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
    constructor(fullName, birthYear) {
        this.fullName = fullName;
        this.birthYear = birthYear;
    }
    
    // this is the same way as PersonCL.prototype.calcAge
    // this is not on the object, but will be added to the prototype
    calcAge() {
        console.log(2037 - this.birthYear);
    }
    // set a property that already exists
    set fullName(name) {
        if(name.includes(' ')) this._fullName = name;
        else console.log(`${name} is not a full name`);
    }
    // getter
    //  usually used when you need to do something to a property first before returning the value without calling a method
    get fullName() { 
        return this._fullName;
    }

    static hey() { // static method. normal methods are called instance methods
        console.log('Hey there!😀');    
        console.log(this);// this refers to the constructor function
    }
}

const kibou = new PersonCL('Kibou Sison', 2017);
console.log(kibou.fullName);

console.log(kibou);
console.log(kibou.__proto__);
kibou.calcAge();

// you can still do this to add methods
PersonCL.prototype.greet = function() {
    console.log(`Hey ${this.fullName}!`);
}

kibou.greet();


// 1. Classes are NOT hoisted. They need to be declared before calling them
// 2. Classes are first-class citizens. You can pass them in functions and return them in functions.
// 3. Classes are executed in strict mode.

// Object.create()
// There is still the idea of prototypal inheritance, but there are no prototype properties involved.
// No constructor functions, no "new" operator when creating an instance

// first, you need to create an object that would act as a prototype
const PersonProto = {
    calcAge() {
        console.log(2037 - this.birthYear);
    },

    // kind of like our constructor()
    // this is just a normal method, it doesn't have to be init()
    init(firstName, birthYear) {
        this.firstName = firstName;
        this.birthYear = birthYear;
    }
}

// to create a new object using the prototype
// this creates a new object that is linked to the prototype passed.
const steve = Object.create(PersonProto);
console.log(steve);

steve.name = 'Steve';
steve.birthYear = 2002;
steve.calcAge();
console.log(steve);


const maxie = Object.create(PersonProto);
maxie.init('Maximillian', 2022);
console.log(maxie);
maxie.calcAge();