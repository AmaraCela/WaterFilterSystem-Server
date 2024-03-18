"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMeeting = void 0;
function updateMeeting(req, res) {
    const { meetingId, nextDate = null, purchaseMade = false } = req.body;
    try {
    }
    catch (error) {
        res.status(500).json({ errorMessage: error });
    }
}
exports.updateMeeting = updateMeeting;
