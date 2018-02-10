module.exports = function(app, con, moment){

    app.get('/getAllEnrollments', function(req, res) {
        var sql = 'SELECT * FROM enrollments';
        con.query(sql, (err, result, fields) => {
            if(err) res.send(err);
            res.send(result);
        });
    });

    app.post('/registerClass', function(req, res) {
        var studentId = req.body.studentId;
        var classId = req.body.classId;
        var sql = 'INSERT INTO enrollments (studentId, classId) VALUES (\'' + studentId + '\', \'' + classId + '\')';
        con.query(sql, (err, result) => {
            if(err) res.send(err);
            res.send(result);
        });
    });

    app.post('/dropClass', function(req, res) {
        var studentId = req.body.studentId;
    
        var sql = 'DELETE FROM enrollments WHERE id = ' + studentId;
        con.query(sql, (err, result) => {
            if(err) res.send(err);
            res.send(result);
        });
    });



}