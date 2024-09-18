/** @format */

const socketio = require("socket.io");
const express = require("express");
const path = require("path");
const app = express();
// socket io k liye http server
const http = require("http");
// or ye main funciton jo use krena pdega
const server = http.createServer(app);
// thi gives io (noiler plaste) server connection
const io = socketio(server);

// set up ejs
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
// static images . vanilla js

io.on("connection", function (socket) {
	socket.on("send-location", function (data) {
		// emit to tell everyone
		io.emit("receive-location", { id: socket.id, ...data });
	});
	console.log("connected");

	socket.on("disconnect", function () {
		io.emit("user-disconnected", socket.id);
	});
});

app.get("/", function (req, res) {
	res.render("index");
});

server.listen(3000);
