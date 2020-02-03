const express = require("express");
const { createServer } = require("http");
const next = require("next");
const { parse } = require("url");
const { join } = require("path");
const port = parseInt(process.env.PORT, 10) || 3000;

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });

const routes = require("./routes");

const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
  const server = express();

  server.get("/service-worker.js", (req, res) => {
    app.serveStatic(req, res, "./.next/service-worker.js");
  });

  server.get("/favicon.ico", (req, res) => {
    app.serveStatic(req, res, "./public/static/favicon.ico");
  });

  server.get("/pwa.png", (req, res) => {
    app.serveStatic(req, res, "./public/static/pwa.png");
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
    server.get(`/${filename}`, (req, res) => {
      app.serveStatic(req, res, path);
    });
  });

  server.get("*", (req, res) => {
    return handler(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});

// app.prepare().then(() => {
//   createServer((req, res) => {
//     const parsedUrl = parse(req.url, true);

//     const rootStaticFiles = ["/favicon.ico", "pwa.png"];

//     if (rootStaticFiles.indexOf(parsedUrl.pathname) > -1) {
//       const path = join(__dirname, "public", parsedUrl.pathname);
//       app.serveStatic(req, res, path);
//     } else if (parsedUrl.pathname === "/firebase-messaging-sw.js") {
//       const path = join(__dirname, "public", "/firebase-messaging-sw.js");
//       if (!!res.sendFile) {
//         res.sendFile(join(__dirname, "public", path));
//         app.serveStatic(req, res, path);
//       } else {
//         handler(req, res, parsedUrl);
//       }
//     } else if (parsedUrl.pathname === "/service-worker.js") {
//       const path = join(__dirname, ".next", "/service-worker.js");
//       if (!!res.sendFile) {
//         res.sendFile(join(__dirname, ".next", path));
//         app.serveStatic(req, res, path);
//       } else {
//         handler(req, res, parsedUrl);
//       }
//     } else {
//       handler(req, res, parsedUrl);
//     }
//   }).listen(port, err => {
//     if (err) throw err;
//     console.log(`> Ready on http://localhost:${port}`);
//   });
// });
