const sql = require("./db.js");


// constructor
const Page = function (page) {
  this.name = page.name;
  this.type = page.type;
  this.slug = page.slug

};

Page.create = (newPage, result) => {
  sql.query("INSERT INTO pages SET ?", newPage, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err);
      return;
    }
    else {
      console.log("created page: ", { id: res.insertId, ...newPage });
      result(null, { id: res.insertId, ...newPage });
    }
  });
}

Page.link = (pageLink, result) => {
  sql.query("INSERT INTO users_has_pages SET ?", pageLink, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    else {
      console.log("linked page: ", { id: res.insertId, ...pageLink });
      result(null, { id: res.insertId, ...pageLink });
    }
  });
}


Page.Login = (pageEmail, result) => {
  sql.query(`SELECT * FROM pages WHERE email = ${pageEmail}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, res);
      return;
    }

    if (res.length) {
      console.log("found page: ", res[0]);
      result(null, res[0]);
      return;
    }
    else {
      // not found Page with the id
      result({ kind: "not_found" }, null);
    }
  });
};

Page.findById = (id, result) => {
  sql.query(`SELECT * FROM pages WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found page: ", res[0]);
      result(null, res[0]);
      return;
    }
    else{
    // not found Page with the id
    result({ kind: "not_found" }, null);
    }
  });
};

Page.findByUser = (user_id, result) => {
  sql.query(`SELECT * FROM pages WHERE user_id = ? ORDER BY name`, user_id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err,null);
      return;
    }
    else if (res) {
      console.log(`found pages for user with profile ${user_id}`)
      result(null,res)
    }
    else {
      // not found Page with the id
      result({ kind: "not_found" });
    }
  });
};

Page.findByProf = (profileid, result) => {
  sql.query(`SELECT * FROM pages WHERE profile_id = ${profileid}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err);
      return;
    }
    else if (res) {
      console.log(`found user ${res[0].name} with profile ${profileid}`)
      result(null, res)
    }
    else {
      // not found Page with the id
      result({ kind: "not_found" });
    }
  });
};

Page.venueByCity = (cityId, result) => {
  sql.query(`SELECT * FROM pages WHERE city_id = ? AND type = ?`,[cityId,"venue"], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err);
      return;
    }
    else if (res) {
      console.log(`found user ${res[0].name} with profile ${cityId}`)
      result(null, res)
    }
    else {
      // not found Page with the id
      result({ kind: "not_found" });
    }
  });
};

Page.pagesByCity = (cityId, result) => {
  sql.query(`SELECT * FROM pages WHERE city_id = ?`,cityId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err);
      return;
    }
    else if (res) {
      console.log(`found user ${res[0].name} with profile ${cityId}`)
      result(null, res)
    }
    else {
      // not found Page with the id
      result({ kind: "not_found" });
    }
  });
};

Page.getAll = result => {
  sql.query("SELECT * FROM pages", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("pages: ", res);
    result(null, res);
  });
};

Page.getAllCategory = (category, result) => {
  sql.query("SELECT * FROM pages WHERE type = ?", category, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("pages: ", res);
    result(null, res);
  });
};

Page.updateById = (page, result) => {
  console.log("update id received page: ", page)
  sql.query(
    "UPDATE pages SET ? WHERE id = ?",
    [page, page.id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Page with the id
        result({ kind: "not_found" }, null);
        return;
      }
      else{
      console.log("updated page: ", page);
      result(null, page);
      }
    }
  );
};

Page.remove = (id, result) => {
  sql.query("DELETE FROM pages WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Page with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted page with id: ", id);
    result(null, res);
  });
};

Page.removeAll = result => {
  sql.query("DELETE FROM pages", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} pages`);
    result(null, res);
  });
};

module.exports = Page;