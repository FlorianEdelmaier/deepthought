'use strict';

const CONSTS = {
  'PAREN': 'parentheses',
  'NUMBER': 'number',
  'NAME': 'name',
  'ASSIGN': 'assignment',
  'ADD': 'add',
  'MULTI': 'multiply',
  'EOL': 'endOfLine'
}
 
const isWhiteSpace = (char) => /\s/.test(char);
const isInteger = (char) => /[0-9]/.test(char);
const isChar = (char) => /[a-z]/i.test(char);
const isParentheses = (char) => char === '(' || char === ')';
const isAssignOperator = (char) => char === '=';
const isPlusOperator = (char) => char === '+';
const isMinusOperator = (char) => char === '-';
const isMultiplyOperator = (char) => char === '*';
 
const createIntegerToken = (v) => ({type: CONSTS.NUMBER, value: v});
const createStringToken = (v) => ({type: CONSTS.NAME, value: v});
const createPlusToken = (v) => ({type: CONSTS.ADD, value: v});
const createMultiplyToken = (v) => ({type: CONSTS.MULTI, value: v});
const createParenthesesToken = (v) => ({type: CONSTS.PAREN, value: v});
const createAssignToken = (v) => ({type: CONSTS.ASSIGN, value: v});

function* getNextChar(input) {
    let current = 0;
    while(current < input.length) {
      yield input[current];
      current++;
    }
}

class Tokenizer {
  constructor(input) {
    curCharacter = '';
    gen = getNextChar(input);
  }
  
  eat() {
    if(this.curCharacter !== consts.EOL) {
      let next = gen.next();
      if(next.value) curCharacter = next.value;
      else curCharacter = consts.EOL; 
    }
  }
  
  tokenize() {
    let tokens = [];
    this.eat();
    while(this.curCharacter !== consts.EOL) {
      if(isInteger(this.curCharacter)) tokens.push(createIntegerToken(this.curCharacter));
      if(isParentheses(this.curCharacter)) tokens.push(createParenthesesToken(this.curCharacter));
      if(isAssignOperator(this.curCharacter)) tokens.push(createAssignToken(this.curCharacter));
      if(isPlusOperator(this.curCharacter)) tokens.push(createPlusToken(this.curCharacter));
      if(isMultiplyOperator(this.curCharacter)) tokens.push(createMultiplyToken(this.curCharacter));
      // if(isWhiteSpace(this.curCharacter)) continue;
      // else
      //   throw new TypeError('Character is unknown: ' + c);
      this.eat();
    }
    return tokens;
  }
}
  
const tokenize = (input) => {
    let tokens = [];
    const gen = getNextChar(input);
    let value = '';
    while((value = gen.next()).value) {
      const c = value.value;
      if(isInteger(c)) tokens.push(createIntegerToken(c));
      if(isChar(c)) {
        let v = c;
        let nextValue = '';
        while(isChar((nextValue = gen.next()).value))
        {
          v += nextValue.value;
        }
        tokens.push(createStringToken(c));
      }
      if(isParentheses(c)) tokens.push(createParenthesesToken(c));
      if(isAssignOperator(c)) tokens.push(createAssignToken(c));
      if(isPlusOperator(c)) tokens.push(createPlusToken(c));
      if(isMultiplyOperator(c)) tokens.push(createMultiplyToken(c));
      if(isWhiteSpace) continue;
      else
        throw new TypeError('Character is unknown: ' + c);
    }
    return tokens;
}

let test = new Tokenizer('let test = (1 + 4) * 3');
console.log(test);
