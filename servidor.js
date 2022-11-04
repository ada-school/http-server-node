const http = require("http");
const fs = require("fs").promises;
const host = "localhost";
const port = 8000;
const requestListener = function (req, res) {
  const url = new URL(req.url, `https://localohst:${port}/`);
  res.setHeader("Content-Type", "text/html");
  res.writeHead(200);
  fs.readFile(__dirname + "/realcar.html")
    .then((contents) => {
      res.end(contents);
    })
    .catch((err) => {
      res.writeHead(500);
      res.end(err);
      return;
    });
  if (url.pathname === "/user") {
    const name = url.searchParams.get("name");
    const email = url.searchParams.get("email");

    //res.write(JSON.stringify({ nombre: name, email: email }));
  }
  res.end();
};
const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`El servidor esta corriendo en http://${host}:${port}`);
});
