import { error as httpError } from "elysia";
import { db } from "../../database/client";
import { books } from "../../database/schema";
import { UpdateBook } from "../../models/book";
import { eq } from "drizzle-orm";

export const updateBookByID = async ({
  params,
  body,
}: {
  params: { id: string };
  body: UpdateBook;
}) => {
  try {
    const [book] = await db.select().from(books);
    if (!book) {
      return httpError(404, {
        success: false,
        message: "No book found.",
      });
    }
    const [updatedBook] = await db
      .update(books)
      .set(body)
      .where(eq(books.id, params.id))
      .returning();
    return { success: true as const, data: updatedBook };
  } catch (error) {
    console.error("Error fetching books:", error);
    return httpError(500, { success: false, message: "Internal server error" });
  }
};
