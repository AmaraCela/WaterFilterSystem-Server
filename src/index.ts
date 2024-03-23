require('dotenv').config({path:__dirname+'/../.env'})

const express = require('express');
const app = express();
const db = require("./sequelize/models");

// import { addOperator } from "./controller/signupController/addOperator";
// import { addSchedule } from "./controller/agentController/addSchedule";
// import { loginUser } from "./controller/loginController";

app.use(express.json());
app.use(express.urlencoded());

const userRouter = require('./routes/users');
app.use('/api/users', userRouter);

// app.post('/addOperator', addOperator);
// app.post('/addSchedule', addSchedule);
// app.post('/login', loginUser);

db.sequelize.authenticate().then(() => {
    console.log("Database connected");
}).then(() => {
    // db.sequelize.sync({force: true});
}).catch((err: any) => {
    console.log("Error: " + err);
})

app.listen(5000, () => {
    console.log(`Server is running on port 5000`);
})