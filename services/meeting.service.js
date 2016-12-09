var models = require('../models/index');

var exports = {
    createMeeting: createMeeting,
    submitSchedule: submitSchedule
};

function createMeeting(req, res) {
    console.log("Creating meeting:", req.body["meetingName"]);

    models.Meeting.create({
        name: req.body["meetingName"],
        displayId  : randomId()
    })
        .then(function (meeting) {
            if (meeting) {
                console.log("Meeting created:", meeting);
                res.redirect('/schedule?meetingId=' + meeting.displayId);
            } else {
                res.status(500).send("Unable to create a new meeting at this time. Try again.")
            }
        })
        .catch(function (error) {
            console.error("Error in createMeeting:", error);
            res.status(500).send("Unable to process your request at this time. Try again.")
        });
}

function randomId() {
    var text     = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function submitSchedule(req, res) {
    console.log("Submitting schedule for meeting: " + req.body["meetingId"]);
    console.log("body", req.body);
}

module.exports = exports;