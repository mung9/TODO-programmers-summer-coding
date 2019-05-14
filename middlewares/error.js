const express = require('express');

module.exports = exports = function(req,res){
  res.status(500).send('Unexpected Error Occured!');
}