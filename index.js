// index.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
    res.json({greeting: 'hello API'});
});

app.get("/api/:date?", (req, res) => {
    try {
        const date = req.params.date ? req.params.date : Date.now();
        const isInputUnixType = Number(date)
        const isInputUtcType = new Date(date);
        if (isInputUnixType) {
            res.json({unix: +date, utc: new Date(+date).toUTCString()})
            return
        }
        if (isInputUtcType && isInputUtcType.toString() !== "Invalid Date") {
            const utc = new Date(req.params.date).toUTCString();
            const unix = new Date(req.params.date).getTime()
            res.json({unix: +unix, utc})
        } else {
            res.json({error: "Invalid Date"})
        }
    } catch (e) {
        console.log(e)
        res.json({error: 'Invalid Date'})
    }
})

// listen for requests :)
// process.env.PORT
// listener.address().port
const listener = app.listen(3000, function () {
    console.log('Your app is listening on port ' + 3000);
});
