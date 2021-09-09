const Subscriber = require("../models/subscriber.model.js");

// Create and Save a new subcriber
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    // Create a User
    const subscriber = new Subscriber({
        email: req.body.email,
        name: req.body.name,
        type: req.body.type
    });

    // Save User in the database
    Subscriber.create(subscriber, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while creating the User.",
            });
        else res.send(data);
    });
};