const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const next = require("next");
const port = parseInt(process.env.PORT, 10) || 3000;
const {
  addUser,
  removeUser,
  getUser,
  existingRoom,
  getUsersInRoom
} = require("./utils/socket");
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });

const routes = require("./routes");

const handler = routes.getRequestHandler(nextApp);

io.on("connection", socket => {
  console.log("a user connected");

  socket.on("join", (data, callback) => {
    const { error, user } = addUser({
      id: socket.id,
      name: data.name,
      room: data.room,
      signalRoom: data.signalRoom
    });
    if (error) return callback(error);

    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to the room ${user.room}`
    });

    socket.broadcast.to(user.room).emit("message", {
      user: "admin",
      text: `New client in the + ${user.room} room`
    });
    socket.join(user.room);
    socket.join(user.signalRoom);

    callback();
  });

  socket.on("sendMessage", (data, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("message", { user: user.name, text: data });

    callback();
  });

  socket.on("signal", data => {
    const user = getUser(socket.id);

    console.log(data);

    // if (existingRoom(user.signalRoom).length > 1)
    // 자기 자신 제외 송출
    socket.broadcast.to(user.signalRoom).emit("signaling_message", {
      type: data.type,
      message: data.message
    });

    // 자신을 포함한 송출
    // io.to(user.signalRoom).emit("signaling_message", {
    //   type: data.type,
    //   message: data.message
    // });
  });

  socket.on("disconnect", () => {
    console.log("User had left!!!");
  });
});

nextApp.prepare().then(() => {
  app.get("/service-worker.js", (req, res) => {
    nextApp.serveStatic(req, res, "./.next/service-worker.js");
  });

  app.get("/favicon.ico", (req, res) => {
    nextApp.serveStatic(req, res, "./public/static/favicon.ico");
  });

  app.get("/pwa.png", (req, res) => {
    nextApp.serveStatic(req, res, "./public/static/pwa.png");
  });

  const serviceWorkers = [
    {
      filename: "service-worker.js",
      path: "./.next/static/service-worker.js"
    },
    {
      filename: "firebase-messaging-sw.js",
      path: "./static/firebase-messaging-sw.js"
    }
  ];

  serviceWorkers.forEach(({ filename, path }) => {
    app.get(`/${filename}`, (req, res) => {
      nextApp.serveStatic(req, res, path);
    });
  });

  app.get("*", (req, res) => {
    return handler(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
