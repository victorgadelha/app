import { Elysia } from "elysia";
import { bookRoutes } from "./routes/book";
import { auth } from "../lib/auth";
import { cors } from "@elysiajs/cors";
import { authRoutes } from "./routes/auth";

const app = new Elysia({ prefix: "/api/v1" })
  .use(
    cors({
      origin: "http://localhost:3001",
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  )
  .mount(auth.handler)
  .use(authRoutes)
  .use(bookRoutes)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
