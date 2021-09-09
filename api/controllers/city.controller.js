const City = require("../models/city.model.js");

// Create and Save a new City{
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    // Create a City
    const city = new City({
        name: req.body.name,
        type: req.body.type,
        slug: req.body.slug,
    });

    const user = req.params.user_id
    const type = req.body.type
    console.log(req.params)

    // Save City in the database
    City.create(city, (err, data) => {
        console.log("city", city)
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while creating the City.",
            });
        else {
            let cityLink = { city_id: data.id, user_id: user, type: type }
            City.link(cityLink, (err, data) => {
                if (err)
                    res.status(500).send({
                        message:
                            err.message || "failed to link new city with user"
                    })
                else {
                    res.send(data)
                }
            })
        }
        // res.send(data);
    });
};

// Retrieve all Citys from the database.
exports.findAll = (req, res) => {
    City.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving citys.",
            });
        else res.send(data);
    });
};

// Find a single City with a cityId
exports.findOne = (req, res) => {
    City.findById(req.params.cityId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found City with id ${req.params.cityId}.`,
                });
            } else {
                res.status(500).send({
                    message:
                        "Error retrieving City with id " + req.params.cityId,
                });
            }
        } else res.send(data);
    });
};

// Update a City identified by the cityId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    }
    else {
        City.updateById(req.body, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found City`,
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating City"
                    });
                }
            } else res.send(data);
        });
    }
};

// Delete a City with the specified cityId in the request
exports.delete = (req, res) => {
    City.remove(req.params.cityId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found City with id ${req.params.cityId}.`,
                });
            } else {
                res.status(500).send({
                    message:
                        "Could not delete City with id " + req.params.cityId,
                });
            }
        } else res.send({ message: `City was deleted successfully!` });
    });
};

// Delete all Citys from the database.
exports.deleteAll = (req, res) => {
    City.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while removing all citys.",
            });
        else res.send({ message: `All Citys were deleted successfully!` });
    });
};
