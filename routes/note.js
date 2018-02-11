module.exports = function(app, con, moment){

    app.get('/getAllNotes', function(req, res) {
        var sql = 'SELECT id, date, classId, title, accountId FROM notes';
        con.query(sql, (err, result, fields) => {
            if(err) res.send(err);
            res.send(result);
        });
    });

    app.get('/getClassNotes/:classId', function(req, res) {
        var classId = req.params.classId;

        var sql = 'SELECT note.id as id, date, classId, title, accountId, username, firstName, lastName FROM notes as note INNER JOIN accounts as account ON account.id = note.accountId WHERE classId = ' + classId;
        con.query(sql, (err, result, fields) => {
            if(err) res.send(err);
            res.send(result);
        });
    });

    app.get('/getNoteDetail/:noteId', function(req, res) {
        var noteId = req.params.noteId;

        var sql = 'SELECT detail FROM notes WHERE id = ' + noteId;
        con.query(sql, (err, result, fields) => {
            if(err) res.send(err);
            res.send(result);
        });
    });

    app.post('/addNote', function(req, res) {
        var note = {
            title: req.body.note.title,
            accountId: req.body.note.accountId,
            date: moment(req.body.note.date).format('YYYY-MM-DD HH:mm:ss'),
            classId: req.body.note.classId,
            detail: req.body.note.detail
        };
        var sql = 'INSERT INTO notes (topicName, accountId, date, classId, detail) VALUES (\'' + note.title + '\', \'' + note.accountId + '\', \'' + note.date + '\', \'' + note.classId + '\', \'' + note.detail + '\')';
        con.query(sql, (err, result) => {
            if(err) res.send(err);
            res.send(result);
        });
    });

    app.post('/deleteNote', function(req, res) {
        var noteId = req.body.noteId;
        var sql = 'DELETE FROM notes WHERE id = ' + noteId;
        con.query(sql, (err, result) => {
            if(err) res.send(err);
            res.send(result);
        });
    });

}