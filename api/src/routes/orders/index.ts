import { Router } from 'express';
import { validateData } from '../../middlewares/validationMiddleware.js';

import { insertOrderWithItemsSchema,updateOrderSchema } from "../../db/ordersSchema.js";
import { verifySeller, verifyToken } from '../../middlewares/authMiddlewares.js';
import { createOrder, getOrder, listOrders, updateOrder } from './ordersController.js';

const router = Router();

router.post('/', verifyToken ,validateData(insertOrderWithItemsSchema) ,  createOrder)
router.get('/', verifyToken, listOrders );
router.get('/:id',verifyToken, getOrder )
router.put('/:id',verifyToken, validateData(updateOrderSchema), updateOrder);

router.delete('/:id',)

export default router;