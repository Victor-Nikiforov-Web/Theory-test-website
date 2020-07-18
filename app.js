const express = require('express');
const server = express();
const path = require("path");

server.use(express.static("Client/dist/theory"));

server.get("*", (request, response) => {
  response.sendFile(path.join(__dirname, "Client/dist/theory", "index.html"));
});

const app = server.listen(3000, () => {
    console.log("Express is working on port 3000");
  });