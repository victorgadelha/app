import { auth } from "../../../lib/auth";
import { SignUp } from "../../models/auth";
import { error as httpError } from "elysia";

export const signUp = async ({ body }: { body: SignUp }) => {
  try {
    const { email, password, name } = body;
    const response = await auth.api.signUpEmail({
      body: { email, password, name },
      asResponse: true,
    });
    return { success: true as const, data: response };
  } catch (error) {
    console.error(error);
    return httpError(500, {
      success: false,
      message: "Internal server error",
    });
  }
};
