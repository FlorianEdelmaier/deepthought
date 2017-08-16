'use strict';

const Tokenizer = require('./lexer');
const parser = require('./parser');

let tokens = new Tokenizer('let test = (1 + 4) * 3').tokenize();
// console.log(...tokens);
// console.log("=======================");
let ast = parser(tokens);
ast.body.forEach(function(node) {
    console.log(node.value)
}, this);
// console.log(ast);
