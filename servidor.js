const http = require("http");
const fs = require("fs");
const host = "localhost";
const port = 8000;
const requestListener = function (req, res) {
  const url = new URL(req.url, `https://localohst:${port}/`);

  res.setHeader("Content-Type", "text/html");
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
  if (url.pathname === "/user") {
    const name = url.searchParams.get("name");
    const email = url.searchParams.get("email");

    //res.write(JSON.stringify({ nombre: name, email: email }));
  }
};
const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`El servidor esta corriendo en http://${host}:${port}`);
});
