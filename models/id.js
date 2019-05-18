const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = exports = function validateId(id){
  return Joi.validate({id}, {id: Joi.objectId()});
}

// var Joi = require('joi');
// Joi.objectId = require('joi-objectid')(Joi);
 
// var schema = {
//   id: Joi.objectId()
// , name: Joi.string().max(100)
// , date: Joi.date()
// }
 