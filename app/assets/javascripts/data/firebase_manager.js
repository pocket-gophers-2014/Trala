Data.FirebaseManager = function(fbRefUrl, studioCollectionModel) {
  this.studioCollectionRef= new Firebase('https://trala.firebaseio.com/studioCollection')
  this.connectionRef = new Firebase('https://trala.firebaseio.com/.info/connected')
  this.studioCollectionModel = studioCollectionModel
}

Data.FirebaseManager.prototype = {
  addStudio: function(name, data) {
    this.studioCollectionRef.child(name).set(data)
  },

  destroyStudio: function(studioName) {
    this.studioCollectionRef.child(studioName).set(null)
  },

  setConnectionMonitor: function(studioName, listenerCount) {
    this.studioRef = new Firebase('https://trala.firebaseio.com/studioCollection/' + studioName)
    this.studioRef.onDisconnect().update({ listenerGone: true })
  },

  modifyStudioState: function(studio, newData) {
    this.studioCollectionRef.child(studio).update(newData)
  },

  nukeCollection: function() {
    this.studioCollectionRef.set(null)
  },

  studioRemoved: function(data) {
    var studioData = this.packageStudioData(data)
    this.studioCollectionModel.subscriberStateReactor(studioData, "destroy")
  },

  studioStateModified: function(data) {
    var studioData = this.packageStudioData(data)
    this.studioCollectionModel.subscriberStudioStateReactor(studioData)
  },
  
  newStudioAdded: function(data) {
    var studioData = this.packageStudioData(data)
    this.studioCollectionModel.subscriberStateReactor(studioData, "add")
  },

  initialCollectionState: function(data) {
    var studioCollectionData = this.parseFbCollectionData(data)
    this.studioCollectionModel.initialStateGenerate(studioCollectionData)    
    this.studioCollectionRef.off('value', this.initialCollectionState.bind(this))
    this.studioCollectionRef.on('child_added', this.newStudioAdded.bind(this))
  },

  packageStudioData: function(data) {
    var studioData = { name: data.name(), listeners: data.val().listeners, playlist: data.val().playlist, active: data.val().active }
  },

  packageStudioCollectionData: function(data) {
    var tempData = []
    data.forEach(function(data) {
      var tempObj = { name: data.name(), subs: data.val().subs, active: data.val().active }
     tempData.push(tempObj) 
   })
    return tempData
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
    this.studioCollectionRef.on('value', this.initialCollectionState.bind(this))
    this.studioCollectionRef.on('child_changed', this.studioStateModified.bind(this))
    this.studioCollectionRef.on('child_removed', this.studioRemoved.bind(this))
   // this.connectionRef.on('value', this.connectionStateUpdate.bind(this))
  }
}
