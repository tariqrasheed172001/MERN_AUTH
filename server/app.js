import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mainRouter from "./routes/user.js"
import connectDB from "./db/connect.js";


dotenv.config();

const app = express();


app.use(express.json());

app.use(cors())
app.use("/api/v1", mainRouter);

const port = process.env.PORT || 8000;

const start = async () => {

    try {        
        await connectDB(process.env.DATABASE_URL);
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        })

    } catch (error) {
       console.log(error); 
    }
}

start();

