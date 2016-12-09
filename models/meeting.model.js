var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var meetingSchema = Schema({
    displayId: { type: String, required: true },
    name     : { type: String, default: null, required: true },
    members  : { type: [Schema.Types.Mixed] }
});

var Meeting = mongoose.model('Meeting', meetingSchema);

module.exports = Meeting;