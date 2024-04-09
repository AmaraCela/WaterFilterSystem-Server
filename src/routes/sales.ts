const express = require("express");
const router = express.Router();

import { addSale, saleValidator, deleteSale, getAllSales, getSaleById, idValidator, updateSale, approveSale } from "../controllers/SaleController";
import { handleInputValidationErrors } from "../controllers/utils/ErrorHandler";

router.get("/", getAllSales);
router.post("/", saleValidator, handleInputValidationErrors, addSale);
router.get("/:id", idValidator, handleInputValidationErrors, getSaleById);
router.put("/:id", idValidator, saleValidator, handleInputValidationErrors, updateSale);
router.delete("/:id", idValidator, handleInputValidationErrors, deleteSale);
router.post("/:id/approval", idValidator, handleInputValidationErrors, approveSale);

module.exports = router;