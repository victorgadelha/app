import { db } from "../../database/client";
import { error as httpError } from "elysia";
import { books } from "../../database/schema";
import { eq } from "drizzle-orm";

export const getBookByID = async ({ params }: { params: { id: string } }) => {
  try {
    const [book] = await db.select().from(books).where(eq(books.id, params.id));

    if (!book) {
      return httpError(404, {
        success: false as const,
        message: "No book found.",
      });
    }

    return { success: true as const, data: book };
  } catch (err: any) {
    return httpError(500, {
      success: false as const,
      message: "Internal server error",
    });
  }
};
