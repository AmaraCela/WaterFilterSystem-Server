import { addTask, getAllTasks, taskValidator } from "../controllers/TaskController";

const express = require('express');
const router = express.Router();

router.get("/", getAllTasks);
router.post("/", taskValidator, addTask);

module.exports = router;