const express = require("express");
const router = express.Router();

import { getMeetings } from "../controllers/MeetingController";

router.get("/", getMeetings);
module.exports = router;