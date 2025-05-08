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
import { betterAuth } from "../middlewares/auth";

export const bookRoutes = new Elysia().group("/books", (app) =>
  app
    .use(betterAuth)
    .get("/", getAllBooks, {
      response: {
        200: successSchema(allBooksSchema),
        404: errorSchema,
        500: errorSchema,
      },
      auth: true,
    })
    .get("/:id", getBookByID, {
      response: {
        200: successSchema(bookSchema),
        404: errorSchema,
        500: errorSchema,
      },
      params: t.Object({
        id: t.String({ format: "uuid" }),
      }),
    })
    .post("/", createBook, {
      body: createBookSchema,
      response: {
        201: successSchema(bookSchema),
        409: errorSchema,
        500: errorSchema,
      },
    })
    .delete("/:id", deleteBookByID, {
      params: t.Object({
        id: t.String({ format: "uuid" }),
      }),
      response: {
        200: successSchema(bookSchema),
        404: errorSchema,
        500: errorSchema,
      },
    })
    .put("/:id", updateBookByID, {
      params: t.Object({
        id: t.String({ format: "uuid" }),
      }),
      body: updateBookSchema,
      response: {
        200: successSchema(bookSchema),
        404: errorSchema,
        500: errorSchema,
      },
    })
);
