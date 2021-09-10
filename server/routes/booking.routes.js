module.exports = app => {
  const bookings = require("../controllers/booking.controller.js");

  // Create a new Booking
  app.post("/api/bookings", bookings.create);

  // Retrieve all Bookings
  app.get("/api/bookings", bookings.findAll);

  // Retrieve all Bookings by page
  app.get("/api/bookings/bypage/:page_id", bookings.findPageAll);

  // Retrieve Bookings with event id
  app.get("/api/bookings/events/:event_id", bookings.findOneEvent);
  
  // Retrieve Bookings with event id
  app.get("/api/bookings/events/approve/:eventId", bookings.byEvent);

  // Retrieve a single Booking with booking id
  app.get("/api/bookings/:bookingId", bookings.findOne);

  // Update a Booking with bookingId
  app.put("/api/bookings/:bookingId", bookings.update);

  // accept booking
  app.put("/api/bookings/accept/:bookingId", bookings.accept);

  // send booking
  app.put("/api/bookings/send/:bookingId", bookings.send);

  // Delete a Booking with bookingId
  app.delete("/api/bookings/:bookingId", bookings.delete);

  // Create a new Booking
  app.delete("/api/bookings", bookings.deleteAll);
};