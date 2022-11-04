const http = require("http");
const fs = require("fs");
const host = "localhost";
const port = 8000;
const requestListener = function (req, res) {
  const url = new URL(req.url, `https://localohst:${port}/`);

  res.setHeader("Content-Type", "text/html");

  if (url.pathname === "/user") {
    const edad = url.searchParams.get("edad");
    if (edad < 18) {
      fs.readFile(__dirname + "/toycar.html", "utf-8", (err, data) => {
        if (err) {
          res.writeHead(500);
          res.write("file not found");
        } else {
          res.writeHead(200);
          res.write(data);
        }
        res.end();
      });
    } else {
      fs.readFile(__dirname + "/realcar.html", "utf-8", (err, data) => {
        if (err) {
          res.writeHead(500);
          res.write("file not found");
        } else {
          res.writeHead(200);
          res.write(data);
        }
        res.end();
      });
    }
  } else {
    res.writeHead(400);
    res.write("use the correct path");
    res.end();
  }
};
const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`El servidor esta corriendo en http://${host}:${port}`);
});
