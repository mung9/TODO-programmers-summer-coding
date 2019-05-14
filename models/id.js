const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

export default function validateId(id){
  return Joi.validate(id, {id: Joi.objectId});
}