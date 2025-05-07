import { Elysia } from "elysia";
import { bookRoutes } from "./routes/book";
import { betterAuth } from "./middlewares/auth";

const app = new Elysia().use(betterAuth).use(bookRoutes).listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
