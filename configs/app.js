'use strict'

import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import { config } from 'dotenv'
import adminProductrRoutes from '../src/administrator/products/product.routes.js'
import adminCategoryRoutes from '../src/administrator/categories/category.routes.js'
import adminUserRoutes from '../src/administrator/users/user.routes.js'
// import customerRoutes from '../src/customer/'

const app = express()   
config()
const port = process.env.PORT || 3056 


app.use(express.urlencoded({extended: false}))
app.use(express.json()) 
app.use(cors()) 
app.use(helmet())
app.use(morgan('dev')) 

app.use('/product', adminProductrRoutes)
app.use('/category', adminCategoryRoutes)
app.use('/user', adminUserRoutes)


export const initServer = () =>{
    app.listen(port)
    console.log(`Server HTTP running in port ${port}`)
}