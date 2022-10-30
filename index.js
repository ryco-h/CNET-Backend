const express = require('express')
const app = express()
const cors = require('cors');
const port = 5000
require('dotenv/config')

const corsOption = {
   origin: '*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200
}

app.use(cors(corsOption))

app.use(function(req, res, next){
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "x-access-token");

   next();
});

// app.use(cors(corsOption));
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const SteamDBRoute = require('./routes/steamdb-route')
const GameRoute = require('./routes/games-route')
const PublisherRoute = require('./routes/publisher-route')

app.use('/api/v1/steamdb', SteamDBRoute)
app.use('/api/v1/gamedb', GameRoute)
app.use('/api/v1/publisher', PublisherRoute)
app.use('/', (req, res) => {
   var baseUrl = req.protocol + '://' + req.headers.host;
   res.send({
      'Steam Route': baseUrl + '/api/v1/steamdb',
      'Game Route': baseUrl + '/api/v1/gamedb',
      'Publisher Route': baseUrl + '/api/v1/publisher'
   })
})

app.listen(process.env.PORT, ()=> {
   console.log('listening on port ' + process.env.PORT)
})