const express = require("express");
const nunjucks = require("nunjucks");
const routes = require("./routes");
const { urlencoded } = require("express");

const server = express();

server.use(urlencoded({ extended: true }));
server.use(routes);
server.use(express.static("public"));

server.set("view engine", "njk");

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true,
});

server.listen(5000, () => {
    console.log("🚀 Server is running - port 5000");
});
