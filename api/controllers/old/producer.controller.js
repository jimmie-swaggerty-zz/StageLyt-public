const Producer = require("../../models/producer.model.js");

// Create and Save a new Producer{
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    // Create a Producer
    const producer = new Producer({
        email: req.body.email,
        name: req.body.name,
        active: req.body.active,
        follow: {}
    });

    // Save Producer in the database
    Producer.create(producer, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while creating the Producer.",
            });
        else res.send(data);
    });
};

// Retrieve all Producers from the database.
exports.findAll = (req, res) => {
    Producer.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving producers.",
            });
        else res.send(data);
    });
};

// Find a single Producer with a producerId
exports.findOne = (req, res) => {
    Producer.findById(req.params.producerId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Producer with id ${req.params.producerId}.`,
                });
            } else {
                res.status(500).send({
                    message:
                        "Error retrieving Producer with id " + req.params.producerId,
                });
            }
        } else res.send(data);
    });
};

// Update a Producer identified by the producerId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    Producer.updateById(req.params.producerId, new Producer(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Producer with id ${req.params.producerId}.`,
                });
            } else {
                res.status(500).send({
                    message: "Error updating Producer with id " + req.params.producerId,
                });
            }
        } else res.send(data);
    });
};

// Delete a Producer with the specified producerId in the request
exports.delete = (req, res) => {
    Producer.remove(req.params.producerId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Producer with id ${req.params.producerId}.`,
                });
            } else {
                res.status(500).send({
                    message:
                        "Could not delete Producer with id " + req.params.producerId,
                });
            }
        } else res.send({ message: `Producer was deleted successfully!` });
    });
};

// Delete all Producers from the database.
exports.deleteAll = (req, res) => {
    Producer.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while removing all producers.",
            });
        else res.send({ message: `All Producers were deleted successfully!` });
    });
};
