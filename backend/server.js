import express from "express";
import dotenv from "dotenv";
// import products from "./data/products.js";
import connectDB from "./config/setup.js";
import colors from "colors";
import productRoutes from "../backend/routs/productRoutes.js";
import userRoutes from "../backend/routs/userRoutes.js";
import { errorHandler, notFound } from "./middleWare/errorMiddleWare.js";

const app = express();

app.use(express.json());

// app.use(notFound);
app.use(errorHandler);

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => {
  res.send(
    `Server is running in ${process.env.NODE_ENV} mode at port ${PORT} ...`
  );
});

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  // console.log(
  //   `Server is running in ${process.env.NODE_ENV} mode at port ${PORT} ...`
  // );
  console.log(
    colors.america(
      `Server is running in ${process.env.NODE_ENV} mode at port ${PORT} ...`
    )
  );
});
