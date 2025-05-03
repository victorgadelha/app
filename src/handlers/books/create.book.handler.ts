import { db } from "../../db/client";
import { books } from "../../db/schema";
import { Book } from "../../models/book";

export const createBookHandler = async ({
  body,
  set,
}: {
  body: Book;
  set: any;
}) => {
  const book = await db.insert(books).values(body).returning();
  set.status = 201;
  return book[0];
};
