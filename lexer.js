const CONSTS = {
  'PAREN': 'parentheses',
  'NUMBER': 'number',
  'NAME': 'name',
  'ASSIGN': 'assignment',
  'ADD': 'add',
  'MULTI': 'multiply'
}
const WHITESPACE = /\s/;
const NUMBERS = /[0-9]/;
const LETTERS = /[a-z]/i;
 
const tokenizer = (input) => {
  let current = 0;
  let tokens = [];
 
  while(current < input.length) {
    let char = input[current];
    if(char === '(') {
      tokens.push({type: CONSTS.PAREN, value: char});
      current++;
      continue;
    }
    if(char === ')') {
      tokens.push({type: CONSTS.PAREN, value: char});
      current++;
      continue;
    }
    if(char === '=') {
      tokens.push({type: CONSTS.ASSIGN, value: char});
      current++;
      continue;
    }
    if(char === '+') {
      tokens.push({type: CONSTS.ADD, value: char});
      current++;
      continue;
    }
    if(char === '*') {
      tokens.push({type: CONSTS.MULTI, value: char});
      current++;
      continue;
    }
    if(WHITESPACE.test(char)) {
      current++;
      continue;
    }
   if(NUMBERS.test(char)) {
      let value = '';
      while(NUMBERS.test(char)) {
        value += char;
        char = input[++current];
      }
     
      tokens.push({type: CONSTS.NUMBER, value: value});
      continue;
    }
    if(LETTERS.test(char)) {
      let value = '';
      while(LETTERS.test(char)) {
        value += char;
        char = input[++current];
      }
      tokens.push({type: CONSTS.NAME, value: value});
      continue;
    }
   
    throw new TypeError('Character is unknown: ' + char);
  }
  return tokens;
}
 
let test = tokenizer('let test = (1 + 4) * 3');
console.log(test);
