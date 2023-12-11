import express from "express";
import chalk from "chalk";
const app = express();
import { config } from "dotenv";
import RedisClient from "./cache/redis";
import connectToMongoDB from "./db/mongodb/concentToMongoDB";
config();
import router from "./router/router";
import morgan from "./logger/morgan";
import cors from "./cors/cors";
const { EXPRESS_BASE_URL, EXPRESS_PORT } = process.env;

app.use(morgan);
app.use(cors);
app.use(express.json());
app.use(express.text());
app.use(router);

app.listen(EXPRESS_PORT, () => {
  console.log(
    chalk.yellowBright(`listening on: ${EXPRESS_BASE_URL}${EXPRESS_PORT}`)
  );

  connectToMongoDB()
    .then((message) => console.log(chalk.blueBright(message)))
    .catch((error) => console.log(chalk.redBright(error.message)));

  RedisClient.connect()
    .then(() =>
      console.log(
        chalk.magentaBright("connected successfully to Redis client!!! ")
      )
    )
    .catch((error) => {
      if (error instanceof Error) console.log(error.message);
    });
});

// import express, { Request, Response, NextFunction } from "express";
// const cache = (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { userName } = req.query;
//     if (userName)
//       client.get(String(userName), (error, data) => {
//         if (error) throw error;
//       });
//   } catch (error) {}
// };

// const client = createClient({
//   password: "BngRH9vLUoR5Cr6P6eYo6J7pS5DleH2g",
//   socket: {
//     host: "redis-19601.c72.eu-west-1-2.ec2.cloud.redislabs.com",
//     port: 19601,
//   },
// });

// client.on("error", (err) =>
//   console.log(chalk.redBright("Redis Client Error", err))
// );

// app.get("/", async (req, res) => {
//   try {
//     const { test } = req.query;
//     if (test) await client.set("test", String(test));

//     const data = await client.get("test");
//     res.send(data);
//   } catch (error) {
//     if (error instanceof Error) {
//       console.log(chalk.redBright(error.message));
//       res.send(error.message);
//     }
//   }
// });

// app.get("/cards", async (req, res) => {
//   try {
//     const data = await RedisClient.get("test");
//     res.send(data);
//   } catch (error) {
//     if (error instanceof Error) {
//       console.log(chalk.redBright(error.message));
//       res.send(error.message);
//     }
//   }
// });
