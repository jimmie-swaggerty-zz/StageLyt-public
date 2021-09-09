module.exports = app => {
  const pages = require("../controllers/page.controller.js");

  // Create a new Profile
  app.post("/api/pages/:user_id", pages.create);

  // Retrieve all Profiles
  app.get("/api/pages", pages.findAll);

  // PagebyId
  app.get("/api/pages/:id", pages.byId);

  // Retrieve all Venues
  app.get("/pages/category/:category", pages.findAllCategory);

  //Venues by city
  app.get("/api/pages/venues/bycity/:cityId", pages.venueByCity)

  //Venues by city
  app.get("/api/pages/bycity/:cityId", pages.pagesByCity)

  // Retrieve a single Profile with pageId
  app.get("/api/pages/mypages/:user_id", pages.findByUser);

  // Retrieve a single Profile with pageId
  app.get("/pages/byprofile/:profileid", pages.findByProfile);

  // Update a Profile with pageId
  app.put("/api/pages", pages.update);

  // Delete a Profile with pageId
  app.delete("/pages/:pageId", pages.delete);

  // Create a new Profile
  app.delete("/pages", pages.deleteAll);
};