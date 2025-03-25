import express from "express";
import errorHandler from "./middlewares/errorHandler";
const app = express();
import cors from "cors";
app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET','POST','PUT','DELETE' , 'OPTIONS' , 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.urlencoded({ extended: true }));
import userRouter from "./routes/user.routes";
import requestRouter from "./routes/requests.routes";
import dashboardRouter from "./routes/dashboard.routes";
app.get('/', (req, res) => {
    res.json({
        message:'API is working'
    });
});
app.use('/api/v1/users', userRouter);
app.use('/api/v1/requests', requestRouter);
app.use('/api/v1/dashboard', dashboardRouter);
app.use(errorHandler);
app.use((req, res) => {
    res.status(404).json({
        message: 'Resource not found'
    });
})
export default app;