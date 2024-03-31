const express = require("express");
import { getAllSchedules } from "../controllers/ScheduleController";
const router = express.Router();

router.get("/schedules", getAllSchedules);
router.post("/schedule", )

module.exports = router;