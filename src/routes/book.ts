import { Elysia, t } from "elysia";
import {
  createBookSchema,
  bookSchema,
  allBooksSchema,
  updateBookSchema,
} from "../models/book";
import { createBook } from "../use-cases/books/createBook";
import { getAllBooks } from "../use-cases/books/getAllBooks";
import { getBookByID } from "../use-cases/books/getBookById";
import { deleteBookByID } from "../use-cases/books/deleteBook";
import { updateBookByID } from "../use-cases/books/updateBookByID";
import { successSchema, errorSchema } from "../models/response";

export const bookRoutes = (app: Elysia) =>
  app
    .get("/books", getAllBooks, {
      response: {
        200: successSchema(allBooksSchema),
        404: errorSchema,
        500: errorSchema,
      },
    })
    .get("/books/:id", getBookByID, {
      response: {
        200: successSchema(bookSchema),
        404: errorSchema,
        500: errorSchema,
      },
      params: t.Object({
        id: t.String({ format: "uuid" }),
      }),
    })
    .post("/books", createBook, {
      body: createBookSchema,
      response: {
        201: successSchema(bookSchema),
        409: errorSchema,
        500: errorSchema,
      },
    })
    .delete("/books/:id", deleteBookByID, {
      params: t.Object({
        id: t.String({ format: "uuid" }),
      }),
      response: {
        200: successSchema(bookSchema),
        404: errorSchema,
        500: errorSchema,
      },
    })
    .put("books/:id", updateBookByID, {
      params: t.Object({
        id: t.String({ format: "uuid" }),
      }),
      body: updateBookSchema,
      response: {
        200: successSchema(bookSchema),
        404: errorSchema,
        500: errorSchema,
      },
    });
