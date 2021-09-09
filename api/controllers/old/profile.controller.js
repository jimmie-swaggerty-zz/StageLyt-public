const Profile = require("../models/profile.model.js");

// Create and Save a new Profile{
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    }
console.log(req.body)
    // Create a Profile
    const profile = new Profile({
        slug: req.body.slug,
        // user_id: user_id
    });

    // Save Profile in the database
    Profile.create(profile, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while creating the Profile.",
            });
        else res.send(data);
    });
};

// Retrieve all Profiles from the database.
exports.findAll = (req, res) => {
    Profile.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving profiles.",
            });
        else res.send(data);
    });
};

// Retrieve all Profiles from the database.
exports.findAllMine = (req, res) => {
    Profile.getAllMine(req.params.user_id,(err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving profiles.",
            });
        else res.send(data);
    });
};

// Find a single Profile with a profileId
exports.findOne = (req, res) => {
    Profile.findById(req.params.profileId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Profile with id ${req.params.profileId}.`,
                });
            } else {
                res.status(500).send({
                    message:
                        "Error retrieving Profile with id " + req.params.profileId,
                });
            }
        } else res.send(data);
    });
};

// Find a single Profile with a slug
exports.findSlug = (req, res) => {
    // console.log(req.params.slug)
    Profile.findBySlug(req.params.slug, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Profile with id ${req.params.slug}.`,
                });
            } else if (err.status===500) {
                res.status(500).send({
                    message:
                        "Error retrieving Profile with id " + req.params.slug,
                });
            }
        }
        else{
            res.send(data)
        }
    });
};

// Update a Profile identified by the profileId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    Profile.updateById(req.params.profileId, new Profile(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Profile with id ${req.params.profileId}.`,
                });
            } else {
                res.status(500).send({
                    message: "Error updating Profile with id " + req.params.profileId,
                });
            }
        } else res.send(data);
    });
};

// Delete a Profile with the specified profileId in the request
exports.delete = (req, res) => {
    Profile.remove(req.params.profileId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Profile with id ${req.params.profileId}.`,
                });
            } else {
                res.status(500).send({
                    message:
                        "Could not delete Profile with id " + req.params.profileId,
                });
            }
        } else res.send({ message: `Profile was deleted successfully!` });
    });
};

// Delete all Profiles from the database.
exports.deleteAll = (req, res) => {
    Profile.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while removing all profiles.",
            });
        else res.send({ message: `All Profiles were deleted successfully!` });
    });
};
