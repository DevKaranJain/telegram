'use strict';
var util = require('util');
//import fetch from 'cross-fetch';

// Deps
const Path = require('path');
const JWT = require(Path.join(__dirname, '..', 'lib', 'jwtDecoder.js'));
var http = require('https');
var request = require('request');
var express     = require('express');
var bodyParser  = require('body-parser');

//var fetch = require("node-fetch");

const { JsonWebTokenError } = require('jsonwebtoken');


exports.logExecuteData = [];

function logData(req) {
    exports.logExecuteData.push({
        body: req.body,
        headers: req.headers,
        trailers: req.trailers,
        method: req.method,
        url: req.url,
        params: req.params,
        query: req.query,
        route: req.route,
        cookies: req.cookies,
        ip: req.ip,
        path: req.path, 
        host: req.host,
        fresh: req.fresh,
        stale: req.stale,
        protocol: req.protocol,
        secure: req.secure,
        originalUrl: req.originalUrl
    });
    console.log("body: " + util.inspect(req.body));
    console.log("headers: " + req.headers);
    console.log("trailers: " + req.trailers);
    console.log("method: " + req.method);
    console.log("url: " + req.url);
    console.log("params: " + util.inspect(req.params));
    console.log("query: " + util.inspect(req.query));
    console.log("route: " + req.route);
    console.log("cookies: " + req.cookies);
    console.log("ip: " + req.ip);
    console.log("path: " + req.path);
    console.log("host: " + req.host);
    console.log("fresh: " + req.fresh);
    console.log("stale: " + req.stale);
    console.log("protocol: " + req.protocol);
    console.log("secure: " + req.secure);
    console.log("originalUrl: " + req.originalUrl);
}

/*
 * POST Handler for / route of Activity (this is the edit route).
 */
exports.edit = function (req, res) {

    console.log("5 -- For Edit");	
    console.log("4");	
    console.log("3");	
    console.log("2");	
    console.log("1");	
    //console.log("Edited: "+req.body.inArguments[0]);    
    
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    console.log("coming in exports of edit");
    logData(req);
    res.send(200, 'Edit');
};

/*
 * POST Handler for /save/ route of Activity.
 */
exports.save = function (req, res) {
    
    console.log("5 -- For Save");	
    console.log("4");	
    console.log("3");	
    console.log("2");	
    console.log("1");	
    //console.log("Saved: "+req.body.inArguments[0]);
    
    // Data from the req and put it in an array accessible to the main app.
  //  console.log( req.body );
    console.log("in the save function ");
    logData(req);
    res.send(200, 'Save');
};

/*
 * POST Handler for /execute/ route of Activity.
 */
exports.execute = function (req, res) {

    console.log("5 -- For Execute");	
    console.log("4");	
    console.log("3");	
    console.log("2");	
    console.log("1");	
      console.log("Executed: "+req.body.inArguments[0]);


    var requestBody = req.body.inArguments[0];
    var uniqueEmail = req.body.keyValue;
    console.log(uniqueEmail);
    const accountSid = requestBody.accountSid;
    const authToken = requestBody.authToken;
    const to = requestBody.to;
    const type = requestBody.messagingService;
    const body = requestBody.body;
    //const txt = requestBody.sele;
        console.log("select option is ---------------------"+type);
      //  console.log('select option is +===='+ requestBody);
    
    console.log('values in body '+ body);
    console.log('values in to -------------- '+to);
    try{
        if(type=="text"){
            const { sendMessageFor } = require('simple-telegram-message')
            const sendMessage = sendMessageFor('2026995123:AAFdSGvRF9wOiQEpZQLqX7QFnG99sIJk8g0',to)
                    //sendMessage(`Hi from bot! and i am hit from journey builder `)
            sendMessage(body)
            .then(console.log)
            .catch(console.err)
        }
        else if(type == "Image"){
            console.log("in the image block");
            let api_url = 'https://api.telegram.org/bot2026995123:AAFdSGvRF9wOiQEpZQLqX7QFnG99sIJk8g0/sendPhoto?';
   
            // Example POST data
                                  let postData = { 
                                              'chat_id':'992164535',
                                                 'photo':'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'};
          
                                  httpPost(api_url, 'json', postData, function (response) {
                                  text("Data returned from API", 20, 100);
          
                                  // text("The ID in the data is: "
                                  //      + response.id, 20, 140);
                                  // text("The Name in the data is: " 
                                  //      + response.name, 20, 160);
                                  // text("The Email in the data is: " 
                                  //      + response.email, 20, 180);
                                  });
                          
          
          
          
          

        }


    }
    catch(e){
        console.log('error '+ e);
    }        
    //this line is responsible for userName is required  error 
    // const client = require('twilio')(accountSid, authToken);
       
    // client.messages 
    //       .create({ 
    //          body: body,
    //          from :'+13203473736',
    //          to: '+91'+to 
    //        }) 
    //        .then(message => console.log(message.sid)) 
    //        .done(); 
    // FOR TESTING
    try{
        console.log('in the testing publish');
        logData(req);
    //res.send(200, 'Publish');
    res.status(200).send('Publish');
    }
    catch(er)
    {
        console.log('coming into err'+ er);
    }

    // Used to decode JWT
    // JWT(req.body, process.env.jwtSecret, (err, decoded) => {

    //     // verification error -> unauthorized request
    //     if (err) {
    //         console.error(err);
    //         return res.status(401).end();
    //     }

    //     if (decoded && decoded.inArguments && decoded.inArguments.length > 0) {
            
    //         // decoded in arguments
    //         var decodedArgs = decoded.inArguments[0];
            
    //         logData(req);
    //         res.send(200, 'Execute');
    //     } else {
    //         console.error('inArguments invalid.');
    //         return res.status(400).end();
    //     }
    // });
};


/*
 * POST Handler for /publish/ route of Activity.
 */
exports.publish = function (req, res) {

    console.log("5 -- For Publish");	
    console.log("4");	
    console.log("3");	
    console.log("2");	
    console.log("1");	
    //console.log("Published: "+req.body.inArguments[0]);        
    
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    try{

    
     logData(req);
    // res.send(200, 'Publish');
    res.status(200).send('Publish');
     console.log("coming to publish");
    }catch(er){
        console.log('error in the publish');
    }
};

/*
 * POST Handler for /validate/ route of Activity.
 */
exports.validate = function (req, res) {

    console.log("5 -- For Validate");	
    console.log("4");	
    console.log("3");	
    console.log("2");	
    console.log("1");	
    //console.log("Validated: "+req.body.inArguments[0]);       
    
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    logData(req);
    //res.send(200, 'Validate');
    res.status(200).send('Validate');
    
};
