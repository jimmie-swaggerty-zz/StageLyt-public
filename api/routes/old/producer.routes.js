module.exports = app => {
  const producers = require("../controllers/producer.controller.js");

  // Create a new User
  app.post("/producers", producers.create);

  // Retrieve all Users
  app.get("/producers", producers.findAll);

  // Retrieve a single User with producerId
  app.get("/producers/:producerId", producers.findOne);

  // Update a User with producerId
  app.put("/producers/:producerId", producers.update);

  // Delete a User with producerId
  app.delete("/producers/:producerId", producers.delete);

  // Create a new User
  app.delete("/producers", producers.deleteAll);
};