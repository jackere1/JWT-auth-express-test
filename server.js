require("dotenv").config();

const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

app.use(express.json());

const posts = [
  {
    username: "Tom",
    title: "post1",
  },
  {
    username: "Kyle",
    title: "post2",
  },
];

app.get("/posts", authenticateToken, (request, response) => {
  response.json(posts.filter((post) => post.username === request.user.name));
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
    if (error) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.listen(2000);

console.log(Math.PI);
