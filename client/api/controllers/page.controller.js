const Page = require("../models/page.model.js");

// Create and Save a new Page{
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    // Create a Page
    const page = new Page({
        name: req.body.name,
        type: req.body.type,
        slug: req.body.slug,
    });

    const user = req.params.user_id
    const type = req.body.type
    console.log(req.params)

    // Save Page in the database
    Page.create(page, (err, data) => {
        console.log("page", page)
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while creating the Page.",
            });
        else {
            let pageLink = { page_id: data.id, user_id: user, type: type }
            Page.link(pageLink, (err, data) => {
                if (err)
                    res.status(500).send({
                        message:
                            err.message || "failed to link new page with user"
                    })
                else {
                    res.send(data)
                }
            })
        }
        // res.send(data);
    });
};

// Retrieve all Pages from the database.
exports.findAll = (req, res) => {
    Page.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving pages.",
            });
        else res.send(data);
    });
};

// Retrieve all Pages from a category.
exports.findAllCategory = (req, res) => {
    Page.getAllCategory(req.params.category, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving pages.",
            });
        else res.send(data);
    });
};

// Find a single Page with a pageId
exports.byId = (req, res) => {
    Page.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Page with id ${req.params.id}.`,
                });
            } else {
                res.status(500).send({
                    message:
                        "Error retrieving Page with id " + req.params.id,
                });
            }
        } else res.send(data);
    });
};

// Find a single Page with userid
exports.findByUser = (req, res) => {
    Page.findByUser(req.params.user_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Page with id ${req.params.user_id}.`,
                });
            } else {
                res.status(500).send({
                    message:
                        "Error retrieving Page with id " + req.params.user_id,
                });
            }
        } else res.send(data);
    });
};

// Pages find by city
exports.venueByCity = (req, res) => {
    Page.venueByCity(req.params.cityId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found venue with for ${req.params.cityId}.`,
                });
            } else {
                res.status(500).send({
                    message:
                        "Error retrieving venue with for " + req.params.cityId,
                });
            }
        } else res.send(data);
    });
};

// Pages find by city
exports.pagesByCity = (req, res) => {
    Page.pagesByCity(req.params.cityId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found pages with for ${req.params.cityId}.`,
                });
            } else {
                res.status(500).send({
                    message:
                        "Error retrieving pages with for " + req.params.cityId,
                });
            }
        } else res.send(data);
    });
};


// Find a single Page with profileid
exports.findByProfile = (req, res) => {
    Page.findByProf(req.params.profileid, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                console.log("error not found")
                res.status(404).send({
                    message: `Not found Page with id ${req.params.profileid}.`,
                });
            }
            else {
                console.log("error with server")
                res.send({
                    message:
                        "Error retrieving Page with id " + req.params.profileid,
                    errors: err,
                    data: data
                });
            }
        }
        else {
            console.log("found pages ids are:", data)
            res.send(data);
        }
    });
};

// Update a Page identified by the pageId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    }
    else {
        Page.updateById(req.body, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Page`,
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Page"
                    });
                }
            } else res.send(data);
        });
    }
};

// Delete a Page with the specified pageId in the request
exports.delete = (req, res) => {
    Page.remove(req.params.pageId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Page with id ${req.params.pageId}.`,
                });
            } else {
                res.status(500).send({
                    message:
                        "Could not delete Page with id " + req.params.pageId,
                });
            }
        } else res.send({ message: `Page was deleted successfully!` });
    });
};

// Delete all Pages from the database.
exports.deleteAll = (req, res) => {
    Page.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while removing all pages.",
            });
        else res.send({ message: `All Pages were deleted successfully!` });
    });
};
