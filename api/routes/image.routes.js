const images = require("../controllers/image.controller.js");
const path= require("path");
(multer = require("multer")), (uuid = require("react-uuid"));

const DIR = "../server/UploadedImages"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const extName = path.extname(file.originalname);
        console.log(file)
        cb(null, uuid() + extName);
    },
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg"
        ) {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
        }
    },
});

module.exports = (app) => {
    // Upload a new Image
    app.post("/api/image", upload.single("profileImg"), images.create);
    
    app.get("/api/image/:id", images.get);
};
