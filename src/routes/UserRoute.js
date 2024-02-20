import express from "express";
import {
  createAUser,
  getSelfUserDetails,
  updateSelfUserDetails,
} from "../controllers/UserController.js";
import {
  validateNoBody,
  validateNoQueryParams,
} from "../middlewares/CommonMiddleware.js";
import { handleMethodNotAllowed } from "../controllers/CommonMethod.js";
import {
  setUserHeaders,
  validateCreateUserDetails,
  validateUpdateUserDetails,
} from "../middlewares/UserMiddleware.js";
import { protectRoute } from "../middlewares/BasicAuthorizationMiddleware.js";

export const userRouter = express.Router();

// endpoint '/'

userRouter.head("/", setUserHeaders, handleMethodNotAllowed);
userRouter.get("/", setUserHeaders, handleMethodNotAllowed);

userRouter.post(
  "/",
  setUserHeaders,
  validateNoQueryParams,
  validateCreateUserDetails,
  createAUser
);

userRouter.put("/", setUserHeaders, handleMethodNotAllowed);
userRouter.delete("/", setUserHeaders, handleMethodNotAllowed);
userRouter.patch("/", setUserHeaders, handleMethodNotAllowed);
userRouter.options("/", setUserHeaders, handleMethodNotAllowed);

// endpoint '/self'

userRouter.head("/self", setUserHeaders, handleMethodNotAllowed);

userRouter.get(
  "/self",
  setUserHeaders,
  protectRoute,
  validateNoQueryParams,
  validateNoBody,
  getSelfUserDetails
);
userRouter.put(
  "/self",
  setUserHeaders,
  protectRoute,
  validateNoQueryParams,
  validateUpdateUserDetails,
  updateSelfUserDetails
);

userRouter.post("/self", setUserHeaders, handleMethodNotAllowed);
userRouter.delete("/self", setUserHeaders, handleMethodNotAllowed);
userRouter.patch("/self", setUserHeaders, handleMethodNotAllowed);
userRouter.options("/self", setUserHeaders, handleMethodNotAllowed);
