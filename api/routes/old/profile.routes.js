module.exports = app => {
  const profiles = require("../controllers/profile.controller.js");

  // Create a new Profile
  app.post("/profiles", profiles.create);

  // Retrieve all Profiles
  app.get("/profiles", profiles.findAll);

  // Retrieve all Profiles by id
  app.get("/profiles/getall/:user_id", profiles.findAll);

  // Retrieve a single Profile with profileId
  app.get("/profiles/:profileId", profiles.findOne);

  // Retrieve a single Profile with slug
  app.get("/profiles/bySlug/:slug", profiles.findSlug);

  // Update a Profile with profileId
  app.put("/profiles/:profileId", profiles.update);

  // Delete a Profile with profileId
  app.delete("/profiles/:profileId", profiles.delete);

  // Create a new Profile
  app.delete("/profiles", profiles.deleteAll);
};