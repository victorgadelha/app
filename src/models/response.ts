import { t } from "elysia";
import { Static, TSchema } from "@sinclair/typebox";

export const errorSchema = t.Object({
  success: t.Literal(false),
  message: t.String(),
  details: t.Optional(t.String()),
});

export const successSchema = <T extends TSchema>(schema: T) =>
  t.Object({
    success: t.Literal(true),
    data: t.Optional(schema),
  });
