var mongoose    = require("mongoose");
var mongoConfig = require("config").get("mongo");
var bluebird    = require("bluebird");

//************************************************************************
// MongoDB Promise config (bluebird)
//************************************************************************
mongoose.Promise = bluebird;

//************************************************************************
// MongoDB connection config
//************************************************************************
mongoose.connect('mongodb://' + mongoConfig.get("host") + '/' + mongoConfig.get("database"));
var mongo = mongoose.connection;
mongo.on('error', console.error.bind(console, 'connection error:'));
mongo.once('open', function () {
    console.log("Connected to MongoDB database '" + mongoConfig.get("database") + "' on '" + mongoConfig.get("host") + "'");
});

//************************************************************************
// Mongoose schema config
//************************************************************************
console.log("Initializing database schemas.");

var models = {};

models.Meeting = require('./meeting.model');

module.exports = models;
