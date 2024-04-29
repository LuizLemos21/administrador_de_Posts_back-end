import express, { Router } from "express";
import users from "./user";
import posts from "./post";


const router: Router = express.Router();

router.use("/", users);
router.use("/", posts);


export default router;