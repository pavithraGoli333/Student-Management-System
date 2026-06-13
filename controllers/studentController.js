const db = require("../config/db");

// GET ALL STUDENTS
exports.getStudents = (req, res) => {
    const sql = "SELECT * FROM students";

    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
};

// ADD STUDENT
exports.addStudent = (req, res) => {
    const { name, email, phone, department, year } = req.body;

    const sql =
        "INSERT INTO students (name,email,phone,department,year) VALUES (?,?,?,?,?)";

    db.query(
        sql,
        [name, email, phone, department, year],
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Student Added Successfully"
            });
        }
    );
};