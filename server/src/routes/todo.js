import express from "express"
const router = express.Router()

import { Todo } from '../models/Todo.js';

// get all todos
router.get("/", async (req, res) => {
    try {
        const todos = await Todo.find({})
        return res.json(todos)

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
})

// create todo
router.post("/", async (req, res) => {
    try {
        if (!req.body.todo) {
            return res.status(403).send({
                message: 'Todo data is missing'
            })
        }

        const todo = await Todo.create(req.body.todo);
        return res.status(201).send(todo);

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
})

// update todo
router.put("/:id", async (req, res) => {
    try {
        if (!req.body.todo) {
            return res.status(403).send({
                message: 'Todo data is missing'
            })
        }

        const { id } = req.params
        const result = await Todo.findByIdAndUpdate(id, req.body.todo)

        if (!result) {
            return res.status(404).send({
                message: 'Todo not found'
            })
        }

        return res.send({ message: "Todo updated succefully" })

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
})

// delete todo
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const result = await Todo.findByIdAndDelete(id)

        if (!result) {
            return res.status(404).send({
                message: 'Todo not found'
            })
        }

        return res.send({ message: "Todo deleted succefully" })

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
})

export default router;