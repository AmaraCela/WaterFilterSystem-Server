const express = require('express');
const router = express.Router();

import { getAllUsers, getUserById, deleteUser, idValidator, userValidator } from "../controllers/UserController";
import { getAllPhoneOperators, addPhoneOperator, updatePhoneOperator } from "../controllers/PhoneOperatorController";
import { validateRequest } from "../utils/ErrorHandler";

router.get("/phoneoperators", getAllPhoneOperators);
router.post("/phoneoperators", userValidator, validateRequest, addPhoneOperator);
router.put("/phoneoperators/:id", idValidator, userValidator, validateRequest, updatePhoneOperator);

router.get("/", getAllUsers);
router.get("/:id", idValidator, validateRequest, getUserById);
router.delete("/:id", idValidator, validateRequest, deleteUser);

// router.get("/chiefs", getAllChiefs);
// router.post("/chiefs", addChief);
// router.put("/chiefs/:id", updateChief);

// router.get("/salesagents", getAllSalesAgents);
// router.post("/salesagents", addSalesAgent);
// router.put("/salesagents/:id", updateSalesAgent);

// router.get("/installers", getAllInstallers);
// router.post("/installers", addInstaller);
// router.put("/installers/:id", updateInstaller);

// router.get("/inventorymanager", getAllInventoryManagers);
// router.post("/inventorymanager", addInventoryManager);
// router.put("/inventorymanager/:id", updateInventoryManager);

module.exports = router;
