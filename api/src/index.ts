import express, { json, urlencoded } from 'express'
import productRouter  from './routes/products';

const port = 3000;
const app = express();

app.use(urlencoded({extended: false}))
app.use(json())
app.use('/products', productRouter);


app.listen(port, () => {
    console.log(`Example app listening on port ==> ${port}`)
})