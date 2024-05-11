const express = require("express");
const app = express();
const cors = require("cors");

const cookieparser = require("cookie-parser");
app.use(express.json());
app.use(cookieparser());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    credentials: true,
    optionSuccessStatus: 200,
  })
);

const userRouter = require("./routes/userRouter");
const orderRouter = require("./routes/orderRouter");
app.use("/user", userRouter);
app.use("/order", orderRouter);

var PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`server is running on ${PORT} ...`);
});
