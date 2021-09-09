const sql = require("./db.js");


// constructor
const Venue = function(venue) {
  this.email = venue.email;
  this.name = venue.name;
  this.active = venue.active;
  this.follow = venue.follow
};

Venue.create = (newVenue, result) => {
  sql.query("INSERT INTO venues SET ?", newVenue, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created venue: ", { id: res.insertId, ...newVenue });
    result(null, { id: res.insertId, ...newVenue });
  });
};

Venue.Login = (venueEmail, result) => {
  sql.query(`SELECT * FROM venues WHERE email = ${venueEmail}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found venue: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Venue with the id
    result({ kind: "not_found" }, null);
  });
};
Venue.findById = (venueId, result) => {
  sql.query(`SELECT * FROM venues WHERE id = ${venueId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found venue: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Venue with the id
    result({ kind: "not_found" }, null);
  });
};

Venue.getAll = result => {
  sql.query("SELECT * FROM venues", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("venues: ", res);
    result(null, res);
  });
};

Venue.updateById = (id, venue, result) => {
  sql.query(
    "UPDATE venues SET email = ?, name = ?, active = ? WHERE id = ?",
    [venue.email, venue.name, venue.active, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Venue with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated venue: ", { id: id, ...venue });
      result(null, { id: id, ...venue });
    }
  );
};

Venue.remove = (id, result) => {
  sql.query("DELETE FROM venues WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Venue with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted venue with id: ", id);
    result(null, res);
  });
};

Venue.removeAll = result => {
  sql.query("DELETE FROM venues", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} venues`);
    result(null, res);
  });
};

module.exports = Venue;