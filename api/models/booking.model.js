const sql = require("./db.js");


// constructor
const Booking = function(booking) {
  this.artist_id= booking.artist_id,
  this.event_id= booking.event_id,
  this.type= booking.type,
  this.role= booking.role,
  this.producer_id= booking.producer_id,
  this.artist_status= booking.artist_status,
  this.producer_status= booking.producer_status,
  this.pay = booking.pay,
  this.payDetails = booking.payDetails
  this.acts = booking.acts
};

Booking.create = (newBooking, result) => {
  sql.query("INSERT INTO bookings SET ?", newBooking, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created booking: ", { id: res.insertId, ...newBooking });
    result(null, { id: res.insertId, ...newBooking });
  });
};

Booking.Login = (bookingEmail, result) => {
  sql.query(`SELECT * FROM bookings WHERE email = ${bookingEmail}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found booking: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Booking with the id
    result({ kind: "not_found" }, null);
  });
};
Booking.findByEventId = (event_id, result) => {
  sql.query(`SELECT * FROM bookings WHERE event_id = ${event_id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found booking: ", res);
      result(null, res);
      return;
    }

    // not found Booking with the id
    result({ kind: "not_found" }, null);
  });

};

Booking.findByEvent = (eventId, result) => {
  sql.query(`SELECT * FROM bookings WHERE event_id = ? AND artist_status = ?`, [eventId,'accepted'], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res) {
      console.log("found bookings: ", res);
      result(null, res);
      return;
    }

    // not found Booking with the id
    result({ kind: "not_found" }, null);
  });
};

Booking.findById = (bookingId, result) => {
  sql.query(`SELECT * FROM bookings WHERE id = ?`,bookingId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found booking: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Booking with the id
    result({ kind: "not_found" }, null);
  });
};

Booking.getAll = result => {
  sql.query("SELECT * FROM bookings", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("bookings: ", res);
    result(null, res);
  });
};

Booking.getPageAll = (page_id, result) => {
  sql.query("SELECT * FROM bookings WHERE artist_id = ? OR producer_id = ? AND producer_status = ?",[page_id,page_id,"send"], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("bookings: ", res);
    result(null, res);
  });
};



Booking.updateById = (id, booking, result) => {
  sql.query(
    "UPDATE bookings SET email = ?, name = ?, active = ? WHERE id = ?",
    [booking.email, booking.name, booking.active, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Booking with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated booking: ", { id: id, ...booking });
      result(null, { id: id, ...booking });
    }
  );
};


Booking.accept = (booking_id, status, result) => {
  console.log("status", status)
  sql.query(
    "UPDATE bookings SET artist_status = ? WHERE id = ?",[status, booking_id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Booking with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated booking: ", {res});
      result(null, { res});
    }
  );
};

Booking.send = (booking_id, status, result) => {
  console.log(status)
  sql.query(
    "UPDATE bookings SET producer_status = ? WHERE id = ?",[status,booking_id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Booking with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated booking: ", {res});
      result(null, {res});
    }
  );
};

Booking.remove = (id, result) => {
  sql.query("DELETE FROM bookings WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Booking with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted booking with id: ", id);
    result(null, res);
  });
};

Booking.removeAll = result => {
  sql.query("DELETE FROM bookings", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} bookings`);
    result(null, res);
  });
};

module.exports = Booking;