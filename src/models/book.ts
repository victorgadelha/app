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
  createdAt: t.Date(),
});

export const allBooksSchema = t.Array(bookSchema);
export const updateBookSchema = t.Partial(createBookSchema);

export type CreateBook = Static<typeof createBookSchema>;
export type UpdateBook = Static<typeof updateBookSchema>;
export type Book = Static<typeof bookSchema>;
