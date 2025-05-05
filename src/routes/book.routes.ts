import { Elysia } from "elysia";
import { createBookSchema, bookSchema, allBooksSchema } from "../models/book";
import { createBookHandler } from "../handlers/books/create.book.handler";
import { errorSchema, successSchema } from "../models/response";
import { getAllBooksHandler } from "../handlers/books/get.all.books.handler";
import { getBookHandler } from "../handlers/books/get.book.handler";

export const bookRoutes = (app: Elysia) =>
  app
    .get("/books", getAllBooksHandler, {
      response: { 200: successSchema(allBooksSchema), 404: errorSchema },
    })
    .get("/books/:id", getBookHandler, {
      response: {
        200: successSchema(bookSchema),
        404: errorSchema,
        500: errorSchema,
      },
    })
    .post("/books", createBookHandler, {
      body: createBookSchema,
      response: { 201: successSchema(bookSchema), 409: errorSchema },
    });
