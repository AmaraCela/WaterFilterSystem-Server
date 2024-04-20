const express = require("express");
const router = express.Router();

import { getMeetings, addMeeting } from "../controllers/MeetingController";

router.get("/", getMeetings);
router.post("/", addMeeting);
module.exports = router;