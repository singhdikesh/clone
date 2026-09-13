import express from "express";
import { getAllUsers, createUser } from "../controller/userController.ts";
const router = express.Router();

router.get("/", getAllUsers);
router.post("/", createUser);

export default router;
