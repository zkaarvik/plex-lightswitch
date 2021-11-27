const express = require('express')
const fetch = require('node-fetch')
const multer = require('multer');

const app = express()
const PORT = 3000

const upload = multer({ dest: '/tmp/' });

const hueLocalApi = "http://192.168.0.107/api/"
const apiKey = "6IzGK0uoAXNRNTAces76VHl2zzM6ojNpq6OK3NWA"
const groups = "/groups/"
const action = "/action"

const livingRoomGroup = '1'
const denGroup = '5'

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

app.post('/plexwebhook',  upload.single('thumb'), (req, res, next) => {
  var payload = JSON.parse(req.body.payload);
  console.log('Got webhook for', payload.event);

  if (payload.event == 'media.play' && payload.Player.title == '55" TCL Roku TV' && payload.Player.local) {
    console.log('Media play event from the TV. Turning off the living room and den lights.')

    var turnOffLightBody = {
      'on': false
    }

    //Turn off living room lights
    fetch(hueLocalApi + apiKey + groups + livingRoomGroup + action, {
      method: 'put',
      body: JSON.stringify(turnOffLightBody),
      headers: { 'Content-Type': 'application/json' }
    })

    //Turn off den lights
    fetch(hueLocalApi + apiKey + groups + denGroup + action, {
      method: 'put',
      body: JSON.stringify(turnOffLightBody),
      headers: { 'Content-Type': 'application/json' }
    })
  }

  res.status(200).end();
})