const Artist = require("../models/artist.model.js");

// Create and Save a new Artist{
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    // Create a Artist
    const artist = new Artist({
        name: req.body.name,
        profile_id: req.params.profile_id,
        image_id: req.params.image_id,
    });

    // Save Artist in the database
    Artist.create(artist, (err, data) => {
        console.log("artist", artist)
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while creating the Artist.",
            });
        res.send(data);
    });
};

// Retrieve all Artists from the database.
exports.findAll = (req, res) => {
    Artist.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving artists.",
            });
        else res.send(data);
    });
};

// Find a single Artist with a artistId
exports.findOne = (req, res) => {
    Artist.findById(req.params.artistId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Artist with id ${req.params.artistId}.`,
                });
            } else {
                res.status(500).send({
                    message:
                        "Error retrieving Artist with id " + req.params.artistId,
                });
            }
        } else res.send(data);
    });
};

// Find a single Artist with userid
exports.findByUser = (req, res) => {
    Artist.findByUser(req.params.user_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Artist with id ${req.params.user_id}.`,
                });
            } else {
                res.status(500).send({
                    message:
                        "Error retrieving Artist with id " + req.params.user_id,
                });
            }
        } else res.send(null,data);
    });
};
// Find a single Artist with profileid
exports.findByProfile = (req, res) => {
    Artist.findByProf(req.params.profileid, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                console.log("error not found")
                res.status(404).send({
                    message: `Not found Artist with id ${req.params.profileid}.`,
                });
            }
            else {
                console.log("error with server")
                res.send({
                    message:
                        "Error retrieving Artist with id " + req.params.profileid,
                    errors: err,
                    data: data
                });
            }
        }
        else {
            console.log("found artists ids are:", data)
            res.send(data);
        }
    });
};

// Update a Artist identified by the artistId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    Artist.updateById(req.params.artistId, new Artist(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Artist with id ${req.params.artistId}.`,
                });
            } else {
                res.status(500).send({
                    message: "Error updating Artist with id " + req.params.artistId,
                });
            }
        } else res.send(data);
    });
};

// Delete a Artist with the specified artistId in the request
exports.delete = (req, res) => {
    Artist.remove(req.params.artistId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Artist with id ${req.params.artistId}.`,
                });
            } else {
                res.status(500).send({
                    message:
                        "Could not delete Artist with id " + req.params.artistId,
                });
            }
        } else res.send({ message: `Artist was deleted successfully!` });
    });
};

// Delete all Artists from the database.
exports.deleteAll = (req, res) => {
    Artist.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while removing all artists.",
            });
        else res.send({ message: `All Artists were deleted successfully!` });
    });
};
