import express, { Express } from "express";
import db  from "./sequelize/models/index.js";
const port = 5000;

const app: Express = express();

app.listen(port, () => {
    console.log('Server is listening on port', port);
})

app.get('/', (req, res) => res.send('Heyy'))

db.sequelize.authenticate().then(() => {
    console.log("Database connected");
}).then(() => {
    db.sequelize.sync(); 
}).catch((err: any) => {
    console.log("Error: " + err);
})
