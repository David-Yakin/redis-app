import RedisClient from "./redis";

export const isCollectionExistsInCache = async (collection: string) => {
  try {
    const isExist = await RedisClient.exists(String(collection));
    return String(isExist === 1 ? "Exists" : "Not exists");
  } catch (error) {}
};
