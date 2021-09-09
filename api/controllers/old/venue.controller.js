const Venue = require("../models/venue.model.js");

// Create and Save a new Venue{
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    // Create a Venue
    const venue = new Venue({
        email: req.body.email,
        name: req.body.name,
        active: req.body.active,
        follow: {}
    });

    // Save Venue in the database
    Venue.create(venue, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while creating the Venue.",
            });
        else res.send(data);
    });
};

// Retrieve all Venues from the database.
exports.findAll = (req, res) => {
    Venue.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving venues.",
            });
        else res.send(data);
    });
};

// Find a single Venue with a venueId
exports.findOne = (req, res) => {
    Venue.findById(req.params.venueId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Venue with id ${req.params.venueId}.`,
                });
            } else {
                res.status(500).send({
                    message:
                        "Error retrieving Venue with id " + req.params.venueId,
                });
            }
        } else res.send(data);
    });
};

// Update a Venue identified by the venueId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    Venue.updateById(req.params.venueId, new Venue(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Venue with id ${req.params.venueId}.`,
                });
            } else {
                res.status(500).send({
                    message: "Error updating Venue with id " + req.params.venueId,
                });
            }
        } else res.send(data);
    });
};

// Delete a Venue with the specified venueId in the request
exports.delete = (req, res) => {
    Venue.remove(req.params.venueId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Venue with id ${req.params.venueId}.`,
                });
            } else {
                res.status(500).send({
                    message:
                        "Could not delete Venue with id " + req.params.venueId,
                });
            }
        } else res.send({ message: `Venue was deleted successfully!` });
    });
};

// Delete all Venues from the database.
exports.deleteAll = (req, res) => {
    Venue.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while removing all venues.",
            });
        else res.send({ message: `All Venues were deleted successfully!` });
    });
};
