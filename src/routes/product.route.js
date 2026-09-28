import express from "express"
import  { createProduct, getProducts ,getProductById,updateProduct,deleteProduct} from "../controllers/product.controller.js";
import authenticate from "../middlewares/auth.middleware.js";


const router = express.Router();


// public routes

router.get("/", getProducts);

router.get("/:id", getProductById);



// Protected
router.post("/", authenticate, createProduct);

router.put("/:id", authenticate, updateProduct);

router.delete("/:id", authenticate, deleteProduct);



export default router