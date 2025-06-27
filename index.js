const express = require("express");
const fs = require("fs");
app = express();
const axios = require("axios");

//app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs')
const sites = ["https://quickzip.onrender.com/"];

const utcNow = new Date();

// Add 5 hours and 30 minutes manually (for IST)
const newHour = utcNow.getUTCHours() + 5;
const newMinute = utcNow.getUTCMinutes() + 30;

// Handle minute overflow
let istHour = newHour;
let istMinute = newMinute;
if (istMinute >= 60) {
  istMinute -= 60;
  istHour += 1;
}

// Optional: handle 24-hour overflow
if (istHour >= 24) {
  istHour -= 24;
}
/*
function checkup() {
  // Ping every 4 minutes (less than Glitch's 5-minute sleep)
  setInterval(() => {
    sites.forEach((site) => {
      axios
        .get(site)

        .catch((err) => console.log(`❌ Error pinging ${site}:`, err.message));
    });
  }, 240000); // every 4 minutes
}

// Call checkup only if IST hour is between 8 and 20
if (istHour >= 9 && istHour < 19) {
  checkup();
}
*/
// Ping every 4 minutes (less than Glitch's 5-minute sleep)
setInterval(() => {
  sites.forEach((site) => {
    axios
      .get(site)

      .catch((err) => console.log(`❌ Error pinging ${site}:`, err.message));
  });
}, 40000); // every 4 minutes

app.get('/',(req,res)=>{
    res.render('index');
})
app.listen(process.env.PORT || 3000)
