const { date, age } = require("../../lib/utils");
const Student = require("../models/Student");

module.exports = {
    index(request, response) {
        Student.all((students) => {
            return response.render("students/index", { students });
        });
    },

    post(request, response) {
        const keys = Object.keys(request.body);

        for (key of keys) {
            if (request.body[key] == "") {
                return response.send("Please fill all the fields");
            }
        }

        Student.create(request.body, (student) => {
            return response.redirect(`/students/${student.id}`);
        });
    },

    create(request, response) {
        return response.render("students/create");
    },

    show(request, response) {
        Student.find(request.params.id, (student) => {
            if (!student) throw "Student not found!";

            student.birth = date(student.birth).birthDay;
            student.created_at = date(student.created_at).format;

            return response.render("students/show", { student });
        });
    },

    edit(request, response) {
        Student.find(request.params.id, (student) => {
            if (!student) throw "Student not found!";

            student.birth = date(student.birth).iso;
            student.services = student.services.split(",");
            student.created_at = date(student.created_at).format;

            return response.render(`students/edit`, { student });
        });
    },

    put(request, response) {
        const keys = Object.keys(request.body);

        for (key of keys) {
            if (request.body[key] == "") {
                return response.send("Please fill all the fields");
            }
        }

        Student.update(request.body, () => {
            return response.redirect(`/students/${request.body.id}`);
        });
    },

    delete(request, response) {
        Student.delete(request.body, () => {
            return response.redirect(`/students`);
        });
    },
};
