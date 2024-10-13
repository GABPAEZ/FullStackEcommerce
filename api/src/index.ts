import express, { json, urlencoded } from 'express'
import serverless from "serverless-http";
import productRouter from './routes/products/index.js';
import authRouter from './routes/auth/index.js'

const port = 3000;
const app = express();

app.use(urlencoded({extended: false}))
app.use(json())
app.use('/products', productRouter);
app.use('/auth', authRouter)

if (process.env.NODE_ENV === "dev") {
    app.listen(port, () => {
        console.log(`Example app listening on port ==> ${port}`)
    })
}

export const handler = serverless(app);