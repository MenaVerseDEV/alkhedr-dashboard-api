import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({
    path: ".env"
});
import app from ".";
mongoose.connect(process.env.DB_URI?.replace('<db_password>' , process.env.DB_PASS ?? '') ?? '').then(async()=>{
    console.log("Database Is Connected ✅");
}).catch(err => {
    console.error("Failed to connect to database", err);
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running on port 3000");
});