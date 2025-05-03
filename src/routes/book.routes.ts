import { Elysia } from "elysia";
import { bookSchema } from "../models/book";
import { createBookHandler } from "../handlers/books/create.book.handler";

export const bookRoutes = (app: Elysia) =>
  app.model({ "book.create": bookSchema }).post("/books", createBookHandler, {
    body: "book.create",
    response: bookSchema,
  });
