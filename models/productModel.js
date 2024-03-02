import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    image: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    model: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    stocks: {
        type: Number,
        require: true,
    },
    role: {
        type: Number,
        default: 3
    }
}, { timestamps: true });

export default mongoose.model('product', productSchema);