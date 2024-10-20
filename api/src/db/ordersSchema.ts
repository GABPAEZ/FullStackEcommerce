import { integer, pgTable, varchar, doublePrecision, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { usersTable } from './usersSchema.js';
import { productsTable } from './productSchema.js';
import { z } from 'zod';

export const ordersTable = pgTable('orders', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    createAt: timestamp().notNull().defaultNow(),
    status: varchar({ length: 50}).notNull().default('New'),
    //relacion one to many 
    userId : integer().references(()=> usersTable.id).notNull()
});

// tabla intermede many to many

export const orderItemsTable = pgTable('order_items', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),

    orderId: integer().references(() => ordersTable.id).notNull(),
    
    productId: integer().references(() => productsTable.id).notNull(),
    
    quantity: integer().notNull(),
    price: doublePrecision().notNull(),
})

export const insertOrderSchema = createInsertSchema(ordersTable).omit({ id: true, userId: true, status: true, createAt: true });
export const insertOrderItemSchema = createInsertSchema(orderItemsTable).omit({ id: true, orderId: true})


export const insertOrderWithItemsSchema = z.object({
    order: insertOrderSchema,
    items: z.array(insertOrderItemSchema)
})

export const updateOrderSchema = createInsertSchema(ordersTable).pick({ status : true})