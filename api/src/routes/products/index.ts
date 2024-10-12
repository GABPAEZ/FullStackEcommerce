import { Router } from 'express';
import { createProduct, deleteProduct, getProductById, listProducts, updateProduct,  } from './productController';

const router = Router();

router.get('/', (req, res) => {
    res.send('Hello World!')
})

router.get('/', listProducts);

router.get('/:id', getProductById )

router.post('/', createProduct)

router.put('/:id', updateProduct);

router.delete('/:id', deleteProduct)

export default router;