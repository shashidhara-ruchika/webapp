import Joi from "joi";
import { errorLogger, infoLogger } from "../services/LoggerService.js";

const strongPasswordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,50}$/;
const strongPasswordJoiObject = Joi.string()
  .pattern(strongPasswordPattern)
  .message(
    "Password must contain atleast one lowercase, uppercase, digit & special character and have length between 8 - 50"
  );

const onlyLetterPattern = /^[a-zA-Z]+$/;
const onlyLetterPatternJoiObject = Joi.string()
  .pattern(onlyLetterPattern)
  .message("Name must contain only Letters");

export const createUserValidationSchema = Joi.object({
  first_name: onlyLetterPatternJoiObject.required().min(1).max(50),
  last_name: onlyLetterPatternJoiObject.required().min(1).max(50),
  password: strongPasswordJoiObject.required(),
  username: Joi.string().email().required(),
  account_created: Joi.string(),
  account_updated: Joi.string(),
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
  first_name: onlyLetterPatternJoiObject.min(1).max(50),
  last_name: onlyLetterPatternJoiObject.min(1).max(50),
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

export const setUserHeaders = (req, res, next) => {
  res.removeHeader("Connection");
  res.removeHeader("Keep-Alive");
  res.setHeader("Cache-Control", "no-cache");
  // res.setHeader("Content-Encoding", "gzip");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,Content-Type,Accept,Origin"
  );
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Expires", "-1");
  next();
};
