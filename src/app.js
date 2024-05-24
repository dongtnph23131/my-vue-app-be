const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const authRouter = require("./routers/auth");
const newsRouter = require("./routers/news");
const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.use("/api/v1", authRouter);
app.use("/api/v1", newsRouter);
app.listen(8080, async () => {
  await mongoose.connect(
    "mongodb+srv://donghaha:123456abc@ecommerce.ylijltl.mongodb.net/vue-be?retryWrites=true"
  );
});
