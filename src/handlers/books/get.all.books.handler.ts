import { error as httpError } from "elysia";
import { db } from "../../db/client";
import { books } from "../../db/schema";

export const getAllBooksHandler = async () => {
  const booksList = await db.select().from(books);
  if (booksList.length === 0) {
    return httpError(404, {
      success: false,
      message: "No books found.",
    });
  }

  return { success: true as const, data: booksList };
};
