const sql = require("./db.js");

// constructor
const Event = function (event) {
  this.name = event.name;
  this.description = event.description;
  this.website = event.website;
  this.facebook = event.facebook;
  this.start = event.start;
  this.end = event.end;
  this.live = event.live;
  this.artist_id= event.artist_id;
  this.venue_id = event.venue_id;
  this.techInfo = event.techInfo;
  this.payInfo = event.payInfo;
  this.techSend = event.techSend;
  this.callTime = event.callTime;
  this.techSend = event.techSend;
  this.profileImg_id = event.profileImg_id;
  this.bannerImg_id = event.bannerImg_id;
};

Event.create = (newEvent, result) => {
  sql.query("INSERT INTO events SET ?", newEvent, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created event: ", { id: res.insertId, ...newEvent });
    result(null, { id: res.insertId, ...newEvent });
  });
};

Event.Login = (eventEmail, result) => {
  sql.query(`SELECT * FROM events WHERE email = ${eventEmail}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found event: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Event with the id
    result({ kind: "not_found" }, null);
  });
};

Event.findById = (eventId, result) => {
  sql.query(`SELECT * FROM events WHERE id = ${eventId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found event: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Event with the id
    result({ kind: "not_found" }, null);
  });
};

Event.findByVenueId = (venue_id, result) => {
  sql.query(`SELECT * FROM events WHERE venue_id = ?`,venue_id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    else {
      result(null, res);
      return
    }
  });
};

Event.getAll = result => {
  const today = new Date()
  sql.query(`SELECT * FROM events WHERE start >= CURDATE() ORDER BY start`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    else{
    console.log("events: ", res);
    result(null, res);
    }
  });
};

Event.byCity = (cityId, result) => {
  sql.query(`SELECT * FROM venues WHERE city_id = ?`,cityId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    else{
    console.log("events: ", res);
    result(null, res);
    }
  });
};

Event.getMine = (profiles, result) => {
  let events = {}
  profiles.map(profile => {
    return (
      sql.query("SELECT * FROM events WHERE profile_id = ?", profile.id, (err, res) => {
        events.push(res)
      }
      )
    )

  })
  results.send(events)
};

Event.updateById = (eventId, event, result) => {
  sql.query(
    "UPDATE events SET ? WHERE id = ?",
    [event, eventId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Event with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated event: ", { id: eventId, ...event });
      result(null, { id: eventId, ...event });
    }
  );
};

Event.remove = (id, result) => {
  sql.query("DELETE FROM events WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Event with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted event with id: ", id);
    result(null, res);
  });
};

Event.removeAll = result => {
  sql.query("DELETE FROM events", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} events`);
    result(null, res);
  });
};

module.exports = Event;