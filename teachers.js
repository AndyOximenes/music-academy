const fs = require("fs");
const data = require("./data.json");
const { age, date } = require("./utils");

exports.index = (request, response) => {
    return response.render("teachers/index", { teachers: data.teachers });
};

// === POST ===

exports.post = (request, response) => {
    const keys = Object.keys(request.body);
    let {
        avatar_url,
        name,
        birth,
        educational_level,
        lesson,
        services,
    } = request.body;

    for (key of keys) {
        if (request.body[key] == "") {
            return response.send("Please fill all the fields");
        }
    }

    birth = Date.parse(birth);
    const created_at = Date.now();
    const id = Number(data.teachers.length + 1);

    data.teachers.push({
        id,
        avatar_url,
        name,
        birth,
        educational_level,
        lesson,
        services,
        created_at,
    });

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        if (err) return response.send("Write file error!");

        return response.redirect("/teachers");
    });
};

// === SHOW ===

exports.show = (request, response) => {
    const { id } = request.params;

    const foundTeacher = data.teachers.find((teacher) => {
        return teacher.id == id;
    });

    if (!foundTeacher) return response.send("Teacher not found");

    const teacher = {
        ...foundTeacher,
        age: age(foundTeacher.birth),
        services: foundTeacher.services.split(","),
        created_at: new Intl.DateTimeFormat("pt-BR").format(
            foundTeacher.created_at
        ),
    };

    return response.render("teachers/show", { teacher });
};

// === EDIT ===

exports.edit = (request, response) => {
    const { id } = request.params;

    const foundTeacher = data.teachers.find((teacher) => {
        return teacher.id == id;
    });

    if (!foundTeacher) return response.send("Teacher not found");

    const teacher = {
        ...foundTeacher,
        birth: date(foundTeacher.birth),
    };

    return response.render("teachers/edit", { teacher });
};

// === PUT ===

exports.put = (request, response) => {
    const { id } = request.body;

    let index = 0;

    const foundTeacher = data.teachers.find((teacher, foundIndex) => {
        if (teacher.id == id) {
            index = foundIndex;
            return true;
        }
    });

    if (!foundTeacher) {
        return response.send("Teacher not found!");
    }

    const teacher = {
        ...foundTeacher,
        ...request.body,
        birth: Date.parse(request.body.birth),
        id: Number(request.body.id),
    };

    data.teachers[index] = teacher;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        if (err) return response.send("Write file error!");

        return response.redirect(`/teachers/${id}`);
    });
};

// === DELTE ===

exports.delete = (request, response) => {
    const { id } = request.body;

    const filteredTeacher = data.teachers.filter((teacher) => {
        return teacher.id != id;
    });

    data.teachers = filteredTeacher;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        if (err) return response.send("Write file error!");

        return response.redirect("/teachers");
    });
};
