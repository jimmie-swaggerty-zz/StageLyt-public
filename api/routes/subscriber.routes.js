module.exports = app => {
  const subscriber = require("../controllers/subscriber.controller.js");

  // Create a new subscriber
  app.post("/api/subscribe", subscriber.create);

};