const express = require('express');
const router = express.Router();

import { createSession, loginValidator } from "../controllers/SessionController";
import { validateRequest } from "../utils/ErrorHandler";

router.post("/", loginValidator, validateRequest, createSession);

module.exports = router;