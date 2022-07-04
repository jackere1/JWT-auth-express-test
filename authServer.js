require("dotenv").config();

const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

app.use(express.json());

app.post("/token", (request, response) => {
  const refreshToken = request.body.token;
});

app.post("/login", (request, response) => {
  //Auth here
  // response.json({})
  const username = request.body.username;
  const user = {
    name: username,
  };

  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  response.json({ accessToken: accessToken });
});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30s" });
}

app.listen(1000);

console.log(Math.random());
