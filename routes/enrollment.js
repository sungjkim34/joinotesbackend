module.exports = function(app, con, moment){

    app.get('/getAllEnrollments', function(req, res) {
        var sql = 'SELECT * FROM enrollments';
        con.query(sql, (err, result, fields) => {
            if(err) res.send(err);
            res.send(result);
        });
    });

    app.post('/enrollClass', function(req, res) {
        var studentId = req.body.studentId;
        var classId = req.body.classId;
        var sql = 'INSERT INTO enrollments (studentId, classId) VALUES (\'' + studentId + '\', \'' + classId + '\')';
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

    app.get('/getStudentEnrollment/:studentId', function(req, res) {
        var studentId = req.params.studentId;

        var sql = 'SELECT * FROM enrollments WHERE studentId = ' + studentId;
        con.query(sql, (err, result) => {
            if(err) res.send(err);
            res.send(result);
        });
    });

    app.get('/getStudentEnrollmentDetailed/:studentId', function(req, res) {
        var studentId = req.params.studentId;

        var sql = 'SELECT enrollment.id as enrollmentId, class.id as classId, studentId, classId, name, courseName, firstName, lastName, courseId FROM enrollments as enrollment INNER JOIN classes as class ON enrollment.classId = class.id INNER JOIN professors as professor on class.professorId = professor.id WHERE studentId = ' + studentId;
        con.query(sql, (err, result) => {
            if(err) res.send(err);
            res.send(result);
        });
    });


}