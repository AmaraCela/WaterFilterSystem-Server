const express = require("express");
const router = express.Router();

import { addDebt, debtValidator, deleteDebt, getAllDebts, getDebtById, updateDebt } from "../controllers/DebtController";
import { addSale, saleValidator, deleteSale, getAllSales, getSaleById, idValidator, updateSale, approveSale, rejectSale } from "../controllers/SaleController";
import { handleInputValidationErrors } from "../controllers/utils/ErrorHandler";

router.get("/", getAllSales);
router.post("/", saleValidator, handleInputValidationErrors, addSale);

router.get("/debts", getAllDebts);
router.post("/:id/debt", debtValidator, handleInputValidationErrors, addDebt);
router.get("/:id/debt", idValidator, handleInputValidationErrors, getDebtById);
router.put("/:id/debt", idValidator, handleInputValidationErrors, updateDebt);
router.delete("/:id/debt", idValidator, handleInputValidationErrors, deleteDebt);

router.get("/:id", idValidator, handleInputValidationErrors, getSaleById);
router.put("/:id", idValidator, saleValidator, handleInputValidationErrors, updateSale);
router.delete("/:id", idValidator, handleInputValidationErrors, deleteSale);
router.post("/:id/approval", idValidator, handleInputValidationErrors, approveSale);
router.post("/:id/rejection", idValidator, handleInputValidationErrors, rejectSale);

module.exports = router;