module.exports = app => {
  const venues = require("../controllers/venue.controller.js");

  // Create a new User
  app.post("/venues", venues.create);

  // Retrieve all Users
  app.get("/venues", venues.findAll);

  // Retrieve a single User with venueId
  app.get("/venues/:venueId", venues.findOne);

  // Update a User with venueId
  app.put("/venues/:venueId", venues.update);

  // Delete a User with venueId
  app.delete("/venues/:venueId", venues.delete);

  // Create a new User
  app.delete("/venues", venues.deleteAll);
};