

const Image = require("../models/image.model.js");
const path = require('path')

// Create and Save a new Image{
exports.create = (req, res, next) => {

    // const url = 'process.env.REACT_APP_URL:3000'
    const url = req.protocol + '://' + req.get('host')
    // console.log("url",url)
    // console.log("req.file",req)
        // Validate request
        if (!req.body) {
            res.status(400).send({
                message: "Content can not be empty!",
            });
        }
        // Create a Image
        const image = new Image({
            name: req.file.filename,
            profileImg: url+"/"+req.file.filename,

        });

        console.log("image", image)
        
        // Save Image in the database
        Image.upload(image, (err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message ||
                        "Some error occurred while creating the Image.",
                });
            else res.send(data);
        });
    };


    // Find a single User with a userId
    exports.get = (req, res) => {
        console.log(`data for ${req.params.id}`,req.params.id)
        Image.findById(req.params.id, (err, data) => {
            // console.log("this is received data from model", data)
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Event with id ${req.params.id}.`,
                    });
                } else {
                    res.status(500).send({
                        message:
                            "Error retrieving Event with id " + req.params.id,                   });
                }
            } else {
                res.send(data);
            }
        });
    };