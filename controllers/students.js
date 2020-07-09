const fs = require("fs");
const data = require("../data.json");
const { date } = require("../utils");

exports.index = (request, response) => {
    return response.render("students/index", { students: data.students });
};

exports.post = (request, response) => {
    const keys = Object.keys(request.body);
    let { avatar_url, name, email, birth, instrument, hours } = request.body;

    for (key of keys) {
        if (request.body[key] == "") {
            return response.send("Please fill all the fields");
        }
    }

    birth = Date.parse(birth);

    let id = 1;
    const lastStudent = data.students[data.students.length - 1];

    if (lastStudent) {
        id = lastStudent.id + 1;
    }

    data.students.push({
        id,
        avatar_url,
        name,
        email,
        birth,
        instrument,
        hours: Number(request.body.hours),
    });

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        if (err) return response.send("Write file error!");

        return response.redirect(`/students/${id}`);
    });
};

exports.create = (request, response) => {
    return response.render("students/create");
};

exports.show = (request, response) => {
    const { id } = request.params;

    const foundStudent = data.students.find((student) => {
        return student.id == id;
    });

    if (!foundStudent) return response.send("Student not found");

    const student = {
        ...foundStudent,
        birth: date(foundStudent.birth).birthDay,
    };

    return response.render("students/show", { student });
};

exports.edit = (request, response) => {
    const { id } = request.params;

    const foundStudent = data.students.find((student) => {
        return student.id == id;
    });

    if (!foundStudent) return response.send("Student not found");

    const student = {
        ...foundStudent,
        birth: date(foundStudent.birth),
    };

    return response.render("students/edit", { student });
};

exports.put = (request, response) => {
    const { id } = request.body;

    let index = 0;

    const foundStudent = data.students.find((student, foundIndex) => {
        if (student.id == id) {
            index = foundIndex;
            return true;
        }
    });

    if (!foundStudent) {
        return response.send("Student not found!");
    }

    const student = {
        ...foundStudent,
        ...request.body,
        birth: Date.parse(request.body.birth),
        id: Number(request.body.id),
    };

    data.students[index] = student;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        if (err) return response.send("Write file error!");

        return response.redirect(`/students/${id}`);
    });
};

exports.delete = (request, response) => {
    const { id } = request.body;

    const filteredStudent = data.students.filter((student) => {
        return student.id != id;
    });

    data.students = filteredStudent;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        if (err) return response.send("Write file error!");

        return response.redirect("/students");
    });
};
