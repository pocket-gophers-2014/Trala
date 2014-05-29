Data.FirebaseManager = function(fbRefUrl, fbORM) {
  this.studioCollectionRef= new Firebase('https://trala.firebaseio.com/studioCollection')
  this.connectionRef = new Firebase('https://trala.firebaseio.com/.info/connected')
  this.fbORM = fbORM
}

Data.FirebaseManager.prototype = {
  createStudio: function(studio) {
    this.studioCollectionRef.child(studio.name).set(studio.data)
  },

  destroyStudio: function(studioName) {
    this.studioCollectionRef.child(studioName).set(null)
  },

  setConnectionMonitor: function(studioName) {
    this.studioRef = new Firebase('https://trala.firebaseio.com/studioCollection/' + studioName)
    this.studioRef.onDisconnect().update({ status: "removeListener" })
  },

  modifyStudioState: function(newStudioData) {
    this.studioCollectionRef.child(newStudioData.name).update(newStudioData.data)
  },

  nukeCollection: function() {
    this.studioCollectionRef.set(null)
  },

  studioDestroyed: function(data) {
    var studioData = this.packageStudioData(data)
    this.fbORM.studioDestroyed(studioData)
  },

  studioStateModified: function(data) {
    var studioData = this.packageStudioData(data)
    this.fbORM.interpretStudioStatus(studioData)
  },
  
  newStudioCreated: function(data) {
    var studioData = this.packageStudioData(data)
    if (studioData.data.listenerCount !== 0) {
      this.fbORM.newStudioCreated(studioData)
    }
  },

  packageStudioData: function(data) {
    var studioData = { name: data.name(), data: data.val() }
    return studioData
  },

  setDataTriggers: function() {
    this.studioCollectionRef.on('child_added', this.newStudioCreated.bind(this)) 
    this.studioCollectionRef.on('child_changed', this.studioStateModified.bind(this))
    this.studioCollectionRef.on('child_removed', this.studioDestroyed.bind(this))
  }
}
