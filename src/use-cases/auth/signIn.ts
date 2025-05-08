import { APIError } from "better-auth/api";
import { auth } from "../../../lib/auth";
import { SignIn } from "../../models/auth";
import { error as httpError } from "elysia";

export const signIn = async ({
  body,
  set,
  cookie,
}: {
  body: SignIn;
  set: any;
  cookie: any;
}) => {
  try {
    const { email, password } = body;
    const { headers, response } = await auth.api.signInEmail({
      returnHeaders: true,
      body: { email, password },
    });

    const sessionCookie = headers.get("set-cookie");

    const [tokenPart, ...attributes] = sessionCookie!.split("; ");
    const [cookieName, cookieValue] = tokenPart.split("=");

    cookie[cookieName].set({
      value: decodeURIComponent(cookieValue),
      ...Object.fromEntries(
        attributes.map((attr) => {
          const [key, value] = attr.split("=");
          return [key.toLowerCase(), value ? decodeURIComponent(value) : true];
        })
      ),
    });

    set.status = 201;
    return {
      succes: true,
      data: response.user,
    };
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
