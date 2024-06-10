import express, { Router } from "express";
import users from "./userRoutes";
import posts from "./postRoutes";
import redes from "./apiredesocialRoutes";


const router: Router = express.Router();

router.use("/", users);
router.use("/", posts);
router.use("/", redes);


export default router;