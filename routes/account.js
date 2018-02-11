module.exports = function(app, con){

    app.post('/authUser', function(req, res) {
        var username = req.body.username;
        var password = req.body.password;
        var sql = 'SELECT id, username, email, firstName, lastName, showEnrolled FROM accounts WHERE username = \'' + username + '\' AND password = \'' + password + '\'';
        con.query(sql, (err, result) => {
            if(err) res.send(err);
            res.send(result && result);
        });
    });
    
    app.post('/registerAccount', function(req, res) {
        var user = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            firstName: req.body.firstName.charAt(0).toUpperCase() + req.body.firstName.slice(1),
            lastName: req.body.lastName.charAt(0).toUpperCase() + req.body.lastName.slice(1)
        }
        var sql = 'INSERT INTO accounts (username, password, email, firstName, lastName, showEnrolled) VALUES (\'' + user.username + '\', \'' + user.password + '\', \'' + user.email + '\', \'' + user.firstName + '\', \'' + user.lastName + '\', ' + 0 + ')';
        con.query(sql, (err, result) => {
            if(err) res.send(err);
            res.send(result);
        });
    });

    app.get('/checkUsername/:username', function(req, res) {
        var username = req.params.username;
        var sql = 'SELECT * FROM accounts WHERE username = \'' + username + '\'';
        con.query(sql, (err, result, fields) => {
            if(err) res.send(err);
            res.send(!!result.length);
        });
    });

    app.post('/deleteAccount', function(req, res) {
        var accountId = req.body.accountId;
        var sql = 'DELETE FROM accounts WHERE id = ' + accountId;
        con.query(sql, (err, result) => {
            if(err) res.send(err);
            res.send(result);
        });
    });

    app.get('/getAllAccounts', function(req, res) {
        var username = req.params.username;
        var sql = 'SELECT * FROM accounts';
        con.query(sql, (err, result, fields) => {
            if(err) res.send(err);
            res.send(result);
        });
    });

    app.get('/getAccount/:accountId', function(req, res){
        var accountId = req.params.accountId;
        var sql = 'SELECT username, email, firstName, lastName, dob, major,  FROM accounts WHERE id = ' + accountId;
    });

    app.get('/getAccountCount', function(req, res) {
        var sql = 'SELECT COUNT(*) FROM accounts';
        con.query(sql, (err, result, fields) => {
            if(err) res.send(err);
            res.send(result);
        });
    });

    app.get('/toggleShowEnroll/:accountId', function(req, res){
        var accountId = req.params.accountId;
        var sql = 'UPDATE accounts SET showEnrolled = !showEnrolled WHERE id = ' + accountId;
        con.query(sql, (err, result, fields) => {
            if(err) res.send(err);
            res.send(result);
        });
    });
}