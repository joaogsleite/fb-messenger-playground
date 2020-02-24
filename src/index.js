require('dotenv').config();
const express = require('express');
const server = express().use(require('body-parser').json());
const { cardList, confirmCard, multiselectCard, actionButtons, quickReplies } = require('./components');
const { sendAPI, profileAPI } = require('./facebook');
const path = require('path');

const {
  VERIFY_TOKEN,
  SERVER_URL,
} = process.env;

function setConfig() {
  profileAPI({
    "setting_type" : "domain_whitelisting",
    "whitelisted_domains" : [SERVER_URL+'/webview'],
    "domain_action_type": "add",
  });
}
setConfig();

// Serve the options path and set required headers
server.get('/webview', (req, res, next) => {
  let referer = req.get('Referer');
  if (referer) {
    if (referer.indexOf('www.messenger.com') >= 0) {
        res.setHeader('X-Frame-Options', 'ALLOW-FROM https://www.messenger.com/');
    } else if (referer.indexOf('www.facebook.com') >= 0) {
        res.setHeader('X-Frame-Options', 'ALLOW-FROM https://www.facebook.com/');
    }
    res.sendFile('webview.html', {root: path.join(__dirname, '..', 'public')});
  }
});

server.get("/webhook", (req, res) => {
  // Parse the query params
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
    // Checks the mode and token sent is correct
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      // Responds with the challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
});

server.post('/webhook', (req, res) => {  
  console.log('POST /webhook');
  // Parse the request body from the POST
  let body = req.body;

  // Check the webhook event is from a Page subscription
  if (body.object === 'page') {
    body.entry.forEach(function(entry) {

      // Gets the body of the webhook event
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);

      // Get the sender PSID
      let sender_psid = webhook_event.sender.id;
      console.log('Sender ID: ' + sender_psid);

      // Check if the event is a message or postback and
      // pass the event to the appropriate handler function
      if (webhook_event.message) {
        handleMessage(sender_psid, webhook_event.message);        
      } else if (webhook_event.postback) {
        handlePostback(sender_psid, webhook_event.postback);
      }
    });
    // Return a '200 OK' response to all events
    res.status(200).send('EVENT_RECEIVED');
  } else {
    // Return a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
});

server.listen(3000, () => {
  console.log('Server listenning...');
});

function handleMessage(sender_psid, received_message) {
  let response;
  
  // Checks if the message contains text
  if (received_message.text) {    
    const msg = received_message.text;
    // Create the payload for a basic text message, which
    // will be added to the body of our request to the Send API
    if (msg.includes('multiselect')) {
      response = multiselectCard();
    } else if (msg.includes('quickreplies')) {
      response = quickReplies();
    } else if (msg.includes('actions')) {
      response = actionButtons();
    } else if (msg.includes('cardlist')) {
      response = cardList();
    } else if (msg.includes('confirm')) {
      response = confirmCard();
    } else {
      response = {
        "text": `You sent the message: "${received_message.text}".`,
      };
    }
  } else {
    response = {
      "text": "You didn't send any text message.",
    };
  }
  
  // Send the response message
  sendAPI(sender_psid, response);    
}

function handlePostback(sender_psid, received_postback) {
  console.log('ok')
   let response;
  // Get the payload for the postback
  let payload = received_postback.payload;

  // Set the response based on the postback payload
  if (payload === 'yes') {
    response = { "text": "Thanks!" }
  } else if (payload === 'no') {
    response = { "text": "Oops, try sending another image." }
  }
  // Send the message to acknowledge the postback
  sendAPI(sender_psid, response);
}
