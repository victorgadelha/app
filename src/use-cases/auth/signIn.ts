import { APIError } from "better-auth/api";
import { auth } from "../../../lib/auth";
import { SignIn } from "../../models/auth";
import { error as httpError } from "elysia";

export const signIn = async ({ body }: { body: SignIn }) => {
  try {
    const { email, password } = body;
    const response = await auth.api.signInEmail({ body: { email, password } });
    return { succes: true, data: response.user };
  } catch (error) {
    if (error instanceof APIError && error.status === "UNAUTHORIZED")
      return httpError(401, {
        succes: false,
        message: "Sign in attempt failed.",
        details: error.message,
      });
    if (error instanceof APIError)
      return httpError(500, {
        success: false,
        message: "Sign up failed.",
        details: `${error.status}: ${error.message}`,
      });
    return httpError(500, {
      succes: false,
      message: "Sign in attempt failed.",
    });
  }
};
