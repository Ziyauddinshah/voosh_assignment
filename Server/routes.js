const express = require('express');
const api = express.Router();

api.get('/', (req,res)=>{
  res.send({message: 'Hello World!'});
});

api.get('/api', (req,res)=>{
    res.send({message: 'Hello api'});
});
  

module.exports = api;