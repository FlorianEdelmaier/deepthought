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
 
const createIntegerToken = (v, p) => ({type: CONSTS.NUMBER, value: v, pos: p});
const createStringToken = (v, p) => ({type: CONSTS.NAME, value: v, pos: p});
const createPlusToken = (v, p) => ({type: CONSTS.ADD, value: v, pos: p});
const createMultiplyToken = (v, p) => ({type: CONSTS.MULTI, value: v, pos: p});
const createParenthesesToken = (v, p) => ({type: CONSTS.PAREN, value: v, pos: p});
const createAssignToken = (v, p) => ({type: CONSTS.ASSIGN, value: v, pos: p});

function* getNextChar(input) {
    let current = 0;
    while(current < input.length) {
      yield {val: input[current], pos: current};
      current++;
    }
}

class Tokenizer {
  constructor(input) {
    this.curCharacter = {};
    this.nextCharacter = {};
    this.gen = getNextChar(input);
    this.nextCharacter = this.parseValue(this.gen.next());
  }

  parseValue(dict) {
    return dict.value ? dict.value : {val: CONSTS.EOL};
  }

  eat() {
    if(this.curCharacter.val !== CONSTS.EOL) {
      this.curCharacter = this.nextCharacter;
      this.nextCharacter = this.parseValue(this.gen.next());
    }
  }
  
  tokenize() {
    let tokens = [];
    this.eat();
    while(this.curCharacter.val !== CONSTS.EOL) {
      const val = this.curCharacter.val;
      const pos = this.curCharacter.pos;if(isInteger(val)) tokens.push(createIntegerToken(val, pos));
      if(isParentheses(val)) tokens.push(createParenthesesToken(val, pos));
      if(isAssignOperator(val)) tokens.push(createAssignToken(val, pos));
      if(isPlusOperator(val)) tokens.push(createPlusToken(val, pos));
      if(isMultiplyOperator(val)) tokens.push(createMultiplyToken(val, pos));
      if(isChar(val)) {
        let str = val;
        while(isChar(this.nextCharacter.val)) {
          this.eat();
          str += this.curCharacter.val;
        }
        tokens.push(createStringToken(str, pos));
      }
      if(isWhiteSpace(val)) {}
      // else
      //   throw new TypeError('Character is unknown: ' + this.curCharacter);
      this.eat();
    }
    return tokens;
  }
}
  
let test = new Tokenizer('let test = (1 + 4) * 3');
console.log(test.tokenize());
