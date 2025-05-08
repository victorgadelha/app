import { auth } from "../../../lib/auth";
import { SignUp } from "../../models/auth";
import { error as httpError } from "elysia";
import { APIError } from "better-auth/api";

export const signUp = async ({ body, set }: { body: SignUp; set: any }) => {
  try {
    const { email, password, name } = body;
    const response = await auth.api.signUpEmail({
      body: { email, password, name },
    });
    set.status = 201;
    return { success: true as const, data: response.user };
  } catch (error) {
    if (error instanceof APIError && error.status === "UNPROCESSABLE_ENTITY")
      return httpError(422, {
        success: false,
        message: "Sign up failed.",
        details: error.message,
      });
    if (error instanceof APIError)
      return httpError(500, {
        success: false,
        message: "Sign up failed.",
        details: `${error.status}: ${error.message}`,
      });

    return httpError(500, {
      success: false,
      message: "Internal server error",
    });
  }
};
