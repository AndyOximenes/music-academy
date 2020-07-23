const { date } = require("../../lib/utils");
const db = require("../config/db");

module.exports = {
    all(callback) {
        db.query(
            `
            SELECT * FROM students ORDER BY name ASC
        `,
            (err, results) => {
                if (err) throw `Database error! ${err}`;

                callback(results.rows);
            }
        );
    },

    create(data, callback) {
        const query = `
            INSERT INTO students (
                avatar_url,
                name,
                email,
                birth,
                instrument,
                hours,
                teacher_id
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `;

        const values = [
            data.avatar_url,
            data.name,
            data.email,
            date(data.birth).iso,
            data.instrument,
            data.hours,
            data.teacher,
        ];

        db.query(query, values, (err, results) => {
            if (err) throw `Database error! ${err}`;

            callback(results.rows[0]);
        });
    },

    find(id, callback) {
        db.query(
            `
            SELECT students.*, teachers.name AS teacher_name
            FROM students
            LEFT JOIN teachers on (students.teacher_id = teachers.id)
            WHERE students.id = $1
        `,
            [id],
            (err, results) => {
                if (err) throw `Database error! ${err}`;

                callback(results.rows[0]);
            }
        );
    },

    findBy(filter, callback) {
        db.query(
            `
            SELECT students.*
            FROM students
            WHERE students.name ILIKE '%${filter}%'
            OR students.instrument ILIKE '%${filter}%'
        `,
            (err, results) => {
                if (err) throw `Database error! ${err}`;

                callback(results.rows);
            }
        );
    },

    update(data, callback) {
        const query = `
            UPDATE students SET
                avatar_url=($1),
                name=($2),
                email=($3),
                birth=($4),
                instrument=($5),
                hours=($6),
                teacher_id=($7)
            WHERE id = $8
        `;

        const values = [
            data.avatar_url,
            data.name,
            data.email,
            date(data.birth).iso,
            data.instrument,
            data.hours,
            data.teacher,
            data.id,
        ];

        db.query(query, values, (err, results) => {
            if (err) throw `Database error! ${err}`;

            callback();
        });
    },

    delete(id, callback) {
        db.query(
            `
            DELETE FROM students
            WHERE id = $1
        `,
            [id],
            (err, results) => {
                if (err) throw `Database Error! ${err}`;

                return callback();
            }
        );
    },

    teacherSelectOptions(callback) {
        db.query(`SELECT name, id FROM teachers`, (err, results) => {
            if (err) throw `Database error! ${err}`;

            callback(results.rows);
        });
    },
};
