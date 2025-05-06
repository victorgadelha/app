import { Elysia, t } from "elysia";
import { createBookSchema, bookSchema, allBooksSchema } from "../models/book";
import { createBookHandler } from "../handlers/books/create.book.handler";
import { errorSchema, successSchema } from "../models/response";
import { getAllBooksHandler } from "../handlers/books/get.all.books.handler";
import { getBookHandler } from "../handlers/books/get.book.handler";

export const bookRoutes = (app: Elysia) =>
  app
    .get("/books", getAllBooksHandler, {
      response: {
        200: successSchema(allBooksSchema),
        404: errorSchema,
        500: errorSchema,
      },
    })
    .get("/books/:id", getBookHandler, {
      response: {
        200: successSchema(bookSchema),
        404: errorSchema,
        500: errorSchema,
      },
      params: t.Object({
        id: t.String({ format: "uuid" }),
      }),
    })
    .post("/books", createBookHandler, {
      body: createBookSchema,
      response: {
        201: successSchema(bookSchema),
        409: errorSchema,
        500: errorSchema,
      },
    });
