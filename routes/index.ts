import express, { Router } from "express";
import users from "./userRoutes";
import posts from "./postRoutes";
import redes from "./apiredesocialRoutes";
import usuarioAPIRedeSocialRouter from "./usuario_api";


const router: Router = express.Router();

router.use("/", users);
router.use("/", posts);
router.use("/", redes);
router.use("/",usuarioAPIRedeSocialRouter);


export default router;