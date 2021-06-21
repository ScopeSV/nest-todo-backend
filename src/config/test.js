const fs = require('fs')

const money = {};
const message = {author: {id: 0}};
money[message.author.id] = {
    bank: 1000,
    cash: 0,
};