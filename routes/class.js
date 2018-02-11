module.exports = function(app, con){

    app.get('/getAllClasses', function(req, res) {
        var sql = 'SELECT * FROM classes';
        con.query(sql, (err, result, fields) => {
            if(err) res.send(err);
            res.send(result);
        });
    });

    app.get('/getAllClassesDetailed', function(req, res) {
        var sql = 'SELECT * FROM classes as class INNER JOIN professors as professor ON class.professorId = professor.id';
        con.query(sql, (err, result, fields) => {
            if(err) res.send(err);
            res.send(result);
        });
    });

    app.post('/addClass', function(req, res) {
        var classInfo = {
            id: req.body.id,
            name: req.body.name,
            professorId: req.body.professorId
        }
        var sql = 'INSERT INTO classes (id, name, professorId) VALUES (\'' + classInfo.id + '\', \'' + classInfo.name + '\', \'' + classInfo.professorId + '\')';
        con.query(sql, (err, result) => {
            if(err) res.send(err);
            res.send(result);
        });
    });

    app.post('/deleteClass', function(req, res) {
        var classId = req.body.id;
        var sql = 'DELETE FROM classes WHERE id = ' + id;
        con.query(sql, (err, result) => {
            if(err) res.send(err);
            res.send(result);
        });
    });

}