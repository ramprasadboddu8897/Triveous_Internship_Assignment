import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cors from 'cors';
import userRouter from "./routes/user.js";
import productRouter from "./routes/product.js";
import categoriesRouter from './routes/category.js';

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express'

const app = express();
dotenv.config();

//Body Parser Middleware
app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());

app.use('/user', userRouter);
app.use('/category', productRouter);
app.use('/categories', categoriesRouter);

const CONNECTION_URL=process.env.CONNECTION_URL;
const PORT  = process.env.PORT || 5000;

//Swagger options
const swaggerOptions={
    definition: {
        openapi:"3.0.0",
        info: {
            title: "E-Commerce API Documentation",
            version: "1.0.0",
            description:
                "Created API Documentation Using Swagger Author: Ramprasad Boddu",
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
            },
        ],
    },
    apis: ["./controllers/*.js"], //Path to the API routes directory
}

const swaggerSpec = swaggerJSDoc(swaggerOptions);

//Server Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

mongoose.connect(CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>app.listen(PORT,()=> console.log(`Server running on port: ${PORT}`)))
    .catch((err)=> console.log(err));
