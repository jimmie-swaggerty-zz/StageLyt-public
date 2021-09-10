module.exports = app => {
  const events = require("../controllers/event.controller.js");

  // Create a new User
  app.post("/api/events", events.create);

  // Retrieve all Users
  app.get("/api/events", events.findAll);

  // Retrieve all my events
  app.get("/api/events/myevents/:profile", events.findMine);

  // Retrieve a single User with eventId
  app.get("/api/events/:eventId", events.findOne);

  // Find events by city
  app.get("/api/events/bycity/:cityId", events.byCity);

  // Retrieve events by venue
  app.get("/api/events/byvenue/:venue_id", events.findByVenue);

  // Update a event with eventId
  app.put("/api/events/update/:eventId", events.update);

  // Delete a event with eventId
  app.delete("/api/events/:eventId", events.delete);

  // Create a new User
  app.delete("/api/events", events.deleteAll);
};