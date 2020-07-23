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
        Student.teacherSelectOptions((options) => {
            return response.render("students/create", {
                TeacherOptions: options,
            });
        });
    },

    show(request, response) {
        Student.find(request.params.id, (student) => {
            if (!student) throw "Student not found!";

            student.birth = date(student.birth).birthDay;

            return response.render("students/show", { student });
        });
    },

    edit(request, response) {
        Student.find(request.params.id, (student) => {
            if (!student) throw "Student not found!";

            student.birth = date(student.birth).iso;

            Student.teacherSelectOptions((options) => {
                return response.render(`students/edit`, {
                    student,
                    TeacherOptions: options,
                });
            });
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
