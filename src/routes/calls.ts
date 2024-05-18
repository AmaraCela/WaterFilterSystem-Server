const express = require('express');
const router = express.Router();

import { getAllCalls, addCall, updateCall, deleteCall, callValidator, idValidator, getCallById, filterAllowedCallsForPhoneOperator } from "../controllers/CallController";
import { handleInputValidationErrors } from "../controllers/utils/ErrorHandler";
import { requirePhoneOperator } from "../controllers/utils/UserAuthenticator";
// import { filterCallsForPhoneOperator } from "../controllers/utils/UserAuthenticator";

router.get("/", getAllCalls);
router.post("/", callValidator, handleInputValidationErrors, addCall);
router.get("/:id", idValidator, handleInputValidationErrors, requirePhoneOperator, filterAllowedCallsForPhoneOperator, getCallById);
router.put("/:id", idValidator, callValidator, handleInputValidationErrors, updateCall);
router.delete("/:id", idValidator, handleInputValidationErrors, deleteCall);

module.exports = router;
