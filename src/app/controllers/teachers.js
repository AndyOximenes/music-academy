const { date } = require("../../lib/utils");

module.exports = {
    index(request, response) {
        return response.render("teachers/index");
    },

    post(request, response) {
        const keys = Object.keys(request.body);

        for (key of keys) {
            if (request.body[key] == "") {
                return response.send("Please fill all the fields");
            }
        }
        return;
    },

    create(request, response) {
        return response.render("teachers/create");
    },

    show(request, response) {
        return;
    },

    edit(request, response) {
        return;
    },

    put(request, response) {
        const keys = Object.keys(request.body);

        for (key of keys) {
            if (request.body[key] == "") {
                return response.send("Please fill all the fields");
            }
        }
        return;
    },

    delete(request, response) {
        return;
    },
};
