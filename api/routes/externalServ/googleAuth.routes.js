
module.exports = (app) => {
    const { OAuth2Client } = require("google-auth-library");
    const client = new OAuth2Client(process.env.REACT_APP_CLIENT_ID);
    const sql = require("../../models/db");

    app.post("/api/v1/auth/google", async (req, result) => {
        const { token } = req.body;
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.REACT_APP_CLIENT_ID,
        });
        const { email } = ticket.getPayload();

        let searchedUser = []
        let searchedUserData = []
        sql.query(
            `SELECT * FROM users WHERE email = ?`, email, (err, res) => {
                console.log(res);
                if (err) {
                    console.log("error: ", err);
                    result.send(err);
                    return;
                }
                else if (res[0] === undefined) {
                    sql.query("INSERT INTO users SET email=?", email, (err, res) => {
                        if (err) {
                            console.log("error: ", err);
                            result.send(err, null);
                            return;
                        }
                        console.log("created user: ", { id: res.insertId, email: email });
                        result.send({ id: res.insertId, email: email });
                    });
                }
                else {
                    console.log(`found ${res[0].email} user`);
                    searchedUser = (res[0]);
                    searchedUserData = (searchedUser);
                    sql.query("SELECT * FROM users_has_pages WHERE user_id = ?", searchedUserData.id, (err, res) => {
                        if (err) {
                            console.log("error: ", err);
                            result.send(err);
                            return;
                        }
                        console.log("pages: ", res);

                        result.json({
                            message: "Successfully Logged In",
                            user: searchedUser,
                            pages: res
                            
                        })

                    })
                }
            })


    })
}