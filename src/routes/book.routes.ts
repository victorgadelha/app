import { Elysia } from "elysia";
import { bookSchema } from "../models/book";
import { createBookHandler } from "../handlers/books/create.book.handler";
import { errorSchema, successSchema } from "../models/response";

export const bookRoutes = (app: Elysia) =>
  app.model({ "book.create": bookSchema }).post("/books", createBookHandler, {
    body: bookSchema,
    response: { 201: successSchema(bookSchema), 409: errorSchema },
  });
