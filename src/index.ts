require('dotenv').config({path:__dirname+'/.env'})

const express = require('express');
const app = express();
const db = require("./sequelize/models");
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded());

if (process.env.NODE_ENV === 'development') {
    const cors = require('cors');
    app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
}

const userRouter = require('./routes/users');
app.use('/api/users', userRouter);

const sessionRouter = require('./routes/session');
app.use('/api/session', sessionRouter);

const clientRouter = require("./routes/clients");
app.use('/api/clients', clientRouter);

const callRouter = require("./routes/calls");
app.use('/api/calls', callRouter);

const saleRouter = require("./routes/sales");
app.use('/api/sales', saleRouter);

const meetingRouter = require("./routes/meetings");
app.use('/api/meetings', meetingRouter);

const commissionRouter = require("./routes/commissions");
app.use('/api/commissions', commissionRouter);

const taskRouter = require("./routes/tasks");
app.use('/api/tasks', taskRouter);


db.sequelize.authenticate().then(() => {
    console.log("Database connected");
}).then(() => {
    // db.sequelize.sync();
}).catch((err: any) => {
    console.log("Error: " + err);
})

app.listen(5000, () => {
    console.log(`Server is running on port 5000`);
})