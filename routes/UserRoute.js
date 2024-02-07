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
  validateCreateUserDetails,
  validateUpdateUserDetails,
} from "../middlewares/UserMiddleware.js";
import { protectRoute } from "../middlewares/BasicAuthorizationMiddleware.js";

export const userRouter = express.Router();

// endpoint '/'

userRouter.head("/", handleMethodNotAllowed);
userRouter.get("/", handleMethodNotAllowed);

userRouter.post(
  "/",
  validateNoQueryParams,
  validateCreateUserDetails,
  createAUser
);

userRouter.put("/", handleMethodNotAllowed);
userRouter.delete("/", handleMethodNotAllowed);
userRouter.patch("/", handleMethodNotAllowed);
userRouter.options("/", handleMethodNotAllowed);

// endpoint '/self'

userRouter.head("/self", handleMethodNotAllowed);

userRouter.get(
  "/self",
  protectRoute,
  validateNoQueryParams,
  validateNoBody,
  getSelfUserDetails
);
userRouter.put(
  "/self",
  protectRoute,
  validateNoQueryParams,
  validateUpdateUserDetails,
  updateSelfUserDetails
);

userRouter.post("/self", handleMethodNotAllowed);
userRouter.delete("/self", handleMethodNotAllowed);
userRouter.patch("/self", handleMethodNotAllowed);
userRouter.options("/self", handleMethodNotAllowed);
