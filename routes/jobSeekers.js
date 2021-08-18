const express = require('express');
const path = require('path');
const multer = require('multer');
const jobSeekers = express.Router();
let db = require('../database/db');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '_';
        cb(null, file.fieldname + '_' + uniqueSuffix + path.basename(file.originalname, path.extname(file.originalname)) + path.extname(file.originalname));
    },
});
let upload = multer({ storage: storage });
var cpUpload = upload.fields([
    { name: 'userImage', maxCount: 1 },
    { name: 'resume', maxCount: 1 },
]);
// get all jobSeekers data also with limit
// default limit is 10
jobSeekers.get('/', (req, res) => {
    let { limit } = req.query;
    limit = !limit ? 10 : parseInt(limit);
    let query = 'select * from jobSeekers limit ?;';
    db.query(query, [limit], (err, rows) => {
        if (err) return res.json({ status: false, message: 'Something went wrong ...' });
        res.json({ status: true, data: rows });
    });
});
// get jobSeeker by id
jobSeekers.get('/:jobSeekerId', (req, res) => {
    let query = 'select * from jobSeekers j join users u on j.userId=u.id where u.id = ?;';
    db.query(query, [req.params.jobSeekerId], (err, rows) => {
        if (err) return res.json({ status: false, message: 'Something went wrong ...' });
        res.json({ status: true, data: rows[0] });
    });
});
// add jobSeeker
jobSeekers.post('/', cpUpload, (req, res) => {
    let data = {
        photo: '/uploads/' + req.files['userImage'][0].filename,
        address: req.body.location,
        userRole: req.body.role,
        experience: req.body.exp,
        bio: req.body.bio,
        skills: req.body.skills,
        userResume: '/uploads/' + req.files['resume'][0].filename,
        highestQualifiaction: req.body.highestQualification,
        phone: req.body.phoneNumber,
        website: req.body.website,
        userId: req.body.userId,
    };
    let query = 'insert into jobSeekers set ?';
    db.query(query, data, (err, results, rows) => {
        if (err) return res.json({ status: false, message: 'Something went wrong ...' });
        res.json({ status: true, message: 'Successfully added jobSeeker.', results: results });
    });
});
// update jobSeeker with id
jobSeekers.patch('/:jobSeekerId', cpUpload, (req, res) => {
    if (req.files['userImage'] == undefined || req.files['resume'] == undefined) {
        data = req.body;
    } else {
        data = {
            photo: '/uploads/' + req.files['userImage'][0].filename,
            userResume: '/uploads/' + req.files['resume'][0].filename,
            address: req.body.address,
            bio: req.body.bio,
            experience: req.body.experience,
            userRole: req.body.userRole,
            skills: req.body.skills,
        };
    }
    let query = 'update jobSeekers set ? where userId=?';
    db.query(query, [data, req.params.jobSeekerId], (err, rows) => {
        if (err) return res.json({ status: false, message: 'Something went wrong ...' });
        res.json({ status: true, message: 'Successfully updated jobSeeker with id :' + req.params.jobSeekerId });
    });
});
// delete jobSeeker with id
jobSeekers.delete('/:jobSeekerId', (req, res) => {
    let query = 'delete from jobSeekers where id=?';
    db.query(query, req.params.jobSeekerId, (err, rows) => {
        if (err) return res.json({ status: false, message: 'Something went wrong ...' });
        res.json({ status: true, message: 'Successfully deleted jobSeeker with id :' + req.params.jobSeekerId });
    });
});
module.exports = jobSeekers;
