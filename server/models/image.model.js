const sql = require("./db.js");
// constructor
const Image = function(image) {
  this.profileImg = image.profileImg;
};

Image.upload = (newImage, result) => {
    console.log("new Image",newImage)
    sql.query("INSERT INTO images SET path = ?", [newImage.profileImg, newImage.page_id], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("added image: ", { id: res.insertId, ...newImage });
      result(null, { id: res.insertId, ...newImage });
    });
  };

Image.findById = (id, result) => {
    // console.log(newImage)
    sql.query(`SELECT * FROM images WHERE id = ?`, id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      else{
      console.log("get results", res[0])
      // console.log("added image: ", { id: res.insertId, ...newImage });
      result(null, res[0]);
      }
      // result(null,res[0])
    });
  };
  

  module.exports = Image;