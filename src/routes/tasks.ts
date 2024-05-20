import { getAllTasks } from "../controllers/TaskController";

const express = require('express');
const router = express.Router();

router.get("/", getAllTasks);

module.exports = router;