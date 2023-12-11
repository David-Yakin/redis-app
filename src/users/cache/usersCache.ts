import { NextFunction, Response, Request } from "express";
import RedisClient from "../../cache/redis";
import UserInterface from "../interfaces/UserInterface";

export const getCachedUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cachedUsers = await RedisClient.json.get("users");
    if (!cachedUsers) return next();
    console.log("users from cache!!!");
    return res.send(cachedUsers);
  } catch (error) {
    next();
  }
};

export const getCachedUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: userId } = req.params;
    const cachedUsers = (await RedisClient.json.get(
      "users"
    )) as UserInterface | null;

    if (!cachedUsers || Array.isArray(cachedUsers) === false) return next();
    const cachedUser = cachedUsers.find((user) => user._id === userId);

    console.log("user from cache!!!");
    return res.send(cachedUser);
  } catch (error) {
    next();
  }
};
