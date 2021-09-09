module.exports = app => {
    const s3image = require("../controllers/s3image.controller.js");
  
    // Create a new Profile
    app.post("/api/s3images/upload", s3image.upload);
  
    // Delete a Profile with pageId
    // app.delete("/api/s3images/delete/:imageKey", s3image.delete);

  };