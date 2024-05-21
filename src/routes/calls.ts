const express = require('express');
const router = express.Router();

import { getAllCalls, addCall, updateCall, deleteCall, callValidator, idValidator, getCallById, filterAllowedCallsForPhoneOperator, getReservedCalls, getLatestReferences } from "../controllers/CallController";
import { handleInputValidationErrors } from "../controllers/utils/ErrorHandler";
import { requireMarketingManager, requirePhoneOperator } from "../controllers/utils/UserAuthenticator";
// import { filterCallsForPhoneOperator } from "../controllers/utils/UserAuthenticator";

router.get("/:id/reserved", getReservedCalls);
router.get("/latest", getLatestReferences);
router.get("/", requireMarketingManager, getAllCalls);
router.post("/", callValidator, handleInputValidationErrors, requireMarketingManager, addCall);
router.get("/:id", idValidator, handleInputValidationErrors, requirePhoneOperator, filterAllowedCallsForPhoneOperator, getCallById);
router.put("/:id", idValidator, callValidator, handleInputValidationErrors, requireMarketingManager, updateCall);
router.delete("/:id", idValidator, handleInputValidationErrors, requireMarketingManager, deleteCall);

module.exports = router;
