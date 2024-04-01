const express = require('express');
const router = express.Router();

import { getAllUsers, getUserById, deleteUser, idValidator, userValidator } from "../controllers/UserController";
import { getAllPhoneOperators, addPhoneOperator, updatePhoneOperator } from "../controllers/PhoneOperatorController";
import { getAllMarketingManagers, addMarketingManager, updateMarketingManager } from "../controllers/MarketingManagerController";
import { handleInputValidationErrors } from "../controllers/utils/ErrorHandler";

router.get("/phoneoperators", getAllPhoneOperators);
router.post("/phoneoperators", userValidator, handleInputValidationErrors, addPhoneOperator);
router.put("/phoneoperators/:id", idValidator, userValidator, handleInputValidationErrors, updatePhoneOperator);

router.get("/marketingmanagers", getAllMarketingManagers);
router.post("/marketingmanagers", userValidator, handleInputValidationErrors, addMarketingManager);
router.put("/marketingmanagers/:id", idValidator, userValidator, handleInputValidationErrors, updateMarketingManager);

// router.get("/salesagents", getAllSalesAgents);
// router.post("/salesagents", userValidator, handleInputValidationErrors, addSalesAgent);
// router.put("/salesagents/:id", idValidator, userValidator, handleInputValidationErrors, updateSalesAgent);

router.get("/", getAllUsers);
router.get("/:id", idValidator, handleInputValidationErrors, getUserById);
router.delete("/:id", idValidator, handleInputValidationErrors, deleteUser);

// router.get("/chiefs", getAllChiefs);
// router.post("/chiefs", addChief);
// router.put("/chiefs/:id", updateChief);


// router.get("/installers", getAllInstallers);
// router.post("/installers", addInstaller);
// router.put("/installers/:id", updateInstaller);

// router.get("/inventorymanagers", getAllInventoryManagers);
// router.post("/inventorymanagers", addInventoryManager);
// router.put("/inventorymanagers/:id", updateInventoryManager);

module.exports = router;
