//Importing Libraries
const fs = require('fs');
const path  = require('path');

const NOTE_PATH = path.join(__dirname, 'note.txt');                                           

console.log(NOTE_PATH);

const notesFileContent = fs.readFileSync(NOTE_PATH, 'utf-8');
console.log(notesFileContent);  

// These are two ways of writing funtions in JavaScript
//Way-1
const num_squared = (num) => {
    return num*num ;
}
//Way-2
function numcubic(num){
    return num*num*num ;
}

console.log("Hello World!");

let age2=20 ;
let name2="Youssef" ;
let city="cairo" ;

console.log(`My name is ${name2}, I am ${age2} years old, and I live in ${city}.`);

let name = "Yousesf";  // Variables can be changed 
let num = 20;

console.log("Hello " + name + "!");
console.log("I am " + num + " years old");
console.log("            ")
num = 30;

const ID = 248368; // Constants cannot be changed

// ---------- Part 1: Fruit Input ----------

const readline = require('readline');

const rl1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let fruits = [];
let count = 0;

function askFruit() {
  if (count < 5) {
    rl1.question(`Enter fruit ${count + 1}: `, (input) => {
      fruits.push(input);
      count++;
      askFruit();
    });
  } else {
    console.log("\nYou entered these fruits:");
    for (let i = 0; i < fruits.length; i++) {
      console.log(`- ${fruits[i]}`);
    }
    rl1.close();

    // Move to calculator part AFTER fruit input is done
    startCalculator();
  }
}

askFruit();

// ---------- Part 2: Calculator ----------

function startCalculator() {
  const rl2 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl2.question('Enter first number: ', (num1) => {
    rl2.question('Enter operator (+, -, *, /): ', (operator) => {
      rl2.question('Enter second number: ', (num2) => {
        const a = parseFloat(num1);
        const b = parseFloat(num2);
        let result;

        switch (operator) {
          case '+': result = a + b; break;
          case '-': result = a - b; break;
          case '*':
          case 'x': result = a * b; break;
          case '/': result = b !== 0 ? a / b : 'Error: Division by zero'; break;
          default: result = 'Invalid operator';
        }

        console.log(`Result: ${result}`);
        rl2.close();
      });
    });
  });
}
