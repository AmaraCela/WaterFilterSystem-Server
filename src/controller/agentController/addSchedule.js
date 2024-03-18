"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addSchedule = void 0;
function addSchedule(req, res) {
    const { agent_id, from, to } = req.body;
    try {
        // const response = Schedule.add();
        res.status(201).json({ successfulMessage: 'Schedule added successfully' });
    }
    catch (error) {
        res.status(500).json({ errorMessage: error });
    }
}
exports.addSchedule = addSchedule;
