import { db } from "../../database/client";
import { books } from "../../database/schemas/schema";
import { CreateBook } from "../../models/book";
import { eq } from "drizzle-orm";
import { error as httpError } from "elysia";

export const createBook = async ({
  body,
  set,
}: {
  body: CreateBook;
  set: any;
}) => {
  try {
    const book = await db.select().from(books).where(eq(books.isbn, body.isbn));
    if (book.length > 0) {
      return httpError(409, {
        success: false as const,
        message: "Book already exists",
      });
    }
    const newBook = await db.insert(books).values(body).returning();
    set.status = 201;
    return { success: true as const, data: newBook[0] };
  } catch (error: any) {
    return httpError(500, { success: false, message: "Internal server error" });
  }
};
