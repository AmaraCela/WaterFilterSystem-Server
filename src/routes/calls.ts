import { addCall, getCalls } from "../controllers/CallController";

const express = require("express");
const router = express.Router();

router.get("/calls", getCalls);
router.post("/calls", addCall);

module.exports = router;