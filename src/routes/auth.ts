import Elysia from "elysia";
import { t } from "elysia";
import { signUp } from "../use-cases/auth/signup";

export const authRoutes = (app: Elysia) => app.post("/auth", signUp, {});
