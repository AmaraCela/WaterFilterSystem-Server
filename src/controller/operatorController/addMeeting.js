"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMeeting = void 0;
function addMeeting(req, res) {
    const { operator_id, agent_id, client_id, time, date } = req.body;
    try {
        // const response = Meeting.add();
        res.status(204).json({ successfulMessage: 'Meeting added successfully' });
    }
    catch (error) {
        res.status(500).json({ errorMessage: error });
    }
}
exports.addMeeting = addMeeting;
