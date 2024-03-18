const express = require('express');
const app = express();

const db = require("./sequelize/models");

// require("./repos");
// require("./models");

import { UserRepository } from "./repos/UserRepository";
import { PhoneOperator } from "./models/PhoneOperator";

db.sequelize.authenticate().then(() => {
    console.log("Database connected");
    //db.sequelize.drop(); // drop all tables
}).then(() => {
    db.sequelize.sync(true);
}).then(() => {
    const userRepository = new UserRepository(db);
    const operator = new PhoneOperator("John", "Doe", "john.doe@example.com", "password"); 
    userRepository.save(operator);
}).catch((err: any) => {
    console.log("Error: " + err);
})

app.listen(5000, () => {
    console.log(`Server is running on port 5000`);
})