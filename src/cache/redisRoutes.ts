import express from "express";
import RedisClient from "./redis";
const router = express.Router();

router.get("/isExists", async (req, res) => {
  try {
    const { collection } = req.query;
    if (!collection) res.status(404).send("Please send a collection name");
    const isExist = await RedisClient.exists(String(collection));
    res.send(String(isExist === 1 ? "Exists" : "Not exists"));
  } catch (error) {
    if (error instanceof Error) res.status(400).send(error.message);
  }
});

router.delete("/remove-collection", async (req, res) => {
  try {
    const { collection } = req.query;
    if (!collection) res.status(404).send("Please send a collection name");
    const isExist = await RedisClient.exists(String(collection));
    if (isExist === 1) await RedisClient.json.del(String(collection));
    res.send(
      String(
        isExist === 1
          ? `The collection: ${collection} removed`
          : "This collection does not exists"
      )
    );
  } catch (error) {
    if (error instanceof Error) res.status(400).send(error.message);
  }
});

export default router;
