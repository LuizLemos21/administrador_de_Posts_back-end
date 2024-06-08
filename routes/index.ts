import express, { Router } from "express";
import users from "./user";
import posts from "./post";
import redes from "./apiredesocial";
import usuarioAPIRedeSocialRouter from "./usuario_api";


const router: Router = express.Router();

router.use("/", users);
router.use("/", posts);
router.use("/", redes);
router.use("/",usuarioAPIRedeSocialRouter);


export default router;