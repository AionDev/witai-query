#!/usr/bin/env node

var curl = require('curl');
var print = require('pretty-print');
var program = require('commander');

var tokenStorage = require('user-settings').file('.witAiSettings');

program
    .version('0.1.0')
    .option('-t, --set-access-token <token>', 'You must include a token, take it form wit.ai -> settings panel.')
    .option('-q, --query <text>', 'The text necesary to query wit.ai')
    .parse(process.argv);



if (program.setAccessToken) {
    tokenStorage.set('accessToken', program.setAccessToken);
    console.log("token has been set: ", program.setAccessToken);
}

if (program.query) {

    let token = tokenStorage.get('accessToken');

    if (token && (token !== "")) {
        callWitAiServers(token, program.query);
    } else {
        console.log(`
            error: you are tring to query wit.ai servers without providing an authentication token.
            Please provide your wit.ai token
                You can take it from  wit.ai/yourBotName -> Settings -> API Details -> Server Access Token.
                a token tipically looks like this: 6FEC3OTSSKQSORQEPUIETLRTAUAIHHR

                for setting the token use this command:

                witai --set-access-token 6FEC3OTSSKQSORQEPUIETLRTAUAIHHR           -- replace it with your own token.
            `);
    }

}
if ((typeof program.setAccessToken == "undefined") && (typeof program.query == "undefined")) {
    console.log(`
        error: to run this command you must provide one of the following args:

         --set-access-token 6FEC5OTSSKQSORQEPUJETLUOAUAIHHR                   -- replace this with your own token.

         --query "place your text here"
        `);
}

function callWitAiServers(acessToken, text) {
    const url = "https://api.wit.ai/message?v=20170719"
    params = "&q=" + encodeURIComponent(text);


    curl.get(url + params, {
        'auth': {
            'bearer': acessToken
        }
    }, function(err, response, body) {
        if (err) {
            console.log(err);
        }
        var bodyObj = JSON.parse(body);
        console.log("\n");
        print({
            "messageId": bodyObj.msg_id
        });
        print({
            "textUsed": bodyObj._text
        });

        console.log("\n");
        console.log("  Entities: ");

        print(bodyObj.entities);
    });
}
