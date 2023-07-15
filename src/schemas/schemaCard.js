import Joi from "joi";

export const cardSchema = Joi.object({
  name: Joi.string().required(),
  value: Joi.number().positive().required(),
});
