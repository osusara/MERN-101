import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
    text: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})

export const Todo = mongoose.model("Todo", todoSchema)