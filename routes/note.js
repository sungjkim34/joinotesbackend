module.exports = function(app, con){

    app.post('/addNote', function(req, res) {
        var note = {
            topicName: req.body.topicName,
            studentId: req.body.studentId,
            //const Date = moment().format('L'),
            classId: req.body.classId,
        };
        var sql = 'INSERT INTO notes (topicName, studentId, date,  classId) VALUES (\'' + note.topicName + '\', \'' + note.studentId + '\', \'' + note.date + '\', \'' + note.classId + '\')';
        con.query(sql, (err, result) => {
            if(err) res.send(err);
            res.send(result);
        });
    });

    app.post('/deleteNote', function(req, res) {
        var noteId = req.body.id;
        var sql = 'DELETE FROM notes WHERE id = ' + noteId;
        con.query(sql, (err, result) => {
            if(err) res.send(err);
            res.send(result);
        });
    });

}