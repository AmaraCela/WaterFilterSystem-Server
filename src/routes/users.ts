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
router.get("/phoneoperators/:id", idValidator, handleInputValidationErrors, requireSelf, getPhoneOperatorById);
router.put("/phoneoperators/:id", idValidator, userValidator, requireAdmin, handleInputValidationErrors, updatePhoneOperator);

router.get("/marketingmanagers", requireAdmin, getAllMarketingManagers);
router.post("/marketingmanagers", requireAdmin, userValidator, handleInputValidationErrors, addMarketingManager);
router.get("/marketingmanagers/:id", idValidator, handleInputValidationErrors, requireSelf, getMarketingManagerById);
router.put("/marketingmanagers/:id", requireAdmin, idValidator, userValidator, handleInputValidationErrors, updateMarketingManager);

router.get("/chiefofoperations", requireAdmin, getAllChiefOfOperations);
router.post("/chiefofoperations", requireAdmin, userValidator, handleInputValidationErrors, addChiefOfOperations);
router.get("/chiefofoperations/:id", idValidator, requireSelf, handleInputValidationErrors, getChiefOfOperationsById);
router.put("/chiefofoperations/:id", requireAdmin, idValidator, userValidator, handleInputValidationErrors, updateChiefOfOperations);

router.get("/salesagents/schedules", requirePhoneOperator, getAllSchedules);
router.get("/salesagents/:id/schedules", idValidator, handleInputValidationErrors, getSchedulesOfAgent);
router.post("/salesagents/:id/schedules", idValidator, handleInputValidationErrors, requireSelf, addScheduleToAgent);
router.put("/salesagents/:id/schedules/:scheduleId", requireMarketingManager, idValidator, scheduleIdValidator, handleInputValidationErrors, updateSchedule);
router.delete("/salesagents/:id/schedules/:scheduleId", requireMarketingManager, idValidator, scheduleIdValidator, handleInputValidationErrors, deleteSchedule);

router.get("/salesagents", requireAdmin, getAllSalesAgents);
router.post("/salesagents", requireAdmin, userValidator, handleInputValidationErrors, addSalesAgent);
router.get("/salesagents/:id", idValidator, handleInputValidationErrors, requireSelf, getSalesAgentById);
router.put("/salesagents/:id", requireAdmin, idValidator, userValidator, handleInputValidationErrors, updateSalesAgent);

router.get("/", requireAdmin, getAllUsers);
router.get("/:id", idValidator, handleInputValidationErrors, requireSelf, getUserById);
router.delete("/:id", requireAdmin, idValidator, handleInputValidationErrors, deleteUser);

// router.get("/installers", getAllInstallers);
// router.post("/installers", addInstaller);
// router.put("/installers/:id", updateInstaller);

// router.get("/inventorymanagers", getAllInventoryManagers);
// router.post("/inventorymanagers", addInventoryManager);
// router.put("/inventorymanagers/:id", updateInventoryManager);

module.exports = router;
