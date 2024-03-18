"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addReference = void 0;
function addReference(req, res) {
    const { meetingId, phoneNumber, profession, qualified, name, surname } = req.body;
    try {
        // const response = Reference.add();
        res.status(201).json({ successfulMessage: 'Reference added successfully' });
    }
    catch (error) {
        res.status(500).json({ errorMessage: error });
    }
}
exports.addReference = addReference;
