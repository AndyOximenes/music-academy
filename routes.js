const express = require("express");
const routes = express.Router();
const teachers = require("./teachers");

routes.get("/", (request, response) => {
    return response.redirect("/teachers");
});

routes.get("/teachers", (request, response) => {
    return response.render("teachers/index");
});

routes.get("/teachers/create", (request, response) => {
    return response.render("teachers/create");
});

routes.post("/teachers", teachers.post);

routes.get("/students", (request, response) => {
    return response.render("students");
});

module.exports = routes;
