import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import router from "./routes/route.js";
import ConnectDB from "./database/db.js";

const app = express();
dotenv.config();

const PORT = 8000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/",router);

app.listen(PORT,() => console.log(`Server is started on port ${PORT}`))

const MONGO_URL = process.env.MONGO_URL;

ConnectDB(MONGO_URL);