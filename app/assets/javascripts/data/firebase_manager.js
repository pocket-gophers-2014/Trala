Data.FirebaseManager = function(fbRefUrl, fbORM) {
  this.studioCollectionRef= new Firebase('https://tralatestbase.firebaseio.com/studioCollection')
  this.connectionRef = new Firebase('https://tralatestbase.firebaseio.com/.info/connected')
  this.fbORM = fbORM
}

Data.FirebaseManager.prototype = {
  addStudio: function(studio) {
    this.studioCollectionRef.child(studio.name).set(studio.data)
  },

  destroyStudio: function(studioName) {
    this.studioCollectionRef.child(studioName).set(null)
  },

  setConnectionMonitor: function(studioName) {
    this.studioRef = new Firebase('https://tralatestbase.firebaseio.com/studioCollection/' + studioName)
    this.studioRef.onDisconnect().update({ removelistener: true })
  },

  modifyStudioState: function(newStudioData) {
    this.studioCollectionRef.child(newStudioData.name).update(newStudioData.data)
  },

  nukeCollection: function() {
    this.studioCollectionRef.set(null)
  },

  studioDestroyed: function(data) {
    console.log("FB - STUDIO REMOVED")
    var studioData = this.packageStudioData(data)
    this.fbORM.studioDestroyed(studioData)
  },

  studioStateModified: function(data) {
    console.log("FB - studio MODIFIED")
    var studioData = this.packageStudioData(data)
    this.fbORM.interpretStudioStatus(studioData)
  },
  
  newStudioCreated: function(data) {
    console.log("FB - New Studio Created FB MANAGER")
    var studioData = this.packageStudioData(data)
    this.fbORM.newStudioCreated(studioData)
  },

  // initialCollectionState: function(data) {
  //   var studioCollectionData = this.packageStudioCollectionData(data)
  //   this.studioCollectionModel.initialStateGenerate(studioCollectionData)    
  // },

  packageStudioData: function(data) {
    var studioData = { name: data.name(), data: data.val() }
    return studioData
  },

  packageStudioCollectionData: function(data) {
    var tempData = []
    data.forEach(function(data) {
      var tempObj = { name: data.name(), data: data.val() }
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
    this.studioCollectionRef.on('child_added', this.newStudioCreated.bind(this)) 
    this.studioCollectionRef.on('child_changed', this.studioStateModified.bind(this))
    this.studioCollectionRef.on('child_removed', this.studioDestroyed.bind(this))
  }
}
