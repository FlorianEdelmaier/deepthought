'use strict';

const Tokenizer = require('./lexer');
const parser = require('./parser');

let tokens = new Tokenizer('let test = (1 + 4) * 3').tokenize();
let ast = parser(tokens);
console.log(ast);
