Data.FirebaseManager = function(fbRef) {
  this.soundBoothHub = new Firebase('https://trala.firebaseio.com/booths')
  this.connectionRef = new Firebase('https://trala.firebaseio.com/.info/connected')
 // this.hubData = []
}

Data.FirebaseManager.prototype = {
  addBooth: function(data) {
    var newBooth = this.soundBoothHub.push()
    newBooth.set(data)
    this.currentUserBooth = newBooth.name()
    this.boothRef = new Firebase('https://trala.firebaseio.com/booths/' + this.currentUserBooth)
    this.boothRef.onDisconnect().update({ subscribers: "gone"})
  },

  destroyBooth: function(booth) {
    this.soundBoothHub.child(booth).set(null)
  },

  modifyBoothState: function(booth, newData) {
    this.soundBoothHub.child(booth).update(newData)
  },

  boothStateUpdated: function(data) {
    
  },

  hubStateUpdated: function(data) {
    // var boothId = data.name()
    // var boothData = data.val()
    this.hubData = data.val()
  },

  connectionStateUpdate: function(snapData) {
    if (snapData.val()) {
      console.log("here")
    }
    else {
      console.log("gone")
    }

  },

  setDataTriggers: function() {
    this.soundBoothHub.on('value', this.hubStateUpdated.bind(this))
    this.soundBoothHub.on('child_added', this.hubStateUpdated.bind(this))
    this.soundBoothHub.on('child_changed', this.boothStateUpdated.bind(this))
    this.soundBoothHub.on('child_removed', this.hubStateUpdated.bind(this))
    this.connectionRef.on('value', this.connectionStateUpdate.bind(this))
    //
  }
}
var fbTest = new Data.FirebaseManager()
fbTest.setDataTriggers()