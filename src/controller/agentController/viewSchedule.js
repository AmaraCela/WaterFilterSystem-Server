"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewSchedule = void 0;
function viewSchedule(req, res) {
    const { agentId } = req.body;
    try {
        // const response = Schedule.get(agent_id);
        // res.status(201).json({response});
    }
    catch (error) {
        res.status(500).json({ errorMessage: error });
    }
}
exports.viewSchedule = viewSchedule;
