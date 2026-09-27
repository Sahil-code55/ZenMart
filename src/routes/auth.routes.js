import express  from "express"
import { login, register,getMe }  from "../controllers/auth.controller.js"
import { loginValidator, registerValidator } from "../validators/auth.validator.js";
import validate from "../middlewares/validate.middleware.js";
import authenticate from "../middlewares/auth.middleware.js";

const router = express.Router();


router.post(
    "/register"
    ,registerValidator,
    validate
    ,register)


router.post(
  "/login",
  loginValidator,
  validate,
  login
);    

router.get(
   "/me",
    authenticate,
    getMe
);


export default router