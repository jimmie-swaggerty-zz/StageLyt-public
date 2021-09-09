const sql = require("./db.js");


// constructor
const Producer = function(producer) {
  this.email = producer.email;
  this.name = producer.name;
  this.active = producer.active;
  this.follow = producer.follow
};

Producer.create = (newProducer, result) => {
  sql.query("INSERT INTO producers SET ?", newProducer, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created producer: ", { id: res.insertId, ...newProducer });
    result(null, { id: res.insertId, ...newProducer });
  });
};

Producer.Login = (producerEmail, result) => {
  sql.query(`SELECT * FROM producers WHERE email = ${producerEmail}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found producer: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Producer with the id
    result({ kind: "not_found" }, null);
  });
};
Producer.findById = (producerId, result) => {
  sql.query(`SELECT * FROM producers WHERE id = ${producerId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found producer: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Producer with the id
    result({ kind: "not_found" }, null);
  });
};

Producer.getAll = result => {
  sql.query("SELECT * FROM artists WHERE type = 'producer'", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("producers: ", res);
    result(null, res);
  });
};

Producer.updateById = (id, producer, result) => {
  sql.query(
    "UPDATE producers SET email = ?, name = ?, active = ? WHERE id = ?",
    [producer.email, producer.name, producer.active, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Producer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated producer: ", { id: id, ...producer });
      result(null, { id: id, ...producer });
    }
  );
};

Producer.remove = (id, result) => {
  sql.query("DELETE FROM producers WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Producer with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted producer with id: ", id);
    result(null, res);
  });
};

Producer.removeAll = result => {
  sql.query("DELETE FROM producers", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} producers`);
    result(null, res);
  });
};

module.exports = Producer;