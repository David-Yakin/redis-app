import express, { Request, Response } from "express";
const router = express.Router();
import usersRoutes from "../users/routes/usersRoutes";
import redisRoutes from "../cache/redisRoutes";

router.use("/users", usersRoutes);
router.use("/cache", redisRoutes);
router.use(express.static("../../public"));
router.use("*", (req: Request, res: Response) =>
  res.status(404).send("Page not found!")
);

export default router;
