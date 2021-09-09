const sql = require("./db.js");


// constructor
const Artist = function (artist) {
  this.name = artist.name;
  this.profile_id = artist.profile_id;

};

Artist.create = (newArtist, result) => {
  sql.query("INSERT INTO artists SET ?", newArtist, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created artist: ", { id: res.insertId, ...newArtist });

    result(null, { id: res.insertId, ...newArtist });
  });
}


Artist.Login = (artistEmail, result) => {
  sql.query(`SELECT * FROM artists WHERE email = ${artistEmail}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, res);
      return;
    }

    if (res.length) {
      console.log("found artist: ", res[0]);
      result(null,res[0]);
      return;
    }
    else{
    // not found Artist with the id
    result({ kind: "not_found" }, null);
    }
  });
};

Artist.findById = (artistId, result) => {
  sql.query(`SELECT * FROM artists WHERE id = ${artistId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found artist: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Artist with the id
    result({ kind: "not_found" }, null);
  });
};

Artist.findByUser = (user_id, result) => {
  sql.query(`SELECT * FROM profiles WHERE user_id = ${user_id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err);
      return;
    }
      else if(res>0){ console.log(`found user ${res.name} with profile ${user_id}`)
      result(res)
    }
    else{
    // not found Artist with the id
    result({ kind: "not_found" });
    }
  });
};

Artist.findByProf = (profileid, result) => {
  sql.query(`SELECT * FROM artists WHERE profile_id = ${profileid}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err);
      return;
    }
      else if(res){ console.log(`found user ${res[0].name} with profile ${profileid}`)
      result(null,res)
    }
    else{
    // not found Artist with the id
    result({ kind: "not_found" });
    }
  });
};

Artist.getAll = result => {
  sql.query("SELECT * FROM artists WHERE type = 'artist'", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("artists: ", res);
    result(null, res);
  });
};

Artist.updateById = (id, artist, result) => {
  sql.query(
    "UPDATE artists SET email = ?, name = ?, active = ? WHERE id = ?",
    [artist.email, artist.name, artist.active, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Artist with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated artist: ", { id: id, ...artist });
      result(null, { id: id, ...artist });
    }
  );
};

Artist.remove = (id, result) => {
  sql.query("DELETE FROM artists WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Artist with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted artist with id: ", id);
    result(null, res);
  });
};

Artist.removeAll = result => {
  sql.query("DELETE FROM artists", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} artists`);
    result(null, res);
  });
};

module.exports = Artist;