import joi from "joi";

export const movieSchema = joi.object({
  name: joi.string().required(),
  description: joi.string().required(),
  image: joi.string(),
  categoryId: joi.string().required(),
  link: joi.string().optional(),
  linkType: joi.string().valid("file", "link").required(),
});
