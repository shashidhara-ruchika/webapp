import Joi from "joi";
import { errorLogger, infoLogger } from "../services/LoggerService.js";

const strongPasswordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,50}$/;
const strongPasswordJoiObject = Joi.string()
  .pattern(strongPasswordPattern)
  .message(
    "Password must contain atleast one lowercase, uppercase, digit & special character and have length between 8 - 50"
  );

export const createUserValidationSchema = Joi.object({
  first_name: Joi.string().required().min(1).max(50),
  last_name: Joi.string().required().min(1).max(50),
  password: strongPasswordJoiObject.required(),
  username: Joi.string().email().required(),
}).unknown(true);

export const validateCreateUserDetails = (req, res, next) => {
  const { error, value } = createUserValidationSchema.validate(req.body);
  if (error) {
    errorLogger.error("Bad Request: User creation validation", error.details);
    res
      .status(400)
      .json({ message: "User validation failed: " + error.details[0].message })
      .end();
    return res;
  }
  next();
};

export const updateUserValidationSchema = Joi.object({
  first_name: Joi.string().min(1).max(50),
  last_name: Joi.string().min(1).max(50),
  password: strongPasswordJoiObject,
})
  .or("first_name", "last_name", "password")
  .required();

export const validateUpdateUserDetails = (req, res, next) => {
  const { error, value } = updateUserValidationSchema.validate(req.body);
  if (error) {
    errorLogger.error("Bad Request: User updation validation", error.details);
    res
      .status(400)
      .json({ message: "User validation failed: " + error.details[0].message })
      .end();
    return res;
  }
  next();
};
