import Elysia from "elysia";
import { t } from "elysia";
import { signUp } from "../use-cases/auth/signup";

export const authRoutes = new Elysia().group("/auth", (app) =>
  app.post("/sign-up", signUp, {})
);
