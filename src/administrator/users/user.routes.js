import express from "express";
import { register, update } from "./user.controller.js";

const api = express.Router()

api.post('/register', register)
api.put('/update/:id', update)

export default api