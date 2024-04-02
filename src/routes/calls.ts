const express = require('express');
const router = express.Router();

import { getAllCalls, addCall, updateCall, deleteCall, callValidator, idValidator, getCallById } from "../controllers/CallController";
import { handleInputValidationErrors } from "../controllers/utils/ErrorHandler";

router.get("/", getAllCalls);
router.post("/", callValidator, handleInputValidationErrors, addCall);
router.get("/:id", idValidator, handleInputValidationErrors, getCallById);
router.put("/:id", idValidator, callValidator, handleInputValidationErrors, updateCall);
router.delete("/:id", idValidator, handleInputValidationErrors, deleteCall);

module.exports = router;
