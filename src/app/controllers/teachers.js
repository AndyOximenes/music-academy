const { date, age } = require("../../lib/utils");
const Teacher = require("../models/Teacher");

module.exports = {
    index(request, response) {
        Teacher.all((teachers) => {
            return response.render("teachers/index", { teachers });
        });
    },

    post(request, response) {
        const keys = Object.keys(request.body);

        for (key of keys) {
            if (request.body[key] == "") {
                return response.send("Please fill all the fields");
            }
        }

        Teacher.create(request.body, (teacher) => {
            return response.redirect(`/teachers/${teacher.id}`);
        });
    },

    create(request, response) {
        return response.render("teachers/create");
    },

    show(request, response) {
        Teacher.find(request.params.id, (teacher) => {
            if (!teacher) throw "Teacher not found!";

            teacher.age = age(teacher.birth);
            teacher.services = teacher.services.split(",");
            teacher.created_at = date(teacher.created_at).format;

            return response.render("teachers/show", { teacher });
        });
    },

    edit(request, response) {
        Teacher.find(request.params.id, (teacher) => {
            if (!teacher) throw "Teacher not found!";

            teacher.birth = date(teacher.birth).iso;
            teacher.services = teacher.services.split(",");
            teacher.created_at = date(teacher.created_at).format;

            return response.render(`teachers/edit`, { teacher });
        });
    },

    put(request, response) {
        const keys = Object.keys(request.body);

        for (key of keys) {
            if (request.body[key] == "") {
                return response.send("Please fill all the fields");
            }
        }

        Teacher.update(request.body, () => {
            return response.redirect(`/teachers/${request.body.id}`);
        });
    },

    delete(request, response) {
        Teacher.delete(request.body, () => {
            return response.redirect(`/teachers`);
        });
    },
};
