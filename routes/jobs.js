const express = require('express');
const jobs = express.Router();
let db = require('../database/db');
// get all jobs
jobs.get('/', (req, res) => {
    let { category, limit } = req.query;
    let query;
    if (limit) {
        query = `SELECT j.id,j.jobRole,j.category,j.jobType,j.jobLocation,j.startDate,j.tags,c.companyName,u.photo 
        FROM jobs as j
        JOIN companies as c
        ON j.companyId = c.id
        JOIN users as u 
        ON  c.userId = u.id
        WHERE j.endDate >= CURDATE()
        LIMIT ${limit}`;
    } else {
        query = `SELECT j.id,j.jobRole,j.category,j.jobType,j.jobLocation,j.startDate,j.tags,c.companyName,u.photo 
        FROM jobs as j
        JOIN companies as c
        ON j.companyId = c.id
        JOIN users as u 
        ON  c.userId = u.id 
        WHERE j.endDate >= CURDATE()`;
    }
    db.query(query, (err, rows) => {
        if (err) return res.json({ status: false, message: 'Something went wrong ...' });
        if (category) {
            rows = rows.filter((job) => job.category == category);
        }
        res.json({ status: true, data: rows });
    });
});
//get jobs by companyId
jobs.get('/company/:companyId', (req, res) => {
    let query = 'select id,jobRole,jobLocation,startDate from jobs where companyId=?';
    db.query(query, [req.params.companyId], (err, results) => {
        if (err) return res.json({ status: false, message: 'Something went wrong ...' });
        res.json({ status: true, data: results });
    });
});
// get job by id
jobs.get('/:jobId', (req, res) => {
    let query = `SELECT j.id,j.jobRole,j.category,j.jobType,j.startDate,j.endDate,j.jobLocation,j.roleOverview,j.workingFormat,j.keyPoints,j.tags,c.website,u.photo,c.info
    FROM jobs j
    JOIN companies as c
    ON j.companyId = c.id
    JOIN users as u 
    ON  c.userId = u.id WHERE j.id = ?;`;
    db.query(query, [req.params.jobId], (err, rows) => {
        if (err) return res.json({ status: false, message: 'Something went wrong ...' });
        res.json({ status: true, data: rows });
    });
});
// add job
jobs.post('/', (req, res) => {
    let query = 'insert into jobs set ?';
    db.query(query, req.body, (err, rows) => {
        if (err) return res.json({ status: false, message: 'Something went wrong ...' });
        res.json({ status: true, message: 'Successfully added job.' });
    });
});
// update job with id
jobs.patch('/:jobId', (req, res) => {
    let query = 'update jobs set ? where id=?';
    db.query(query, [req.body, req.params.jobId], (err, rows) => {
        if (err) return res.json({ status: false, message: 'Something went wrong ...' });
        res.json({ status: true, message: 'Successfully updated job with id :' + req.params.jobId });
    });
});
// delete job wit id
jobs.delete('/:jobId', (req, res) => {
    let query = 'delete from jobs where id=?';
    db.query(query, req.params.jobId, (err, rows) => {
        if (err) return res.json({ status: false, message: 'Something went wrong ...' });
        res.json({ status: true, message: 'Successfully deleted job with id :' + req.params.jobId });
    });
});
module.exports = jobs;
