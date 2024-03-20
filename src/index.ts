const express = require('express');
const app = express();
const db = require("./sequelize/models");

import { addOperator } from "./controller/addOperator";
import { addSchedule } from "./controller/agentController/addSchedule";
app.use(express.json());
app.post('/addOperator', addOperator);
app.post('/addSchedule', addSchedule);

db.sequelize.authenticate().then(() => {
    console.log("Database connected");
    // db.sequelize.drop(); // drop all tables
}).then(() => {
    db.sequelize.sync();
}).then(() => {

}).catch((err: any) => {
    console.log("Error: " + err);
})

app.listen(5000, () => {
    console.log(`Server is running on port 5000`);
})