const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "employees_crud"
});

app.post("/create", (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const years = req.body.years;

    console.log({ name, age, country, position, years });

    db.query('INSERT INTO employees(name, age, country, position, years) VALUES(?, ?, ?, ?, ?)', [name, age, country, position, years],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error registering employee.");
            } else {
                res.send(result);
            }
        }
    );
});

app.get("/employees", (req, res) => {

    db.query('SELECT * FROM employees',
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.put("/update", (req, res) => {
    const { id, name, age, country, position, years } = req.body;

    db.query('UPDATE employees SET name=?, age=?, country=?, position=?, years=? WHERE id=?', 
        [name, age, country, position, years, id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;

    db.query('DELETE FROM employees WHERE id=?', id,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.listen(3001, () => {
console.log("Running on port 3001")
})