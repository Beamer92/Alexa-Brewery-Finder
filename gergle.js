const keysobj = require('./keys/keys.js')
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
const fs = require('fs')
const path = require('path')

//console.log(keysobj)
//node gergle.js
function makeplacecall() {
  let placesKey = keysobj.placekey

  //loading Rainier Beach Community Center as Lat/Long for now
  //obfuscate my address coordinates and export to use later
  let location = '47.5231662,-122.2745163'

  //radius is in meters, 16100 is about 10 miles
  let radius = '16100'
  let keyword = 'brewery'
  let type = 'bar'

  const https = new XMLHttpRequest()
  //const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=${placesKey}`

  const myurl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&keyword=${keyword}&type=${type}&key=${placesKey}`

  https.open('get', myurl)
  https.send()

  https.onreadystatechange=(e)=> {
    fs.writeFileSync(path.resolve(__dirname) + '/keys/textdata.json', https.responseText, { flag: 'w' })
    //console.log(https.responseText)
  }
}

makeplacecall()
