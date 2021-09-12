const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

var corsOptions = {
  origin: "*",
};


app.use(cors(corsOptions));



// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname+'/'));

//connect routes to server
require("./routes/user.routes.js")(app);
require("./routes/event.routes.js")(app);
require("./routes/externalServ/googleAuth.routes.js")(app);
require("./routes/page.routes.js")(app);
require("./routes/subscriber.routes.js")(app);
require("./routes/city.routes.js")(app);
require("./routes/booking.routes.js")(app);

app.set('port', (process.env.PORT || PORT));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my application." });
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

