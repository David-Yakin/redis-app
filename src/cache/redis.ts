import { createClient } from "redis";
import { config } from "dotenv";
config();

const { REDIS_PASSWORD, REDIS_PORT } = process.env;

const RedisClient = createClient({
  password: REDIS_PASSWORD,
  socket: {
    host: "redis-19601.c72.eu-west-1-2.ec2.cloud.redislabs.com",
    port: Number(REDIS_PORT),
  },
});

export default RedisClient;
