module.exports = function(app, con, moment){

    app.post('/addNote', function(req, res) {
        var note = {
            topicName: req.body.topicName,
            accountId: req.body.accountId,
            date: moment(req.body.date).format('YYYY-MM-DD HH:mm:ss'),
            classId: req.body.classId,
        };
        var sql = 'INSERT INTO notes (topicName, accountId, date, classId) VALUES (\'' + note.topicName + '\', \'' + note.accountId + '\', \'' + note.date + '\', \'' + note.classId + '\')';
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