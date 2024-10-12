//https://orm.drizzle.team/docs/column-types/pg

import { integer, pgTable, varchar, text, doublePrecision } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';

export const productsTable = pgTable('products', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    description: text(),
    image: varchar({ length: 255 }),
    price: doublePrecision().notNull()
});

//se asegura que vald solo los datos que se necesitan
export const createProductSchema = createInsertSchema(productsTable).omit({ id: true });
export const updateProductSchema = createInsertSchema(productsTable).omit({ id: true }).partial(); //con partial son todos opcionales