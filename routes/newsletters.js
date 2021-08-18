const express = require('express');
const newsletterSubscriptions = express.Router();
let db = require('../database/db');

newsletterSubscriptions.get('/', (req, res) => {
    let { limit } = req.query;
    let query;
    if (limit) {
        limit = parseInt(limit);
        query = 'select * from newsletterSubscriptions order by appliedOn desc limit ?;';
    } else {
        query = 'select * from newsletterSubscriptions order by appliedOn desc ';
    }
    db.query(query, [limit], (err, rows) => {
        if (err) return res.json({ status: false, message: 'Something went wrong ...' });
        res.json({ status: true, data: rows });
    });
});
// get subscription by id
newsletterSubscriptions.get('/:subscriptionId', (req, res) => {
    let query = 'select * from newsletterSubscriptions where id = ?;';
    db.query(query, [req.params.subscriptionId], (err, rows) => {
        if (err) return res.json({ status: false, message: 'Something went wrong ...' });
        res.json({ status: true, data: rows[0] });
    });
});
// add subscription
newsletterSubscriptions.post('/', (req, res) => {
    let query = 'insert into newsletterSubscriptions set ?';
    db.query(query, req.body, (err, rows) => {
        if (err) return res.json({ status: false, message: 'Something went wrong ...' });
        res.json({ status: true, message: 'Successfully added subscription.' });
    });
});
// update subscription with id
newsletterSubscriptions.patch('/:subscriptionId', (req, res) => {
    let query = 'update newsletterSubscriptions set ? where id=?';
    db.query(query, [req.body, req.params.subscriptionId], (err, rows) => {
        if (err) return res.json({ status: false, message: 'Something went wrong ...' });
        res.json({ status: true, message: 'Successfully updated subscription with id :' + req.params.subscriptionId });
    });
});
// delete job wit id
newsletterSubscriptions.delete('/:subscriptionId', (req, res) => {
    let query = 'delete from newsletterSubscriptions where id=?';
    db.query(query, req.params.subscriptionId, (err, rows) => {
        if (err) return res.json({ status: false, message: 'Something went wrong ...' });
        res.json({ status: true, message: 'Successfully deleted subscription with id :' + req.params.subscriptionId });
    });
});
module.exports = newsletterSubscriptions;
