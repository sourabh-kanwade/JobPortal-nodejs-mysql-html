const path = require('path');
const express = require('express');
const app = express();

const cors = require('cors');
app.options('*', cors());
//
app.use(express.json());
app.use(cors({ origin: '*', methods: 'GET,DELETE,PATCH,POST', credentials: true }));
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/api/users', require('./routes/users'));
app.use('/api/jobs', require('./routes/jobs'));
app.use('/api/companies', require('./routes/companies'));
app.use('/api/jobApplications', require('./routes/jobApplications'));
app.use('/api/jobSeekers', require('./routes/jobSeekers'));
app.use('/api/newsletters', require('./routes/newsletters'));
app.use('/api/admin', require('./routes/admin'));

let db = require('./database/db');

app.get('/', (req, res) => {
    let query = 'select * from users;';
    console.log(__dirname);
    db.query(query, (err, rows) => {
        if (err) throw err;
        res.json(rows);
    });
});
app.listen(process.env.PORT || 3200, () => {
    console.log('Server Started on Port http://localhost:3200 ...... ');
});
