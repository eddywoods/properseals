var kannel = require('kannel'),
        app = new kannel.smsbox("kannel/kannel.conf?"+
        	"host=$..bearerbox-host&"+
        	"port=$..smsbox-port&"+
        	"id=$.smsbox[-1:].smsbox-id&"+
        	"frequence=$.smsbox[-1:].frequence-time"
        );
    app.on('connect',function(){
        console.log("hello box is connected to "+app.conf["host"]+":"+app.conf['port']);
    });
    app.on("sms",function(data){
        console.log("Recive SMS ",
            " [FROM:",data.sender.toString(),
            "][TO:",data.receiver.toString(),
            "][MSG :",data.msgdata.toString(),
        "]");
        app.sendSMS({
          sender: data.receiver,
          receiver: data.sender,
          msgdata: 'Hello', // string or buffer
          id : data.id
        });
        app.sendUCS2SMS({
          sender: data.receiver,
          receiver: data.sender,
          msgdata: 'Bonjour, Hi, Hello, // UCS2 text
          id : data.id
        })
    });
    app.connect();