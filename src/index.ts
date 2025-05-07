import { Elysia } from "elysia";
import { bookRoutes } from "./routes/book";

const app = new Elysia().use(bookRoutes).listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
