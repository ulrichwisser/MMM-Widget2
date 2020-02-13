const bodyParser = require("body-parser")
const fs = require('fs')
var path = require('path')

var NodeHelper = require("node_helper")

module.exports = NodeHelper.create({
  start: function() {
    this.config = null
    this.html = null
  },

  socketNotificationReceived: function(noti, payload) {
    var html = (str) => {
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
    if (noti == "INIT") {
      this.config = payload
      this.html = html(this.config.code)
      if (this.config.file) {
        var file = path.resolve(__dirname, this.config.file)
        if (fs.existsSync(file)) {
          fs.readFile(file, (err, data)=>{
            if (err) {
              console.log("[WIDGET2] File read error:", file)
              this.html = this.config.code
            } else {
              this.html = (this.config.fullHTMLfile) ? data : html(data)
            }
          })
        }
      }
      console.log(">", this.html)
      this.webserver()
    }
  },

  webserver: function() {
    var html = this.html
    var uri = `/widget2/` + encodeURI(this.config.uid)
    console.log(uri)
    this.expressApp.use(bodyParser.json())
		this.expressApp.use(bodyParser.urlencoded({extended: true}))
    this.expressApp.get(uri, (req, res) => {
      res.status(200).send(this.html)
    })
    this.sendSocketNotification("READY")
  }
})
