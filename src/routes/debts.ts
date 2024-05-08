const express = require('express');
const router = express.Router();

import { getAllDebts, getDebtById, addDebt, updateDebt, deleteDebt, idValidator, debtValidator } from '../controllers/DebtController';
import { handleInputValidationErrors } from "../controllers/utils/ErrorHandler";

router.get("/", getAllDebts);
router.post("/", debtValidator, handleInputValidationErrors, addDebt);
router.get("/:id", idValidator, handleInputValidationErrors, getDebtById);
router.put("/:id", idValidator, debtValidator, handleInputValidationErrors, updateDebt);
router.delete("/:id", idValidator, handleInputValidationErrors, deleteDebt);

module.exports = router;