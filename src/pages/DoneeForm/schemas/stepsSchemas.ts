import joi from 'joi';
import { DoneeFormData } from '..';

// const Joi = require(joi).extend(require('@joi/date'))
const cpfRegex = /^\d{11}$/;
const rgRegex = /\d{7}/;

const step1Schema = joi.object<DoneeFormData['donee']>({
  name: joi.string().required(),
  birthdate: joi.date().required(),
  contact: joi.string(),
  cpf: joi.string().pattern(new RegExp(cpfRegex)),
  rg: joi.string().pattern(new RegExp(rgRegex)),
  occupation: joi.string(),
});

const step2Schema = joi.object<DoneeFormData['spouse']>({
  name: joi.string().required(),
  birthdate: joi.date().required(),
  contact: joi.string(),
  cpf: joi.string().pattern(new RegExp(cpfRegex)),
  rg: joi.string().pattern(new RegExp(rgRegex)),
  occupation: joi.string(),
});

const colleague = joi.object().keys({
  name: joi.string().required(),
  contact: joi.string(),
  cpf: joi.string().pattern(new RegExp(cpfRegex)),
  rg: joi.string().pattern(new RegExp(rgRegex)),
  occupation: joi.string(),
});

const step3Schema = joi.array().items(colleague);

const child = joi.object().keys({
  name: joi.string().required(),
  birthdate: joi.date(),
  contact: joi.string(),
});

const step4Schema = joi.array().items(child);

const step5Schema = joi.object<DoneeFormData['address']>({
  district: joi.string().required(),
  number: joi.string().required(),
  street: joi.string().required(),
  city: joi.string(),
  state: joi.string(),
});

const step6Schema = joi.object<DoneeFormData['note']>({
  note: joi.string().required(),
  reminder: joi.date(),
});

export {
    step1Schema,
    step2Schema,
    step3Schema,
    step4Schema,
    step5Schema,
    step6Schema,
}
