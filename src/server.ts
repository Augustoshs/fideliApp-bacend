import fastify from "fastify";
import { authController } from "./controller/auth";

const server = fastify();

server.post("/auth/create", authController.create);
server.post("/auth/login", authController.login);

server.listen({ port: 8080, host: "127.0.0.1" }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
