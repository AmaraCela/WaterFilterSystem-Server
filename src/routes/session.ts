const express = require('express');
const router = express.Router();

import { createSession, deleteSession, loginValidator } from "../controllers/SessionController";
import { handleInputValidationErrors } from "../controllers/utils/ErrorHandler";

router.post("/", loginValidator, handleInputValidationErrors, createSession);
router.post("/logout", loginValidator, handleInputValidationErrors, deleteSession);

module.exports = router;