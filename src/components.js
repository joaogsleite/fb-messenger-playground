const {
  SERVER_URL,
} = process.env;

module.exports.cardList = () => ({
  "attachment":{
    "type":"template",
    "payload":{
      "template_type":"generic",
      "elements":[
        {
          "title": "Card 1",
          "image_url":"https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/golden-retriever-dog-royalty-free-image-505534037-1565105327.jpg",
          "subtitle":"Example text for card 1",
          "buttons":[
            {
              "type":"postback",
              "title":"Select card 1",
              "payload":"DEVELOPER_DEFINED_PAYLOAD1"
            }              
          ]      
        },
        {
          "title":"Card 2",
          "image_url":"https://icatcare.org/app/uploads/2018/06/Layer-1704-1920x840.jpg",
          "subtitle":"Example text for card 2",
          "buttons":[
            {
              "type":"postback",
              "title":"Select card 2",
              "payload":"DEVELOPER_DEFINED_PAYLOAD2"
            }              
          ]      
        },
        {
          "title":"Card 2",
          "image_url":"https://images.pexels.com/photos/1661179/pexels-photo-1661179.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
          "subtitle":"Example text for card 2",
          "buttons":[
            {
              "type":"postback",
              "title":"Select card 3",
              "payload":"DEVELOPER_DEFINED_PAYLOAD2"
            }              
          ]      
        },
      ]
    }
  }
})

module.exports.quickReplies = () => ({
  "text": "Pick a color:",
  "quick_replies":[
    {
      "content_type":"text",
      "title":"Red",
      "payload":"DEFINED_PAYLOAD1",
    },{
      "content_type":"text",
      "title":"Green",
      "payload":"DEFINED_PAYLOAD2",
    },
    {
      "content_type":"text",
      "title":"Blue",
      "payload":"DEFINED_PAYLOAD3",
    },
    {
      "content_type":"text",
      "title":"Yellow",
      "payload":"DEFINED_PAYLOAD4",
    },
    {
      "content_type":"text",
      "title":"Pink",
      "payload":"DEFINED_PAYLOAD5",
    },{
      "content_type":"text",
      "title":"Brown",
      "payload":"DEFINED_PAYLOAD6",
    },
    {
      "content_type":"text",
      "title":"Grey",
      "payload":"DEFINED_PAYLOAD7",
    },
    {
      "content_type":"text",
      "title":"Purple",
      "payload":"DEFINED_PAYLOAD8",
    },
    {
      "content_type":"text",
      "title":"Black",
      "payload":"DEFINED_PAYLOAD9",
    },{
      "content_type":"text",
      "title":"White",
      "payload":"DEFINED_PAYLOAD10",
    },
  ]
})

module.exports.actionButtons = () => ({
  "attachment":{
    "type":"template",
    "payload":{
      "template_type":"button",
      "text":"What do you want to do next?",
      "buttons":[
        {
          "type":"web_url",
          "url":"https://github.com",
          "title":"Action 1"
        },{
          "type":"postback",
          "title":"Action 2",
          "payload":"DEVELOPER_DEFINED_PAYLOAD2"
        },{
          "type":"postback",
          "title":"Action 3",
          "payload":"DEVELOPER_DEFINED_PAYLOAD3"
        },
      ]
    }
  }
})

module.exports.multiselectCard = () => ({
  "attachment":{
    "type":"template",
    "payload":{
      "template_type":"generic",
      "elements":[
         {
          "title":"Multi-select card",
          "image_url":"https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/golden-retriever-dog-royalty-free-image-505534037-1565105327.jpg",
          "subtitle":"Example text for multi-select card",
          "buttons":[
            {
              "type":"web_url",
              "url":"https://github.com",
              "title":"Action 1"
            },{
              "type":"postback",
              "title":"Action 2",
              "payload":"DEVELOPER_DEFINED_PAYLOAD2"
            },{
              "type":"postback",
              "title":"Action 3",
              "payload":"DEVELOPER_DEFINED_PAYLOAD3"
            },
          ]      
        }
      ]
    }
  }
})

module.exports.confirmCard = () => ({
  "attachment": {
    "type": "template",
    "payload": {
      "template_type": "generic",
      "elements": [{
        "title": "Do you want to open webview?",
        "subtitle": "Tap a button to answer.",
        "image_url": "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/golden-retriever-dog-royalty-free-image-505534037-1565105327.jpg",
        "buttons": [
          {
            "type": "web_url",
            "title": "Yes!",
            "url": SERVER_URL + '/webview',
            "payload": "yes",
            "webview_height_ratio": "compact",
            "messenger_extensions": true,
          },
          {
            "type": "postback",
            "title": "No!",
            "payload": "no",
          }
        ],
      }]
    }
  }
})