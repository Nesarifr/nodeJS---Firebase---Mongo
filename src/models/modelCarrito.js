import mongoose from "mongoose";

export const carritoCollection = "carritos"
export const carritoSchema = new mongoose.Schema(
        {
        carritoNum:{
            type: Number,
            required: true
        },
        idproduct: {
            type: Number,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        thumbnail: {
            type: String,
            required: true
        }
    }
)

