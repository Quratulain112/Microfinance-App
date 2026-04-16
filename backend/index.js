import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import loanRoutes from "./routes/loanRoutes.js";
import adminARoutes from "./routes/adminRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Saylani Microfinance API is running...');
});
app.use("/auth", authRoutes);
app.use("/loans", loanRoutes);
app.use("/admin", adminARoutes);

const PORT = process.env.PORT || 6000
connectDB();

app.listen(PORT, () => {
    console.log("Server is Running On Port", PORT)
})

export default app;