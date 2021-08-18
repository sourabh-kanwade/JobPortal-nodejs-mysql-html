const express = require('express');
const companies = express.Router();
let db = require('../database/db');

// get all companies data also with query name of company and limit
// companies?companyName=value_&limit=value_

companies.get('/', (req, res) => {
    let { companyName, limit } = req.query;
    let query;
    if (limit) {
        limit = parseInt(limit);
        query = `select c.id,c.companyName,c.website,c.userId,any_value(u.photo) as photo ,sum(if(j.id is not null,1,0)) as jobPosted
        from companies c 
        join users u
        on u.id = c.userId
        left join jobs j
        on  j.companyId = c.id
        group by 1
        limit ?;`;
    } else {
        query = `select c.id,c.companyName,c.website,c.userId,any_value(u.photo) as photo ,sum(if(j.id is not null,1,0)) as jobPosted
        from companies c 
        join users u
        on u.id = c.userId
        left join jobs j
        on  j.companyId = c.id
        group by 1`;
    }
    db.query(query, [limit], (err, rows) => {
        if (err) return res.json({ status: false, message: 'Something went wrong ...' });
        if (companyName) {
            rows = rows.filter((company) => {
                return company.companyName.toLowerCase().includes(companyName.toLocaleLowerCase());
            });
        }
        res.json({ status: true, data: rows });
    });
});
// get company by id
companies.get('/:companyId', (req, res) => {
    let query = `select c.id,c.companyName,c.companyLocation,c.info,c.website,c.userId,any_value(u.photo) as photo,count(1) as jobPosted
    from companies c 
    join users u
    on u.id = c.userId
    join jobs j
    on  j.companyId = c.id
    where c.id = ?
    group by j.companyId 
    ;`;
    let jobsQuery = 'select id,jobRole,jobType,startDate,endDate,companyId from jobs where companyId =?';
    db.query(query, [req.params.companyId], (err, companies) => {
        if (err) {
            return res.json({ status: false, message: 'Something went wrong ...' });
        }
        db.query(jobsQuery, [req.params.companyId], (err, jobs) => {
            if (err) return res.json({ status: false, message: 'Something went wrong ...' });
            res.json({ status: true, company: companies[0], jobsPosted: jobs });
        });
    });
});
// get company with userId
companies.get('/company/:userId', (req, res) => {
    let query = 'select * from companies where userId=' + req.params.userId;
    db.query(query, (err, result, fields) => {
        if (err) return res.json({ status: false, message: 'Something went wrong ...' });
        if (result.length == 0) return res.json({ status: false, message: 'Something went wrong ...' });
        res.json({ status: true, data: result[0] });
    });
});
// add company
companies.post('/', (req, res) => {
    let query = 'insert into companies set ?';
    db.query(query, req.body, (err, rows) => {
        if (err) return res.json({ status: false, message: 'Something went wrong ...' });
        res.json({ status: true, message: 'Successfully added company.' });
    });
});
// update company with id
companies.patch('/:companyId', (req, res) => {
    let query = 'update companies set ? where id=?';
    db.query(query, [req.body, req.params.companyId], (err, rows) => {
        if (err) return res.json({ status: false, message: 'Something went wrong ...' });
        res.json({ status: true, message: 'Successfully updated company with id :' + req.params.companyId });
    });
});
// delete company with id
// 1 to 1 relationship also deletes company.userId = companyId
companies.delete('/:companyId', (req, res) => {
    let query = 'delete from users where id=?';
    db.query(query, req.params.companyId, (err, rows) => {
        if (err) return res.json({ status: false, message: 'Something went wrong ...' });
        res.json({ status: true, message: 'Successfully deleted company with id :' + req.params.companyId });
    });
});
module.exports = companies;
