#!/usr/bin/env node

const { caesar } = require("./caesar");

const test = 'This is secret. Message about "_" symbol!';

const shift = 7;

console.log(caesar(test, shift));
