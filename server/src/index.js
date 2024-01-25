import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { PORT, mongoURI } from './config.js'
import todoRoutes from "./routes/todo.js"

const app = express()

// *middlewares
app.use(express.json()); // enables Express to automatically parse JSON data in the request body and make it available in req.body
app.use(cors()); // allows all origins to access the resources

// *API routes
app.get("/", (req, res) => {
    console.log('Request to endpoint: ', req.url);
    return res.send('Hurray! Server connection succefull');
});
app.use("/todo", todoRoutes);

mongoose.connect(mongoURI)
.then(() => {
    console.log('SERVER CONNECTED TO DATABASE')
    app.listen(PORT, () => {
        console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
    });
})
.catch((error) => {
    console.log(error)
})