import { Request, Response, NextFunction } from "express";
import { db } from "../../db/index.js";
import { orderItemsTable, ordersTable } from "../../db/ordersSchema.js";

import { eq } from "drizzle-orm";
import _ from 'lodash';


export async function createOrder(req: Request, res: Response) {
    
    try {
        const {order, items} = req.cleanBody;
        const userId = Number(req.userId);

        if (!userId) {
            res.status(400).json({ message: 'Invalid user data' });
        }

        const [newOrder] = await db.insert(ordersTable).values({ userId }).returning();

        //TODO: validar ids de productos, y tomar el precio actual de la db
        const orderItems = items.map((item: any) => ({ 
            ...item,
            orderId : newOrder.id
        }))
        
        const newOrderItems = await db.insert(orderItemsTable).values(orderItems).returning();

        res.status(201).json({ ...newOrder, items: newOrderItems})
        
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: 'Invalid order data' });
    }
}