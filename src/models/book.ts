import { t } from "elysia";

export const bookSchema = t.Object({
  title: t.String(),
  author: t.String(),
  language: t.String(),
  isbn: t.String(),
  description: t.String(),
  genre: t.String(),
  edition: t.Integer(),
  publisher: t.String(),
  copiesAvailable: t.Integer(),
  totalCopies: t.Integer(),
});

export type Book = typeof bookSchema.static;
