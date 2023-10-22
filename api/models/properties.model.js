import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true,
    }
}, {timestamps: true})

const property = mongoose.model("propertie", propertySchema)

export default property