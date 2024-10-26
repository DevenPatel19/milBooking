import express,  {Request, Response} from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from 'mongoose';
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	cors({
		origin: process.env.FRONTEND_URL,
    	credentials: true,
		methods: ["GET", "POST", "PUT","PATCH","DELETE"]
	})
);



app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)


// Starts the Server
app.listen(7000, () => {
	console.log("server running on localhost:7000");
});