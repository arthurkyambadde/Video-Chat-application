const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");
const uuid = require("uuid");

const io = require("socket.io")(server, {
  cors: {
    origin: true,
    methods: ["GET", "POST"],
    allowedHeaders: ["Access-Control-Allow-Origin"],
    credentials: true,
  },
});

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const PORT = 5000;

let users = [];

app.get("/", (req, res) => {
  res.send("Running server");
});

io.on("connection", (socket) => {
  const clientId = socket.id;

  socket.emit("me", clientId);

  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });

  socket.on("callUser", ({ userToCall, signalData, from, name }) => {
    console.log(userToCall, "calling");
    io.to(userToCall).emit("callUser", { signal: signalData, from, name });
  });

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal);
  });

  socket.on("setUsername", function (data) {
    if (users.indexOf(data) > -1) {
      users.push(data);
      socket.emit("userSet", { username: data });
    } else {
      socket.emit(
        "userExists",
        data + " username is taken! Try some other username."
      );

      socket.emit("userSet", { username: data });
    }
  });

  socket.on("msg", function (data) {
    //Send message to everyone
    io.sockets.emit("newmsg", data);
  });
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
