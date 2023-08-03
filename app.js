import express from 'express';
import "dotenv/config";
import session from "express-session";
import cors from 'cors'
import HelloController from "./controllers/hello-controller.js";
import UserController from "./users/users-controller.js";
import TuitsController from "./controllers/tuits/tuits-controller.js";
import AuthController from "./users/auth-controller.js";

const app = express();
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000",
    // origin: process.env.FRONTEND_URL
}))
const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
  };
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}
app.use(session(sessionOptions));
  
  
app.use(express.json());
TuitsController(app);
HelloController(app);
UserController(app);
AuthController(app);

app.listen(process.env.PORT || 4000);
// app.listen(4000);


// app.get("/add/:num1/:num2", (req, res) => {
//     const num1 = parseInt(req.params.num1);
//     const num2 = parseInt(req.params.num2);
//     const sum = num1 - num2;
//     res.send(sum.toString())
// })
