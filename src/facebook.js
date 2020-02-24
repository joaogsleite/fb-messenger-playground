const request = require('request');
const { 
  PAGE_ACCESS_TOKEN,
} = process.env;


function sendAPI(sender_psid, response) {
  let body = {
    "recipient": {
      "id": sender_psid
    },
    "message": response,
  };
  return baseAPI('/me/messages', body);
};

function profileAPI(body) {
  return baseAPI('/me/thread_settings', body);
};


function baseAPI(path, body) {
  return request({
    "uri": `https://graph.facebook.com/v2.6${path}`,
    "qs": { "access_token": PAGE_ACCESS_TOKEN },
    "method": "POST",
    "json": body,
  }, (err, res, body) => {
    if (!err) {
      console.log(body);
    } else {
      console.error("Unable to send message:" + err);
    }
  });
};

module.exports = {
  sendAPI,
  profileAPI,
  baseAPI,
};