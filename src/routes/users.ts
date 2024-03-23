const express = require('express');
const router = express.Router();

import { getAllUsers, getUserById, deleteUser } from "../controllers/UserController";
import { getAllPhoneOperators, addPhoneOperator, updatePhoneOperator } from "../controllers/PhoneOperatorController";

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.delete("/:id", deleteUser);
// router.put("/:id", updatePhoneOperator);

router.get("/phoneoperators", getAllPhoneOperators);
// router.get("/phoneoperators/:id", getPhoneOperatorById);
router.post("/phoneoperators", addPhoneOperator);
router.put("/phoneoperators/:id", updatePhoneOperator);

// router.get("/chiefs", getAllChiefs);
// router.get("/chiefs/:id", getChiefById);
// router.post("/chiefs", addChief);
// router.put("/chiefs/:id", updateChief);

// router.get("/salesagents", getAllSalesAgents);
// router.get("/salesagents/:id", getSalesAgentById);
// router.post("/salesagents", addSalesAgent);
// router.put("/salesagents/:id", updateSalesAgent);

// router.get("/installers", getAllInstallers);
// router.get("/installers/:id", getInstallerById);
// router.post("/installers", addInstaller);
// router.put("/installers/:id", updateInstaller);

// router.get("/inventorymanager", getAllInventoryManagers);
// router.get("/inventorymanager/:id", getInventoryManagerById);
// router.post("/inventorymanager", addInventoryManager);
// router.put("/inventorymanager/:id", updateInventoryManager);

module.exports = router;
