var models = require('../models/index');

var exports = {
    createMeeting : createMeeting,
    submitSchedule: submitSchedule,
    getMeetingJson: getMeetingJson
};

function createMeeting(req, res) {
    console.log("Creating meeting:", req.body["meetingName"]);

    models.Meeting.create({
        name     : req.body["meetingName"],
        displayId: randomId()
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

    for (var i = 0; i < 5; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

function submitSchedule(req, res) {
    console.log("Submitting schedule for meeting: " + req.body["meetingId"]);
    console.log("body", req.body);

    var member = {
        name: req.body.name,
        days: [
            {
                date : req.body["day0"],
                hours: []
            },
            {
                date : req.body["day2"],
                hours: []
            },
            {
                date : req.body["day2"],
                hours: []
            }
        ]
    };

    for (var key in req.body) {
        if (!isNaN(key)) {
            if (req.body[key][0]) {
                member.days[0].hours.push(key)
            }
            if (req.body[key][1]) {
                member.days[1].hours.push(key)
            }
            if (req.body[key][2]) {
                member.days[2].hours.push(key)
            }
        }
    }

    models.Meeting.findOne({ displayId: req.body["meetingId"] })
        .then(function (meeting) {
            if (!meeting) {
                throw new Error('No meeting found with meetingId ' + req.body['meetingId']);
            }
            meeting.members.push(member);
            return meeting.save();
        })
        .then(function () {
            res.redirect('/results?meetingId=' + req.body['meetingId']);
        })
        .catch(function (err) {
            console.error("Error submitting schedule:", err);
            res.redirect('/');
        });
}

function getMeetingJson(req, res) {
    console.log("Fetching meeting json for meeting:", req.query["meetingId"]);
    models.Meeting.findOne({ displayId: req.query["meetingId"] }).lean()
        .then(function (meeting) {
            console.log("Returning meeting:", meeting);
            if (meeting) {
                res.json(meeting)
            } else {
                res.json(null);
            }
        });
}

module.exports = exports;