const express = require('express');
const router = express.Router();

import { createSession } from "../controllers/SessionController";

router.post("/", createSession);

module.exports = router;