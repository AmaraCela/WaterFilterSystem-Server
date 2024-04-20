const express = require("express");
const router = express.Router();

import { getMeetings, addMeeting, deleteMeeting } from "../controllers/MeetingController";

router.get("/", getMeetings);
router.post("/", addMeeting);
router.delete("/", deleteMeeting);
module.exports = router;