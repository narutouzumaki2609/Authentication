import  express  from "express";
import { login, register } from "../controllers/auth-controller.js";

const router = express.Router();

router.use("/login",login);
router.use("/register",register);


export default router;