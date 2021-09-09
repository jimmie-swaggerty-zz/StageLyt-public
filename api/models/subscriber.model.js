const sql = require("./db.js");


// constructor
const Subscriber = function (subscriber) {
  this.email = subscriber.email;
  this.name = subscriber.name;
  this.type = subscriber.type;
};

Subscriber.create = (newSubscriber, result) => {
  sql.query("INSERT INTO subscribers SET ?", newSubscriber, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created subscriber: ", { id: res.insertId, ...newSubscriber });
    result(null,{ id: res.insertId, ...newSubscriber });
  });
};

module.exports = Subscriber;