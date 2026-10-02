import express from "express"
import  { createProduct, getProducts ,getProductById,updateProduct,deleteProduct} from "../controllers/product.controller.js";
import authenticate from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import { productIdValidator, productValidator } from "../validators/product.validator.js";



const router = express.Router();


// <==========================================public routes==============================================>

router.get("/", getProducts);

router.get(
  "/:id",
  productIdValidator,
  validate,
  getProductById
);



// <========================================== Protected Route==============================================>
router.post(
  "/",
  authenticate,
  productValidator,
  validate,
  createProduct
);


router.put(
  "/:id",
  authenticate,
  productIdValidator,
  productValidator,
  validate,
  updateProduct
);

router.delete(
  "/:id",
  authenticate,
  productIdValidator,
  validate,
  deleteProduct
);



export default router