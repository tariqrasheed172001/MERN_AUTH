import  express  from "express";
const router = express.Router();

import { login, register, dashboard, getAllUsers, getUserById } from "../controllers/user.js";
import authMiddleware from '../middleware/auth.js'

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/dashboard").get(authMiddleware, dashboard);
router.route("/users").get(getAllUsers);
router.route("/getuser/:id").get(getUserById);


export default router;