module.exports = function(app, con, io, moment){
    
    app.get('/getAllMessages', function(req, res) {
        var sql = 'SELECT * FROM message';
        con.query(sql, (err, result, fields) => {
            if(err) res.send(err);
            res.send(result);
        });
    });

    //TODO
    app.get('/deleteMessage/:messageId', function(req, res) {
        var messageId = req.params.messageId;
        var sql = 'DELETE FROM message WHERE id = ' + messageId;
        con.query(sql, (err, result, fields) => {
            if(err) res.send(err);
            res.send(result);
        });
    });

    io.on('connection', socket => {
        socket.on('sendMessage', message => {
            const { messageText, accountId, firstName, lastName } = message;
            const messageDate = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
            var sql = 'INSERT INTO message (messageText, messageDate, accountId, firstName, lastName) VALUES (\'' + messageText + '\', \'' + messageDate + '\', \'' + accountId + '\', \'' + firstName + '\', \'' + lastName + '\')';
            con.query(sql, (err, result) => {
                if(err) console.log(err);
                message.messageDate = messageDate;
                message.id = result.insertId;
                const sendMessage = Object.assign({}, {socketId: socket.id, message});
                io.sockets.emit('sendMessage', sendMessage);
            });
        });
    });
}