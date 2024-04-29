const express = require("express");
const router = express.Router();

import { addCommission, commissionValidator, deleteCommission, getAllCommissions, getCommissionById, idValidator, updateCommission, approveCommission } from "../controllers/CommissionController";
import { handleInputValidationErrors } from "../controllers/utils/ErrorHandler";

router.get("/", getAllCommissions);
router.post("/", commissionValidator, handleInputValidationErrors, addCommission);

router.get("/:id", idValidator, handleInputValidationErrors, getCommissionById);
router.put("/:id", idValidator, commissionValidator, handleInputValidationErrors, updateCommission);
router.delete("/:id", idValidator, handleInputValidationErrors, deleteCommission);
router.post("/:id/approval", idValidator, handleInputValidationErrors, approveCommission);

module.exports = router;