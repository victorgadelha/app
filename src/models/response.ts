import { t } from "elysia";
import { TSchema } from "@sinclair/typebox";

export const errorSchema = t.Object({
  success: t.Literal(false),
  message: t.String(),
});

export const successSchema = <T extends TSchema>(schema: T) =>
  t.Object({
    success: t.Literal(true),
    data: schema,
  });
