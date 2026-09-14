import express from "express";
import { getAllUsers, createUser, getUserById } from "../controller/userController.ts";
import { asyncHandler } from "../utils/asyncHandler.ts";
const router = express.Router();

router.get("/", asyncHandler(getAllUsers));
router.get("/:id", asyncHandler(getUserById));
router.post("/", asyncHandler(createUser));

export default router;
