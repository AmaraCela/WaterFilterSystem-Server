const express = require('express');
const router = express.Router();

import { createSession, loginValidator } from "../controllers/SessionController";
import { handleInputValidationErrors } from "../controllers/utils/ErrorHandler";

router.post("/", loginValidator, handleInputValidationErrors, createSession);

module.exports = router;