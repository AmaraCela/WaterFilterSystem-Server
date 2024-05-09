const express = require("express");
const router = express.Router();

import { addClient, clientValidator, deleteClient, getAllClients, getClientById, idValidator, updateClient, removeFromRedlist } from "../controllers/ClientController";
import { handleInputValidationErrors } from "../controllers/utils/ErrorHandler";

router.get("/", getAllClients);
router.post("/", clientValidator, handleInputValidationErrors, addClient);
router.get("/:id", idValidator, handleInputValidationErrors, getClientById);
router.put("/:id", idValidator, clientValidator, handleInputValidationErrors, updateClient);
router.delete("/:id", idValidator, handleInputValidationErrors, deleteClient);

router.post("/:id/redlistremoval", idValidator, handleInputValidationErrors, removeFromRedlist);

module.exports = router;