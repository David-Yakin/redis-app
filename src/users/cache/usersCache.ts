import { NextFunction, Response, Request } from "express";
import RedisClient from "../../cache/redis";

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
    const cachedUsers = await RedisClient.json.get("users");
    const cachedUser = JSON.parse(String(cachedUsers)).find(
      (user: any) => user._id === userId
    );
    if (!cachedUser) return next();
    const normalizeUsers = JSON.parse(String(cachedUser));
    console.log("user from cache!!!");
    return res.send(normalizeUsers);
  } catch (error) {
    next();
  }
};
