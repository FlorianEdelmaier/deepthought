const CONSTS = {
  'PAREN': 'parentheses',
  'NUMBER': 'number',
  'NAME': 'name',
  'ASSIGN': 'assignment',
  'ADD': 'add',
  'MULTI': 'multiply'
}
 
const isWhiteSpace = (char) => /\s/.test(char);
const isInteger = (char) => /[0-9]/.test(char);
const isChar = (char) => /[a-z]/i.test(char);
const isParentheses = (char) => char === '(' || char === ')';
const isAssignOperator = (char) => char === '=';
const isPlusOperator = (char) => char === '+';
const isMinusOperator = (char) => char === '-';
const isMultiplyOperator = (char) => char === '*';
 
const createIntegerToken = (v, pos) => ({type: CONSTS.NUMBER, value: v, position: pos});
const createStringToken = (v, pos) => ({type: CONSTS.NAME, value: v, position: pos});
const createPlusToken = (v, pos) => ({type: CONSTS.ADD, value: v, position: pos});
const createMultiplyToken = (v, pos) => ({type: CONSTS.MULTI, value: v, position: pos});
const createParenthesesToken = (v, pos) => ({type: CONSTS.PAREN, value: v, position: pos});
const createAssignToken = (v, pos) => ({type: CONSTS.ASSIGN, value: v, position: pos});
 
const tokenizer = (input) => {
  let current = 0;
  let tokens = [];
  while(current < input.length) {
    let char = input[current];
    if(isParentheses(char)) {
      tokens.push(createParenthesesToken(char, current));
      current++;
      continue;
    }
    if(isAssignOperator(char)) {
      tokens.push(createAssignToken(char, current));
      current++;
      continue;
    }
    if(isPlusOperator(char)) {
      tokens.push(createPlusToken(char, current));
      current++;
      continue;
    }
    if(isMultiplyOperator(char)) {
      tokens.push(createMultiplyToken(char, current));
      current++;
      continue;
    }
    if(isWhiteSpace(char)) {
      current++;
      continue;
    }
   if(isInteger(char)) {
      let startPos = current;
      let value = '';
      while(isInteger(char)) {
        value += char;
        char = input[++current];
      }
      tokens.push(createIntegerToken(value, startPos));
      continue;
    }
    if(isChar(char)) {
      let startPos = current;
      let value = '';
      while(isChar(char)) {
        value += char;
        char = input[++current];
      }
      tokens.push(createStringToken(value, startPos));
      continue;
    }
  
    throw new TypeError('Character is unknown: ' + char);
  }
  return tokens;
}
let test = tokenizer('let test = (1 + 4) * 3');
console.log(test);
