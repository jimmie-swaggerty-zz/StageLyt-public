module.exports = app => {
  const artists = require("../../controllers/artist.controller.js");

  // Create a new Profile
  app.post("/artists/:profile_id", artists.create);

  // Retrieve all Profiles
  app.get("/artists", artists.findAll);

  // Retrieve a single Profile with artistId
  app.get("/artists/:artistId", artists.findOne);

  // Retrieve a single Profile with artistId
  app.get("/artists/myartists/:user_id", artists.findByUser);

  // Retrieve a single Profile with artistId
  app.get("/artists/byprofile/:profileid", artists.findByProfile);

  // Update a Profile with artistId
  app.put("/artists/:artistId", artists.update);

  // Delete a Profile with artistId
  app.delete("/artists/:artistId", artists.delete);

  // Create a new Profile
  app.delete("/artists", artists.deleteAll);
};