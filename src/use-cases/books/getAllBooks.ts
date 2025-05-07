import { error as httpError } from "elysia";
import { db } from "../../database/client";
import { books } from "../../database/schemas/schema";

export const getAllBooks = async () => {
  try {
    const booksList = await db.select().from(books);
    if (booksList.length === 0) {
      return httpError(404, {
        success: false,
        message: "No books found.",
      });
    }
    return { success: true as const, data: booksList };
  } catch (error: any) {
    return httpError(500, { success: false, message: "Internal server error" });
  }
};
