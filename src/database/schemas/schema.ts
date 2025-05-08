import {
  pgTable,
  uuid,
  text,
  integer,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";

import { users } from "./auth-schema";

export const books = pgTable("books", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  language: text("language").notNull(),
  isbn: text("isbn").unique().notNull(),
  description: text("description").notNull(),
  genre: text("genre").notNull(),
  edition: integer("edition").notNull(),
  publisher: text("publisher").notNull(),
  copiesAvailable: integer("copies_available").notNull(),
  totalCopies: integer("total_copies").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const status = pgEnum("status", [
  "PENDING",
  "IN_PROGRESS",
  "RETURNED",
  "LATE",
]);
export const loans = pgTable("loans", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  bookId: uuid("book_id")
    .notNull()
    .references(() => books.id),
  status: status("status").default("PENDING").notNull(),
  loanDate: timestamp("loan_date"),
  dueDate: timestamp("due_date"),
  returnDate: timestamp("return_date"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const reservations = pgTable("reservations", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  bookId: uuid("book_id")
    .notNull()
    .references(() => books.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
