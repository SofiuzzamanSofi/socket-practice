const express = require('express');
const cors = require('cors');
require("dotenv").config();
require("colors")
const port = process.env.PORT || 5000;
const app = express();

// middleware--------------
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

const http = require("http");
const httpServer = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
});




io.on("connection", (socket) => {
    console.log("event connected");

    socket.on("disconnect", (socket) => {
        console.log("event disconnected");
    })

    //     socket.send("this is from serverside.");

    //     // socket.on("message", (data) => {
    //     //     console.log(data);
    //     // })
    //     // socket.on("testEvent", (data) => {
    //     //     console.log(data);
    //     // })
    //     io.sockets.emit("testingFebruary", "Oma go Ture Love");

    socket.on("reactEvent", (data) => {
        console.log(data);
        socket.emit("servermessage", data)
    })
})

// let fifa = io.of("/worldCup");
// fifa.on("connection", (socket) => {
//     fifa.emit("febEvent", "Hello this is testing on februay month")
// })

// let cricket = io.of("/cricket");
// cricket.on("connection", (socket) => {
//     cricket.emit("cricketEvent", "This is from mirpur cricket.")
// })

// let hocky = io.of("/hockyworld");
// hocky.on("connection", (socket) => {
//     hocky.emit("hockyEvent", "This is from hockye event data.")
// })


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