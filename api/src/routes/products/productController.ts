import { Request, Response, NextFunction } from "express";

export function listProducts(req:Request, res:Response) {
    res.send('The list of products');
}

export function getProductById(req:Request, res:Response){
    console.log(req.params);
    res.send('Identificacion de producto');
}

export function createProduct(req: Request, res: Response) {
    console.log(req.body);
    res.send('New product created');
}

export function updateProduct(req: Request, res: Response) {
    res.send('update product');
}

export function deleteProduct(req: Request, res: Response) {
    res.send('delete product');
}