const Event = require("../models/event.model.js");

// Create and Save a new Event{
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    // Create a Event
    const event = new Event({
        name : req.body.name,
        description : req.body.description,
        website : req.body.website,
        facebook : req.body.facebook,
        start : req.body.start,
        end : req.body.end,
        live : req.body.live,
        artist_id : req.body.artist_id,
        venue_id : req.body.venue_id,
        techInfo : req.body.techInfo,
        payInfo : req.body.payInfo,
        techSend : req.body.techSend,
        callTime : req.body.callTime,
        techSend : req.body.techSend
    });

    // Save Event in the database
    Event.create(event, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while creating the Event.",
            });
        else res.send(data);
    });
};

// Retrieve all Events from the database.
exports.findAll = (req, res) => {
    Event.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving events.",
            });
        else 
        res.send(data);
    });
};

// Retrieve all Events from the database.
exports.findMine = (req, res) => {
    Event.getMine(req.params.id,(err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving events.",
            });
        else res.send(data);
    });
};

// Find a single Event with a eventId
exports.findOne = (req, res) => {
    Event.findById(req.params.eventId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Event with id ${req.params.eventId}.`,
                });
            } else {
                res.status(500).send({
                    message:
                        "Error retrieving Event with id " + req.params.eventId,
                });
            }
        } else res.send(data);
    });
};


// Find a single Event with a venueid
exports.findByVenue = (req, res) => {
    Event.findByVenueId(req.params.venue_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Event with id ${req.params.venue_id}.`,
                });
            } else {
                res.status(500).send({
                    message:
                        "Error retrieving Event with id " + req.params.venue_id,
                });
            }
        } else res.send(data);
    });
};

// Find events by city
exports.byCity = (req, res) => {
    Event.byCity(req.params.cityId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Events for city with id ${req.params.cityId}.`,
                });
            } else {
                res.status(500).send({
                    message:
                        "Error retrieving Events for city with id " + req.params.cityId,
                });
            }
        } else res.send(data);
    });
};

// Update a Event identified by the eventId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    Event.updateById(req.params.eventId, req.body, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Event with id ${req.params.eventId}.`,
                });
            } else {
                res.status(500).send({
                    message: "Error updating Event with id " + req.params.eventId,
                });
            }
        } else res.send(data);
    });
};

// Delete a Event with the specified eventId in the request
exports.delete = (req, res) => {
    Event.remove(req.params.eventId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Event with id ${req.params.eventId}.`,
                });
            } else {
                res.status(500).send({
                    message:
                        "Could not delete Event with id " + req.params.eventId,
                });
            }
        } else res.send({ message: `Event was deleted successfully!` });
    });
};

// Delete all Events from the database.
exports.deleteAll = (req, res) => {
    Event.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while removing all events.",
            });
        else res.send({ message: `All Events were deleted successfully!` });
    });
};
