import { addClient, getRedListClients } from "../controllers/ClientController";

const express = require("express");
const router = express.Router();

router.get("/clients", getRedListClients);
router.post("/clients", addClient);

module.exports = router;