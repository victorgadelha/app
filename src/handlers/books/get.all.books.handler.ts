import { error as httpError } from "elysia";
import { db } from "../../db/client";
import { books } from "../../db/schema";

export const getAllBooksHandler = async () => {
  try {
    const booksList = await db.select().from(books);
    if (booksList.length === 0) {
      return httpError(404, {
        success: false,
        message: "No books found.",
      });
    }
    return { success: true as const, data: booksList };
  } catch (error) {
    console.error("Error fetching books:", error);
    return httpError(500, { success: false, message: "Internal server error" });
  }
};
