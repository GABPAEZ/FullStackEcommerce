import { Router } from 'express';
import { validateData } from '../../middlewares/validationMiddleware.js';

import { insertOrderWithItemsSchema } from "../../db/ordersSchema.js";
import { verifySeller, verifyToken } from '../../middlewares/authMiddlewares.js';
import { createOrder } from './ordersController.js';




const router = Router();


router.post('/', verifyToken ,validateData(insertOrderWithItemsSchema) ,  createOrder)

router.get('/', );

router.get('/:id',  )


router.put('/:id',);

router.delete('/:id',)

export default router;