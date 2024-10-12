import { Request, Response, NextFunction } from "express";
import { db } from "../../db";
import { createProductSchema, productsTable } from "../../db/productSchema";
import { eq } from "drizzle-orm";
import _ from 'lodash';

//LIST OF PRODUCTS
export async function listProducts(req: Request, res: Response) {

    try {
        const products = await db.select().from(productsTable);
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).send(error);
    }
}
//FIND A PRODUCT BY ID
export async function getProductById(req: Request, res: Response) {
    
    const { id } = req.params;

    try {
        const [product] = await db.select().from(productsTable).where(eq(productsTable.id, Number(id)));
        if (!product) {
            res.status(404).json({"message":"Product not found"})
        } else {
            res.status(200).json(product);
        }

    } catch (error) {
        res.status(500).send(error);
    }
}
//CREATE A PRODUCT
export async function createProduct(req: Request, res: Response) {

    try {
    
    //  console.log(Object.keys(createProductSchema.shape));  para valida solo los campos que estan en el scheme ignora el resto
       //const  data = _.pick(req.body, Object.keys(createProductSchema.shape))
       const [product] = await db.insert(productsTable).values(req.cleanBody).returning();
       res.status(201).json(product);
    
   } catch (error) {
        res.status(500).send(error);
   }
}

//UPDATE A PRODUCT, I can only send that fields that to be change
export async function updateProduct(req: Request, res: Response) {
    const { id } = req.params;
    const updatedFields = req.cleanBody;

    try {
      
        const [product] = await db.update(productsTable).set(updatedFields).where(eq(productsTable.id, Number(id))).returning();
        if (!product) {
            res.status(404).json({"message":"Product not found"})
        } else {
            res.status(200).json(product);
        }

    } catch (error) {
        res.status(500).send(error);
    }
}

//DELETE A PRODUCT
export async function deleteProduct(req: Request, res: Response) {
    const { id } = req.params;

    try {
         const [ product] = await db.delete(productsTable).where(eq(productsTable.id, Number(id))).returning();
        if (!product) {
            res.status(404).json({"message":"Product not found"})
        } else {
            res.status(200).json({"message" : `Product with Id: ${id} was deleted`});
        }

    } catch (error) {
        res.status(500).send(error);
    }
}