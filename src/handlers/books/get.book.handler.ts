import { db } from "../../db/client";
import { error as httpError } from "elysia";
import { books } from "../../db/schema";
import { eq } from "drizzle-orm";

export const getBookHandler = async ({
  params,
}: {
  params: { id: string };
}) => {
  try {
    const book = await db.select().from(books).where(eq(books.id, params.id));

    if (book.length === 0) {
      return httpError(404, {
        success: false as const,
        message: "No book found.",
      });
    }

    return { success: true as const, data: book[0] };
  } catch (err) {
    console.error("Erro capturado:", err);
    return httpError(500, {
      success: false as const,
      message: "Internal server error",
    });
  }
};
