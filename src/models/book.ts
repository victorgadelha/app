import { Static, t } from "elysia";

export const createBookSchema = t.Object({
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

export const bookSchema = t.Object({
  id: t.String(),
  ...createBookSchema.properties,
});

export const allBooksSchema = t.Array(bookSchema);

export type Book = Static<typeof bookSchema>;
export type CreateBook = Static<typeof createBookSchema>;
