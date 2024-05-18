const express = require('express');
const router = express.Router();

import { getAllUsers, getUserById, deleteUser, idValidator, userValidator } from "../controllers/UserController";
import { getAllPhoneOperators, addPhoneOperator, updatePhoneOperator, getPhoneOperatorById } from "../controllers/PhoneOperatorController";
import { getAllMarketingManagers, addMarketingManager, updateMarketingManager, getMarketingManagerById } from "../controllers/MarketingManagerController";
import { getAllChiefOfOperations, addChiefOfOperations, updateChiefOfOperations, getChiefOfOperationsById } from "../controllers/ChiefOfOperationsController";
import { getAllSalesAgents, addSalesAgent, updateSalesAgent, getSalesAgentById } from "../controllers/SalesAgentController";
import { addScheduleToAgent, deleteSchedule, getAllSchedules, getSchedulesOfAgent, updateSchedule, scheduleIdValidator } from "../controllers/ScheduleController";

import { handleInputValidationErrors } from "../controllers/utils/ErrorHandler";
import { requireAdmin, requireMarketingManager, requirePhoneOperator, requireSelf } from "../controllers/utils/UserAuthenticator";

router.get("/phoneoperators", requireAdmin, getAllPhoneOperators);
router.post("/phoneoperators", requireAdmin, userValidator, handleInputValidationErrors, addPhoneOperator);
router.get("/phoneoperators/:id", idValidator, requireSelf, handleInputValidationErrors, getPhoneOperatorById);
router.put("/phoneoperators/:id", idValidator, userValidator, requireAdmin, handleInputValidationErrors, updatePhoneOperator);

router.get("/marketingmanagers", requireAdmin, getAllMarketingManagers);
router.post("/marketingmanagers", requireAdmin, userValidator, handleInputValidationErrors, addMarketingManager);
router.get("/marketingmanagers/:id", idValidator, requireSelf, handleInputValidationErrors, getMarketingManagerById);
router.put("/marketingmanagers/:id", idValidator, userValidator, requireAdmin, handleInputValidationErrors, updateMarketingManager);

router.get("/chiefofoperations", requireAdmin, getAllChiefOfOperations);
router.post("/chiefofoperations", requireAdmin, userValidator, handleInputValidationErrors, addChiefOfOperations);
router.get("/chiefofoperations/:id", idValidator, requireSelf, handleInputValidationErrors, getChiefOfOperationsById);
router.put("/chiefofoperations/:id", idValidator, userValidator, requireAdmin, handleInputValidationErrors, updateChiefOfOperations);

router.get("/salesagents/schedules", requirePhoneOperator, getAllSchedules);
router.get("/salesagents/:id/schedules", idValidator, requirePhoneOperator, handleInputValidationErrors, getSchedulesOfAgent);
router.post("/salesagents/:id/schedules", idValidator, requireSelf, handleInputValidationErrors, addScheduleToAgent);
router.put("/salesagents/:id/schedules/:scheduleId", idValidator, requireMarketingManager, scheduleIdValidator, handleInputValidationErrors, updateSchedule);
router.delete("/salesagents/:id/schedules/:scheduleId", idValidator, scheduleIdValidator, requireMarketingManager, handleInputValidationErrors, deleteSchedule);

router.get("/salesagents", requireAdmin, getAllSalesAgents);
router.post("/salesagents", userValidator, requireAdmin, handleInputValidationErrors, addSalesAgent);
router.get("/salesagents/:id", idValidator, requireSelf, handleInputValidationErrors, getSalesAgentById);
router.put("/salesagents/:id", idValidator, userValidator, requireAdmin, handleInputValidationErrors, updateSalesAgent);

router.get("/", requireAdmin, getAllUsers);
router.get("/:id", idValidator, requireSelf, handleInputValidationErrors, getUserById);
router.delete("/:id", idValidator, requireAdmin, handleInputValidationErrors, deleteUser);

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
