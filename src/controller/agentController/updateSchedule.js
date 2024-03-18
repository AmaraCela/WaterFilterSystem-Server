"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSchedule = void 0;
function updateSchedule(req, res) {
    const { agentId, scheduleId, from, to } = req.body;
    try {
        // const response = Schedule.update();
        res.status(200).json({ successfulMessage: 'Schedule updated successfully' });
    }
    catch (error) {
        res.status(500).json({ errorMessage: error });
    }
}
exports.updateSchedule = updateSchedule;
