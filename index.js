const express = require('express')
// const bodyParser = require('body-parser');
const fetch = require('node-fetch')
const multer = require('multer');

const app = express()
const PORT = 3000

const upload = multer({ dest: '/tmp/' });

// app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

app.post('/plexwebhook',  upload.single('thumb'), (req, res, next) => {
  var payload = JSON.parse(req.body.payload);
  console.log('Got webhook for', payload.event);
  // console.log(payload);

  if (payload.event == 'media.play' || payload.Player.title == '55" TCL Roku TV') {
    console.log('Media play event from the TV. Turning off the living room and den lights.')
  }

  res.status(200).end();
})