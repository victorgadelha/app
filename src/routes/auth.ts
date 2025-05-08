import Elysia from "elysia";
import { t } from "elysia";
import { signUp } from "../use-cases/auth/signUp";
import { signIn } from "../use-cases/auth/signIn";

export const authRoutes = new Elysia().group("/auth", (app) =>
  app.post("/sign-up", signUp, {}).post("/sign-in", signIn, {})
);
