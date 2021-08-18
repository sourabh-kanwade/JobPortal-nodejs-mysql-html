const express = require("express");
const admin = express.Router();
let db = require("../database/db");
admin.get("/", (req, res) => {
    let query = "select * from admin";
    db.query(query, (err, rows) => {
        if (err) {
            return res.json({ status: false, message: "Something went wrong ..." });
        }
        res.json({ status: true, data: rows });
    });
});
// get admin by id
admin.get("/:adminId", (req, res) => {
    let query = "select * from admin where adminId = ?;";
    db.query(query, [req.params.adminId], (err, rows) => {
        if (err) return res.json({ status: false, message: "Something went wrong ..." });
        res.json({ status: true, data: rows[0] });
    });
});
// add admin
admin.post("/", (req, res) => {
    let query = "insert into admin set ?";
    db.query(query, req.body, (err, results, rows) => {
        if (err) {
            console.log(err);
            if ((err.code = "ER_DUP_ENTRY")) return res.json({ status: false, message: "User Already Exists" });
            return res.json({ status: false, message: "Something went wrong ..." });
        }
        res.json({ status: true, message: "Successfully added admin.", adminId: results.insertId });
    });
});
admin.patch("/:adminId", (req, res) => {
    let query = "update admin set ? where adminId=?";
    db.query(query, [req.body, req.params.adminId], (err, rows) => {
        if (err) return res.json({ status: false, message: "Something went wrong ..." });
        res.json({ status: true, message: "Successfully updated user with id :" + req.params.adminId });
    });
});
admin.post("/login", (req, res) => {
    console.log("/login");
    let query = "select * from admin where email= ?";
    db.query(query, req.body.email, (err, rows) => {
        if (err) {
            return res.json({ status: false, message: "Something went wrong ..." });
        } else if (rows.length == 0) {
            return res.json({ status: false, data: rows[0], message: "User not found" });
        } else {
            res.json({ status: true, data: rows[0] });
        }
    });
});
module.exports = admin;
