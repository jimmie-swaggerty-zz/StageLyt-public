const sql = require("./db.js");


// constructor
const City = function (city) {
  this.name = city.name;
  this.type = city.type;
  this.slug = city.slug

};

City.create = (newCity, result) => {
  sql.query("INSERT INTO cities SET ?", newCity, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err);
      return;
    }
    else {
      console.log("created city: ", { id: res.insertId, ...newCity });
      result(null, { id: res.insertId, ...newCity });
    }
  });
}

City.findById = (cityId, result) => {
  sql.query(`SELECT * FROM cities WHERE id = ?`,cityId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found city: ", res[0]);
      result(null, res[0]);
      return;
    }
    else{
    // not found City with the id
    result({ kind: "not_found" }, null);
    }
  });
};

City.getAll = result => {
  sql.query("SELECT * FROM cities", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("cities: ", res);
    result(null, res);
  });
};

City.updateById = (city, result) => {
  console.log("update id received city: ", city)
  sql.query(
    "UPDATE cities SET ? WHERE id = ?",
    [city, city.id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found City with the id
        result({ kind: "not_found" }, null);
        return;
      }
      else{
      console.log("updated city: ", city);
      result(null, city);
      }
    }
  );
};

City.remove = (id, result) => {
  sql.query("DELETE FROM cities WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found City with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted city with id: ", id);
    result(null, res);
  });
};

City.removeAll = result => {
  sql.query("DELETE FROM cities", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} cities`);
    result(null, res);
  });
};

module.exports = City;