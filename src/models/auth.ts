import { t } from "elysia";
import { Static } from "@sinclair/typebox";

export const signInSchema = t.Object({
  email: t.String(),
  password: t.String(),
});

export const signUpSchema = t.Object({
  email: t.String(),
  password: t.String(),
  name: t.String(),
});

export type SignUp = Static<typeof signUpSchema>;
export type SignIn = Static<typeof signInSchema>;
