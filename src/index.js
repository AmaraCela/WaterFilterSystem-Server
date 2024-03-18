"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_js_1 = __importDefault(require("./sequelize/models/index.js"));
const port = 5000;
const app = (0, express_1.default)();
app.listen(port, () => {
    console.log('Server is listening on port', port);
});
app.get('/', (req, res) => res.send('Heyy'));
index_js_1.default.sequelize.authenticate().then(() => {
    console.log("Database connected");
}).then(() => {
    index_js_1.default.sequelize.sync();
}).catch((err) => {
    console.log("Error: " + err);
});
