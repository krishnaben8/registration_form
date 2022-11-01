const express = require("express");
const app = express();
const dbConnect = require("../utils/db_config");

app.put("/authenticate-user", (req, res) => {
  const { email, password } = req.body;

  try {
    let query = `SELECT email, password FROM users WHERE email=${email}`;

    dbConnect.query(query, (err, result) => {
      if (err) {
        res.status(500).json({ status: 500, message: "try again later" });
      } else if (result.length < 0) {
        res.status(204).json({ status: 204, message: "user not found" });
      } else {
        if (result[0].password == password) {
          res
            .status(200)
            .json({ status: 200, message: "user authenticated successfully" });
        } else {
          res.status(401).json({
            status: 401,
            message:
              "either password or email is incorrect. please check them and try again!!",
          });
        }
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, message: error });
  }
});

app.post("/add-user", (req, res) => {
  const { email, password } = req.body;
  const errors = {
    email: "",
  };

  try {
    let duplicateEmailQuery = `SELECT email FROM users WHERE email = ?`;
    dbConnect.query(duplicateEmailQuery, [email], (err, results) => {
      let email_duplicate = results;
      email_duplicate.length == 0
        ? (errors.email = "")
        : (errors.email = `User's email already exist in our database`);
      console.log(errors.email);
      if (errors.email) {
        res.status(201).json({ status: 400, email_error: errors.email });
      } else {
        const newUser = {
          email: email,
          password: password,
        };

        let addUser = `INSERT INTO users SET ?`;
        dbConnect.query(addUser, [newUser], (err, results) => {
          res.status(200).json({
            status: 200,
            error: "",
            message: "Successfully added the user to our database",
          });
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, message: error });
  }
});

module.exports = app;
