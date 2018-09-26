const env = require('dotenv').load();
const TelegramBot = require('node-telegram-bot-api');
const telegram = new TelegramBot(process.env.TOKEN, {
    polling: true
});
const mysql = require('mysql');
const event = require("./event");
const serve = require("./server");
const con = serve.connection();
const send_data = telegram.on("text", (message) => {
    var request = message.text.toString().toLowerCase();
    if (message.text.toLowerCase().indexOf("/start") === 0) {
        event.send(telegram, message.chat.id, process.env.WELCOMEMSG + " " + message.from.username)
    } else if (message.text.toLowerCase().indexOf("/test") === 0) {
        con.connect(function(err) {
            if (!err) {
                var res = process.env.SERVERCONECTED
            } else {
                var res = process.env.SERVERNOTCONECTED
            }
            event.send(telegram, message.chat.id, res)
        })
    } else if (request.slice(0, 7) == "create[" && request.slice(-1) == "]") {
        var resdata = request.replace(']', "").split("?response=").pop();
        var action = process.env.DEFAULTACTION;
        var reqdata = request.split("create[?request=").pop().replace(",?response=" + resdata + "]", "").toString().split(' ').join('');
        if (resdata.length < 1) {
            event.send(telegram, message.chat.id, process.env.RESERR)
        } else if (reqdata.length < 1) {
            event.send(telegram, message.chat.id, process.env.REQERR)
        } else {
            event.send(telegram, message.chat.id, process.env.CREATECOMAND);
            var sql = 'SELECT * FROM telegram WHERE request = "' + reqdata + '"';
            con.query(sql, function(err, result) {
                if (result.length != 0) {
                    event.send(telegram, message.chat.id, process.env.COMANDCREATEERR)
                } else {
                    var sql = 'INSERT INTO  telegram  (request ,response , action ) VALUES ( "' + reqdata + '","' + resdata + '","' + action + '")';
                    con.query(sql, function(err, result) {
                        if (err) {
                            console.log("err" + err)
                        } else {
                            try {
                                event.send(telegram, message.chat.id, process.env.SUCCESSCREATE + " " + reqdata)
                            } catch (e) {
                                event.send(telegram, message.chat.id, process.env.CANTCREATE + e)
                            }
                        }
                    })
                }
            })
        }
    } else if (request.slice(0, 8) == "destroy[" && request.slice(-1) == "]") {
        var reqdata = request.split("destroy[?where=").join("").replace("]", "");
        console.log(reqdata)
        event.send(telegram, message.chat.id, process.env.DELETING)
        var sql = 'DELETE FROM telegram WHERE request = "' + reqdata + '"';
        con.query(sql, function(err, result) {
            if (err) {
                event.send(telegram, message.chat.id, process.env.CANTDELETE)
            } else {
                event.send(telegram, message.chat.id, process.env.COMAND + reqdata + process.env.WASDELETED)
            }
        })
    } else if (request.slice(0, 7) == "update[" && request.slice(-1) == "]") {
        var action = process.env.DEFAULTACTION;
        var where = request.split(",?where=").pop().replace("]", "").toString();
        var resdata = request.split(",?response=").pop().split(",?where=" + where).join("").replace("]", "").toString();
        var reqdata = request.split("update[?request=").pop().split(",?response=" + resdata).join("").split(",?where=" + where).join("").replace("]", "").toString();
        if (reqdata.length < 1) {
            event.send(telegram, message.chat.id, process.env.RESERR)
        } else if (resdata.length < 1) {
            event.send(telegram, message.chat.id, process.env.RESERR)
        } else if (where.length < 1) {
            event.send(telegram, message.chat.id, process.env.WHEREERR)
        } else {
            console.log(where)
            console.log(reqdata)
            console.log(resdata)
            var sql = 'UPDATE telegram SET request="' + reqdata + '" , response="' + resdata + '" WHERE request = "' + where + '" ';
            con.query(sql, function(err, result) {
                if (err) {
                    event.send(telegram, message.chat.id, process.env.UPDATEERR + err)
                } else {
                    event.send(telegram, message.chat.id, process.env.UPDATED)
                }
            })
        }
    } else if (message.text.toLowerCase().indexOf("/list") === 0 || message.text.toLowerCase().indexOf("list") === 0) {
        var sql = 'SELECT * FROM telegram';
        var data = process.env.LISTCOMMAND + "\n";
        con.query(sql, function(err, result) {
            if (err) {
                event.send(telegram, message.chat.id, process.env.SERVERMAINTENANCE)
            } else {
                for (var i = 0; i < result.length; i++) {
                    var cont = result[i].request;
                    data = data + i + " . " + cont + "\n"
                }
                event.send(telegram, message.chat.id, data)
            }
        })
    } else if (message) {
        var req = message.text.toString().split(' ').join('');
        var sql = 'SELECT * FROM telegram WHERE request = "' + req + '"';
        con.query(sql, function(err, result) {
            if (err) {
                event.send(telegram, message.chat.id, process.env.NOTFOUND + err)
            } else {
                try {
                    event.send(telegram, message.chat.id, event.replacement(message, result[0].response))
                } catch (e) {
                    event.send(telegram, message.chat.id, process.env.NOTFOUND + e)
                }
            }
        })
    }
})