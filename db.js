const express =  require('express');
const knex = require('knex');

const db= knex({

  client: 'pg',
  connection: {
    host : '127.0.0.1', 
    user : 'postgres',
    password : 'megathrone',
    database : 'camerb'  
  }
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;