// module.exports = function(app, con){
//     app.get('/getAllStudents', function(req, res) {
//         var sql = 'SELECT * FROM students';
//         con.query(sql, (err, result, fields) => {
//             if(err) res.send(err);
//             res.send(result);
//         });
//     });
    
//     app.get('/getStudent/:studentId', function(req, res) {
//         var studentId = req.params.studentId;
//         var sql = 'SELECT * FROM students WHERE id = ' + studentId;
//         con.query(sql, (err, result, fields) => {
//             if(err) res.send(err);
//             res.send(result.length ? result[0] : result);
//         });
//     });
    
//     app.post('/addStudent', function(req, res) {
//         var student = {
//             firstName: req.body.firstName.charAt(0).toUpperCase() + req.body.firstName.slice(1),
//             lastName: req.body.lastName.charAt(0).toUpperCase() + req.body.lastName.slice(1),
//             dob: req.body.dob,
//             major: req.body.major,
//             accountId: req.body.accountId
//         };
//         var sql = 'INSERT INTO students (firstName, lastName, dob, major, accountId) VALUES (\'' + student.firstName + '\', \'' + student.lastName + '\', \'' + student.dob + '\', \'' + student.major + '\', \'' + student.accountId + '\')';
//         con.query(sql, (err, result) => {
//             if(err) res.send(err);
//             res.send(result);
//         });
//     });

//     app.post('/deleteStudent', function(req, res) {
//         var studentId = req.body.studentId;
//         // var sql = 'DELTE student, account FROM accounts account JOIN students student on account.studentId = student.id WHERE student.studentId = studentId';
//         var sql = 'DELETE FROM students WHERE id = ' + studentId;
//         con.query(sql, (err, result) => {
//             // TODO: JOIN SQL QUERIES INTO ONE
//             var sql2 = 'DELETE FROM accounts WHERE studentId = ' + studentId + ' AND accountType = \'student\'';
//             con.query(sql2, (err, result) => {
//                 if(err) res.send(err);
//                 res.send(result);
//             });
//             // if(err) res.send(err);
//             // res.send(result);
//         });
//     });

// }