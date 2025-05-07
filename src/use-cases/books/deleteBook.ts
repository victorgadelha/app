import { eq } from "drizzle-orm";
import { db } from "../../database/client";
import { error as httpError } from "elysia";
import { books } from "../../database/schemas/schema";

export const deleteBookByID = async ({
  params,
  set,
}: {
  params: { id: string };
  set: any;
}) => {
  try {
    const [book] = await db.select().from(books).where(eq(books.id, params.id));

    if (!book) {
      return httpError(404, {
        success: false,
        message: "Resource not found.",
      });
    }
    await db.delete(books).where(eq(books.id, params.id));
    return {
      success: true as const,
    };
  } catch (error: any) {
    return httpError(500, {
      success: false,
      message: "Internal server error.",
    });
  }
};
