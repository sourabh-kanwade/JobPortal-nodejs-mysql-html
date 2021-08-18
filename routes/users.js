const express = require('express');
const path = require('path');
const multer = require('multer');
const users = express.Router();
let db = require('../database/db');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '_';
        cb(null, file.fieldname + '_' + uniqueSuffix + path.extname(file.originalname));
    },
});
let upload = multer({ storage: storage });

users.get('/', (req, res) => {
    console.log(__dirname);
    let query = 'select * from users';
    db.query(query, (err, rows) => {
        if (err) return res.json({ status: false, message: 'Something went wrong ...' });
        res.json({ status: true, data: rows });
    });
});
// get user by id
users.get('/:userId', (req, res) => {
    let query = 'select * from users where id = ?;';
    db.query(query, [req.params.userId], (err, rows) => {
        if (err) return res.json({ status: false, message: 'Something went wrong ...' });
        res.json({ status: true, data: rows[0] });
    });
});
// add user
users.post('/', upload.single('photo'), (req, res) => {
    let data;
    if (req.file == undefined) {
        data = {
            full_name: req.body.full_name,
            email: req.body.email,
            userPassword: req.body.userPassword,
            isJobProvider: req.body.isJobProvider,
        };
    } else {
        data = {
            full_name: req.body.full_name,
            photo: '/uploads/' + req.file.filename,
            email: req.body.email,
            userPassword: req.body.userPassword,
            isJobProvider: req.body.isJobProvider,
        };
    }
    let query = 'insert into users set ?';
    db.query(query, data, (err, results, rows) => {
        if (err) {
            console.log(err);
            return res.json({ status: false, message: 'Something went wrong ...' });
        }
        res.json({ status: true, message: 'Successfully added user.', userId: results.insertId });
    });
});
// update user with id
users.patch('/:userId', upload.single('photo'), (req, res) => {
    let data;
    if (req.file) {
        data = {
            photo: '/uploads/' + req.file.filename,
        };
    } else {
        data = req.body;
    }

    let query = 'update users set ? where id=?';
    db.query(query, [data, req.params.userId], (err, rows) => {
        if (err) return res.json({ status: false, message: 'Something went wrong ...' });
        res.json({ status: true, message: 'Successfully updated user with id :' + req.params.userId });
    });
});
// delete job with id
users.delete('/:userId', (req, res) => {
    let query = 'delete from users where id=?';
    db.query(query, req.params.userId, (err, rows) => {
        if (err) return res.json({ status: false, message: 'Something went wrong ...' });
        res.json({ status: true, message: 'Successfully deleted user with id :' + req.params.userId });
    });
});
users.post('/login', (req, res) => {
    let query = 'select * from users where email= ?';
    db.query(query, req.body.email, (err, rows) => {
        if (err) return res.json({ status: false, message: 'Something went wrong ...' });
        else if (rows.length == 0) res.json({ status: false, message: "Couldn't find user" });
        else res.json({ status: true, data: rows[0] });
    });
});
module.exports = users;
