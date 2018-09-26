const env = require('dotenv').load();

//send message 
function send(telegram,id, data) {
    telegram.sendMessage(id, data)
};

//replacement function
function replacement(message, data) {
    //replacement value 
    const rep = [{
        "name": "?name",
        "value": message.from.username
    }, {
        "name": "?firstname",
        "value": message.from.first_name
    }, {
        "name": "?lastname",
        "value": message.from.last_name
    }, {
        "name": "?botname",
        "value": process.env.BOTNAME
    }];


    var response;
    for (var i = 0; i < rep.length; i++) {
        if (data.indexOf(rep[i].name) >= 0) {
            response = data.split(rep[i].name).join(rep[i].value);
            return response;
        } else {
            response = data;
        }
    }
    return response;
}

module.exports = {
    replacement: replacement,
    send: send
}