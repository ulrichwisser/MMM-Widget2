const bodyParser = require("body-parser")
const fs = require('fs')
var path = require('path')

var NodeHelper = require("node_helper")

module.exports = NodeHelper.create({
  start: function() {
    this.clients = new Map()
  },

  socketNotificationReceived: function(noti, payload) {

    if (noti == "INIT") {
      this.clients.set(payload.uid, payload)
      this.webserver(payload.uid)
    }
  },

  webserver: function (uid) {
    const buildHTML = (str) => {
      return `<html>
<head>
<style>
body {padding:0, margin:0}
</style>
</head>
<body>
${str}
</body>
</html>`
    }
    const client = this.clients.get(uid)
    if (!client) return

    let html = ''

    if (client.file) {
      const file = path.resolve(__dirname, client.file)
      if (fs.existsSync(file)) {
        fs.readFile(file, (err, data) => {
          if (err) {
            console.log("[WIDGET2] File read error:", file)
            html = client.code
          } else {
            html = (client.fullHTMLfile) ? data : buildHTML(data)
          }
        })
      }
    } else {
      html = buildHTML(client.code)
    }
    const uri = `/widget2/` + encodeURI(client.uid)
    this.expressApp.use(bodyParser.json())
		this.expressApp.use(bodyParser.urlencoded({extended: true}))
    this.expressApp.get(uri, (req, res) => {
      console.log("[WIDGET2] Request:", uri)
      res.status(200).send(html)
    })
    console.log("[WIDGET2] Ready for serve:", uri)
    this.sendSocketNotification("READY", uid)
  }
})
