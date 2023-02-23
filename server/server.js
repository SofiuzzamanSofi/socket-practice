const express = require("express");
const app = express();
require("dotenv").config();
require("colors")
const port = process.env.PORT || 5000;

const http = require("http");
const server = http.createServer(app);


app.get("/", (req, res) => {
    res.send({
        success: true,
        message: "Bismillah. socket.io practice server is running well."
    })
})

app.listen(port, () => {
    console.log(`socket.io practice running: ${port}`.bgCyan);
})