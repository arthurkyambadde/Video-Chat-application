const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");
const uuid = require("uuid");

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  },
});

app.use(cors());

const PORT = 5000;

app.get("/", (req, res) => {
  res.send("Running server");
});

io.on("connection", (socket) => {
  const clientId = `arthur`;

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
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
