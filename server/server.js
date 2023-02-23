const express = require("express");
const app = express();
require("dotenv").config();
require("colors")
const path = require("path")
const port = process.env.PORT || 5000;

const http = require("http");
const httpServer = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(httpServer);




io.on("connection", (socket) => {
    console.log("event connected");

    socket.on("disconnect", (socket) => {
        console.log("event disconnected");
    });

    socket.send("this is from serverside.");

    // socket.on("message", (data) => {
    //     console.log(data);
    // })
    // socket.on("testEvent", (data) => {
    //     console.log(data);
    // })
    io.sockets.emit("testingFebruary", "Oma go Ture Love")
})


app.get("/html", (req, res) => {
    // Use __dirname to get the current directory name
    // and concatenate it with the file name to create
    // the full file path
    const filePath = __dirname + '/app.html';

    // Send the file using res.sendFile
    res.sendFile(filePath);
});


app.get("/", (req, res) => {
    res.send({
        success: true,
        message: "Bismillah. socket.io practice server is running well."
    })
})

// app.listen(port, () => {
//     console.log(`socket.io practice running: ${port}`.bgCyan);
// })

httpServer.listen(port, () => {
    console.log(`socket.io practice running: ${port}`.bgCyan);
})