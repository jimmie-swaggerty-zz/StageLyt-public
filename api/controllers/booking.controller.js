const Booking = require("../models/booking.model.js");

// Create and Save a new Booking{
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    }
    console.log(req.body)
    // Create a Booking
    const booking = new Booking({
        artist_id: req.body.data.page_id,
        event_id: req.body.event_id,
        type: req.body.data.type,
        role: req.body.data.role,
        producer_id: req.body.producer_id,
        artist_status: req.body.artist_status,
        producer_status: req.body.producer_status,
        pay: req.body.data.pay,
        payDetails: req.body.data.payDetails,
        acts: req.body.data.acts
    });

    // Save Booking in the database
    Booking.create((booking), (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while creating the Booking.",
            });
        else res.send(data);
    });
};

// Retrieve all Bookings from the database.
exports.findAll = (req, res) => {
    Booking.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving bookings.",
            });
        else res.send(data);
    });
};

// Retrieve all Bookings from the database by page
exports.findPageAll = (req, res) => {
    Booking.getPageAll(req.params.page_id,(err, data) => {
        if (err){
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving bookings.",
            });
        }
        else res.send(data);
    });
};

//by show
exports.byEvent = (req, res) => {
    Booking.findByEvent(req.params.eventId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Bookings for show ${req.params.eventId}.`,
                });
            } else {
                res.status(500).send({
                    message:
                        "Error retrieving Booking for show " + req.params.eventId,
                });
            }
        } else res.send(data);
    });
};

// Find a single Booking with a bookingId
exports.findOneEvent = (req, res) => {
    Booking.findByEventId(req.params.event_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Booking with id ${req.params.event_id}.`,
                });
            } else {
                res.status(500).send({
                    message:
                        "Error retrieving Booking with id " + req.params.event_id,
                });
            }
        } else res.send(data);
    });
};

// Find a single Booking with a bookingId
exports.findOne = (req, res) => {
    Booking.findById(req.params.bookingId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Booking with id ${req.params.bookingId}.`,
                });
            } else {
                res.status(500).send({
                    message:
                        "Error retrieving Booking with id " + req.params.bookingId,
                });
            }
        } else res.send(data);
    });
};

// Update a Booking identified by the bookingId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    Booking.updateById(req.params.bookingId, new Booking(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Booking with id ${req.params.bookingId}.`,
                });
            } else {
                res.status(500).send({
                    message: "Error updating Booking with id " + req.params.bookingId,
                });
            }
        } else res.send(data);
    });
};

// accept booking
exports.accept = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    Booking.accept(req.params.bookingId, req.body.status, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Booking with id ${req.params.bookingId}.`,
                });
            } else {
                res.status(500).send({
                    message: "Error updating Booking with id " + req.params.bookingId,
                });
            }
        } else res.send(data);
    });
};

// send booking
exports.send = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    Booking.send(req.params.bookingId, req.body.status, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Booking with id ${req.params.bookingId}.`,
                });
            } else {
                res.status(500).send({
                    message: "Error updating Booking with id " + req.params.bookingId,
                });
            }
        } else res.send(data);
    });
};

// Delete a Booking with the specified bookingId in the request
exports.delete = (req, res) => {
    Booking.remove(req.params.bookingId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Booking with id ${req.params.bookingId}.`,
                });
            } else {
                res.status(500).send({
                    message:
                        "Could not delete Booking with id " + req.params.bookingId,
                });
            }
        } else res.send({ message: `Booking was deleted successfully!` });
    });
};

// Delete all Bookings from the database.
exports.deleteAll = (req, res) => {
    Booking.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while removing all bookings.",
            });
        else res.send({ message: `All Bookings were deleted successfully!` });
    });
};
