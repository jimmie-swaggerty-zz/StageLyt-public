module.exports = app => {
  const cities = require("../controllers/city.controller.js");

  // Create a new Profile
  app.post("/api/cities", cities.create);

  // Retrieve all Profiles
  app.get("/api/cities", cities.findAll);

  // Retrieve a single Profile with citieId
  app.get("/api/cities/:cityId", cities.findOne);

  // Update a Profile with citieId
  app.put("/api/cities", cities.update);

  // Delete a Profile with citieId
  app.delete("/api/cities/:cityId", cities.delete);

  // Create a new Profile
  app.delete("/api/cities", cities.deleteAll);
};