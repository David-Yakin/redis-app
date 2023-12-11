import express from "express";
import {
  handleGetUser,
  handleGetUsers,
  handleUserRegistration,
  // handleEditUser,
  // handleDeleteUser,
  // handleLogin,
} from "../controllers/usersControllers";
// import { auth } from "../../auth/providers/jwt";
import { getCachedUser, getCachedUsers } from "../cache/usersCache";
const router = express.Router();

router.get("/", getCachedUsers, handleGetUsers);
// router.get("/", auth, getCachedUsers, handleGetUsers);
router.get("/:id", getCachedUser, handleGetUser);
router.post("/", handleUserRegistration);
// router.put("/:id", auth, handleEditUser);
// router.delete("/:id", auth, handleDeleteUser);
// router.post("/login", handleLogin);

export default router;
