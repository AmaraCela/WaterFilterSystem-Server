// const express = require("express");
// const router = express.Router();

// import { getMeetings, addMeeting, deleteMeeting } from "../controllers/MeetingController";

// router.get("/", getMeetings);
// router.post("/", addMeeting);
// router.delete("/", deleteMeeting);
// module.exports = router;

const express = require('express');
const router = express.Router();

import { getAllMeetings, getMeetingById, addMeeting, updateMeeting, deleteMeeting, idValidator, meetingValidator } from '../controllers/MeetingController';
import { handleInputValidationErrors } from "../controllers/utils/ErrorHandler";

router.get("/", getAllMeetings);
router.post("/", meetingValidator, handleInputValidationErrors, addMeeting);
router.get("/:id", idValidator, handleInputValidationErrors, getMeetingById);
router.put("/:id", idValidator, meetingValidator, handleInputValidationErrors, updateMeeting);
router.delete("/:id", idValidator, handleInputValidationErrors, deleteMeeting);

module.exports = router;