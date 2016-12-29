'use strict';

const CONSTS = require('./constants');

function* getNextToken(tokens) {
    let current = 0;
    while(current < tokens.length) {
      yield tokens[current];
      current++;
    }
}

function parser(tokens) {
    const gen = getNextToken(tokens);
    let token = gen.next();

    const ast = {
        type: 'Program',
        body: []
    };

    while (!token.done) {
        ast.body.push(token);
        token = gen.next();
    }

    return ast;
}

module.exports = parser;