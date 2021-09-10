const sql = require("./db.js");


// constructor
const Profile = function (profile) {
  this.slug = profile.slug;
  this.user_id = profile.user_id;
};

Profile.create = (newProfile, result) => {
  sql.query("INSERT INTO profiles SET ?", newProfile, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created profile: ", { id: res.insertId, ...newProfile });
    result(null, { id: res.insertId, ...newProfile });
  });
};

Profile.findBySlug = (slug, result) => {
  sql.query(`SELECT * FROM profiles WHERE slug = ?`, slug, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result.send(err, null);
      return;
    }

    if (res.length) {
      console.log("found profile: ", res[0]);
      result(null, "taken");
      return;
    }
    else { result(null,"available") }



  });
};

Profile.getAll = result => {
  sql.query("SELECT * FROM profiles", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("profiles: ", res);
    result(null, res);
  });
};

Profile.getAllMine =(user_id, result) => {
  sql.query("SELECT * FROM profiles WHERE user_id = ?", user_id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("profiles: ", res);
    result(null, res);
  });
};

Profile.remove = (id, result) => {
  sql.query("DELETE FROM profiles WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Profile with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted profile with id: ", id);
    result(null, res);
  });
};

Profile.removeAll = result => {
  sql.query("DELETE FROM profiles", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} profiles`);
    result(null, res);
  });
};

module.exports = Profile;