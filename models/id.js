const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = exports = function validateId(id){
  return Joi.validate({id}, {id: Joi.objectId()});
}