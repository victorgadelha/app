import { db } from "../../db/client";
import { books } from "../../db/schema";
import { Book } from "../../models/book";
import { eq } from "drizzle-orm";
import { error } from "elysia";

export const createBookHandler = async ({
  body,
  set,
}: {
  body: Book;
  set: any;
}) => {
  const book = await db.select().from(books).where(eq(books.isbn, body.isbn));
  if (book.length > 0) {
    return error(409, { success: false, message: "Book already exists" });
  }

  const newBook = await db.insert(books).values(body).returning();
  set.status = 201;
  return { success: true, data: newBook[0] };
};
