import { Elysia } from "elysia";
import { createBookSchema, bookSchema, allBooksSchema } from "../models/book";
import { createBookHandler } from "../handlers/books/create.book.handler";
import { errorSchema, successSchema } from "../models/response";
import { getAllBooksHandler } from "../handlers/books/get.all.books.handler";

export const bookRoutes = (app: Elysia) =>
  app
    .get("/books", getAllBooksHandler, {
      response: { 200: successSchema(allBooksSchema), 404: errorSchema },
    })
    .post("/books", createBookHandler, {
      body: createBookSchema,
      response: { 201: successSchema(bookSchema), 409: errorSchema },
    });
