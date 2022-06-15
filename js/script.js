// const Person = function(firstName, birthYear) {
//     this.firstName = firstName;
//     this.birthYear = birthYear;

//     // NEVER DO THIS. This causes performance issues
//     // Doing it this way attaches the function to each object
//     // using unnecessary memory
//     // this.calcAge = function() {
//     //     console.log(2037 - this.birthYear);
//     // }
// }

// const bathala = new Person('Bathala', 2017);

// // This is the best way to add methods when setting up a class this way. Prototypes.
// // Objects created using the class has access to the class's prototype
// // thru prototypal inheritance. 
// // All functions has prototype 
// // Top most prototype in the prototype chain is the Object()'s prototype
// Person.prototype.calcAge = function() {
//     console.log(2037 - this.birthYear);
// }

// // To add a static method
// // Static methods are not inherited by instances
// Person.hey = function() {
//     console.log('Hey there!😀');
    
//     console.log(this);// this refers to the constructor function
// }

// Person.hey();

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
    // needs to have ONE parameter
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


/* REAL INHERITANCE BETWEEN CLASSES IN JAVASCRIPT */

const Person = function(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
}
Person.prototype.calcAge = function() {
    console.log(2037 - this.birthYear);
}
// const Student = function(firstName, birthYear, course) { // A few repeated code here from Person class
//     this.firstName = firstName;
//     this.birthYear = birthYear;
//     this.course = course;
// }
const Student = function(firstName, birthYear, course) { 
    Person.call(this, firstName, birthYear);  
    // call() Person instead, so you can set the "this" keyword to the object (Student), but still have the properties from Person
    this.course = course;
}

// this makes the Student.prototype inherit from Person.prototype.
// we have to create this connection before we add anymore methods to the prototype object of Student
// because Object.create(Person.prototype) returns an empty object
// LINKING PROTOTYPES
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function() {
    console.log(`My name is ${this.firstName} and I study ${this.course}.`);
}

const mike = new Student('Mike', 2020, 'Computer Science');
console.log(mike);
mike.introduce();
mike.calcAge();

/* inheritance in class */
class StudentCL extends PersonCL {
    constructor(fullName, birthYear, course) {
        // this needs to happen first
        // super() call is responsible for creating the "this" keyword in this sub class
        super(fullName, birthYear);
        this.course = course;
    }

    introduce() {
        console.log(`My name is ${this.fullName} and I study ${this.course}.`);
    }

    // overriding a method
    calcAge() {
        console.log(`I'm overriding the calcAge() method.`);
    }
}

const martha = new StudentCL('Martha Jones', 2003, 'Computer Science');
console.log(martha);
martha.introduce();
martha.calcAge();

/* inheritance using object.create() */

const StudentProto = Object.create(PersonProto); // creates an empty object, PersonProto is the prototype of StudentProto
StudentProto.init = function(firstName, birthYear, course) {
    PersonProto.init.call(this, firstName, birthYear);
    this.course = course;
}

StudentProto.introduce = function() {
    console.log(`My name is ${this.firstName} and I study ${this.course}.`);
}
const jay = Object.create(StudentProto); // StudentProto is the prototype of jay
jay.init('Jay', 1998, 'Computer Science');
console.log(jay);
jay.introduce();
jay.calcAge();


/* ANOTHER CLASS EXAMPLE */
// DATA ENCAPSULATION - protected properties and methods
// To prevent code from outside of a class to accidentally manipulate our data inside the class
// When we only expose a small interface, (like a small API with consisting of a few public methods)
//    then we can change all the other internal methods with more confidence
//    because we can be sure that external code does not rely on these private methods

// JS does not yet support real data privacy & encapsulation
class Account {
    constructor(owner, currency, pin) {
        this.owner = owner;
        this.currency = currency;

        // Protect properties
        this._pin = pin;
        this._movements = []; // a naming convention to make a protected property (doesn't really make it private)
        // This is just to show developers (yourself and team members) on your team that this property is 
        // NOT SUPPOSED TO BE ACCESSED outside of the class.        
        this.locale = navigator.language;

        console.log(`Thanks for opening a account, ${owner}!`);        
    }

    getMovements() {
        return this._movements;
    }

    deposit(val) {
        this._movements.push(val);
    }

    withdraw(val) {
        this.deposit(-val);
    }

    _approveLoan(val) {
        return true;
    }

    requestLoan(val) {
        if(this._approveLoan(val)) {
            this.deposit(val);
            console.log(`Loan approved`);
        }
    }
}

const acc1 = new Account('Marc', 'USD', 1111);
console.log(acc1);

// Don't update propeties manually. Instead, set up methods that update these properties
//acc1.movements.push(250);
//acc1.movements.push(-140);
//console.log(acc1)

// this is a public interface of our object (API)
acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1000);
acc1._approveLoan(1000); // some methods shouldn't be accessible publicly
console.log(acc1)
console.log(acc1.pin) // some properties shouldn't be accessible publicly

console.log(acc1.getMovements());


/* CLASS FIELDS PROPOSAL - STAGE 3 */
// 1) Public fields
// 2) Private fields
// 3) Public methods
// 4) Private methods
// Static version of these are available

class AccountCF {
    // 1) Public field
    // These are on the instances, not the prototype
    // can be accessed using the this keyword    
    locale = navigator.language;
    // _movements = [];

    // 2) Private Fields
    // declaring a variable with the # at the beginning makes it a private field    
    // available on the instances, not the prototype
    #movements = [];
    #pin;

    constructor(owner, currency, pin) {
        this.owner = owner;
        this.currency = currency;

        // Protect properties
        this.#pin = pin;
        
        // this._movements = []; 
        // this.locale = navigator.language;

        console.log(`Thanks for opening a account, ${owner}!`);        
    }

    // 3) Public methods- normal methods
    getMovements() {
        return this.#movements;
    }

    deposit(val) {
        this.#movements.push(val);

        // we need to return the instance so we can chain methods
        return this;
    }

    withdraw(val) {
        this.deposit(-val);
        // we need to return the instance so we can chain methods
        return this;
    }
    
    requestLoan(val) {
        if(this.#approveLoan(val)) {
            this.deposit(val);
            console.log(`Loan approved`);
        }
        // we need to return the instance so we can chain methods
        return this;
    }

    // 4) Private Methods    
    #approveLoan(val) {
        return true;
    }


    // Static - this is on the prototype, NOT the instance
    static helper() {
        console.log('Helper');
    }

}

const acc1Cf = new AccountCF("Marc", 'USD', 1111);
console.log(acc1Cf);
// console.log(acc1Cf.#movements); // this won't work this #movements is a private field
console.log(acc1Cf.getMovements());
// acc1Cf.#approveLoan(1000); // won't work since it's a private method

AccountCF.helper(); 
//  acc1Cf.helper(); // this won't work since helper() is a static method. It only works on the prototype above

// CHAINING METHODS
// this won't work until we fix the retun values on these methods
// to fix, return the instance in these methods (return this)
acc1Cf.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000);
console.log(acc1Cf.getMovements());

// CLASSES ARE JUST "SYNTACTIC SUGAR OVER CONSTRUCTOR FUNCTIONS"
// CLASSES ARE NOT HOISTED
// CLASSES ARE FIRST-CLASS CITIZENS
// CLASS BODY IS ALWAYS EXECUTED IN STRICT MODE
