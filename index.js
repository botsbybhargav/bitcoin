const btcUtil = require('./util/btc-util');

const BLOCKCHAIN_INFO = "https://blockchain.info";

function MessageHandler(context, event) {
    var message = event.message;
    if (message === "startchattingevent" || message === "botmappedevent") {
        context.sendResponse("Welcome to Bitcoin bot.");
    } else
    if (btcUtil.isBitcoinAddress(message)) {
        context.simplehttp.makeGet(
            BLOCKCHAIN_INFO + "/rawaddr/" + message + "?limit=0", null,
            function(context, event) {
                var response = JSON.parse(event.getresp);

                var respMsg = [];
                respMsg.push("Total Received: " + btcUtil.SATOSHItoBTC(response.total_received) + " BTC");
                respMsg.push("Total Sent: " + btcUtil.SATOSHItoBTC(response.total_sent) + " BTC");
                respMsg.push("Final Balance: " + btcUtil.SATOSHItoBTC(response.final_balance) + " BTC");

                context.sendResponse(respMsg.join("\n"));
            });
    } else {
        context.sendResponse("Not a valid bitcoin address");
    }
}

function EventHandler(context, event) {
    context.simpledb.roomleveldata = {};
    MessageHandler(context, event);
}

exports.onMessage = MessageHandler;
exports.onEvent = EventHandler;