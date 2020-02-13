Module.register("MMM-Widget2",{ // When you duplicate this module, just edit here only.
  defaultStyle : {
    width: "100%",
    height: "300px",
    border: "none",
    overflow: "hidden",
    backgroundColor: "inherit",
  },
  defaults: {
    uid: null,
    refreshInterval: 1000*60*60,
    code: "<p>Nothing to Show</p>",
    file: null,
    fullHTMLfile: false,
    iframeStyle: {},
  },

  start: function() {
    this.ready = false
    this.timer = null
    if (this.config.uid === null) this.config.uid = this.identifier
    this.style = Object.assign({}, this.defaultStyle, this.config.iframeStyle)
    this.sendSocketNotification("INIT", this.config)
  },

  notificationReceived: function(noti, payload, sender) {
    if (noti == "WIDGET_REFRESH") {
      if (!payload || payload == this.config.uid) {
        this.schedule()
      }
    }
  },

  socketNotificationReceived: function(noti, payload) {
    if (noti == "READY") {
      console.log("[WIDGET2] Ready:", this.config.uid )
      this.ready = true
      this.schedule()
    }
  },

  schedule: function() {
    clearTimeout(this.timer)
    this.timer = null
    this.updateDom()
    this.timer = setTimeout(()=>{
      this.schedule()
    }, this.config.refreshInterval)
  },

  getDom: function() {
    var dom = document.createElement("iframe")
    dom.id = "WIDGET2_" + this.config.uid
    for(var i in this.style) {
      if (this.style.hasOwnProperty(i)) {
        dom.style[i] = this.style[i]
      }
    }
    if (this.ready) dom.src = "/widget2/" + encodeURI(this.config.uid)
    return dom
  },
})
