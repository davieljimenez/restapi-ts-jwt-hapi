import express, {Application} from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.route"

const app:Application = express();

// Settings
app.set("port", 16000);


// Middlewares
app.use(morgan("dev"))
app.use(express.json())
// Routes
app.use("/apiv1/auth", authRoutes);

export default app;