module.exports = function(app, con, moment){

    app.get('/getAllEnrollments', function(req, res) {
        var sql = 'SELECT * FROM enrollments';
        con.query(sql, (err, result, fields) => {
            if(err) res.send(err);
            res.send(result);
        });
    });

    app.post('/enrollClass', function(req, res) {
        var accountId = req.body.accountId;
        var classId = req.body.classId;
        var sql = 'INSERT INTO enrollments (accountId, classId) VALUES (\'' + accountId + '\', \'' + classId + '\')';
        con.query(sql, (err, result) => {
            if(err) res.send(err);
            res.send(result);
        });
    });

    app.post('/dropClass', function(req, res) {
        var enrollmentId = req.body.enrollmentId;
        var sql = 'DELETE FROM enrollments WHERE id = ' + enrollmentId;
        con.query(sql, (err, result) => {
            if(err) res.send(err);
            res.send(result);
        });
    });

    app.get('/getAccountEnrollment/:accountId', function(req, res) {
        var accountId = req.params.accountId;

        var sql = 'SELECT * FROM enrollments WHERE accountId = ' + accountId;
        con.query(sql, (err, result) => {
            if(err) res.send(err);
            res.send(result);
        });
    });

    app.get('/getAccountEnrollmentDetailed/:accountId', function(req, res) {
        var accountId = req.params.accountId;

        var sql = 'SELECT enrollment.id as id, class.id as classId, accountId, classId, name, courseName, firstName, lastName, courseId FROM enrollments as enrollment INNER JOIN classes as class ON enrollment.classId = class.id INNER JOIN professors as professor on class.professorId = professor.id WHERE accountId = ' + accountId;
        con.query(sql, (err, result) => {
            if(err) res.send(err);
            res.send(result);
        });
    });


}