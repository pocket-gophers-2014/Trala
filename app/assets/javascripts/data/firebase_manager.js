Data.FirebaseManager = function(fbRefUrl, studioCollectionModel) {
  this.studioCollectionRef= new Firebase('https://trala.firebaseio.com/studioCollection')
  this.connectionRef = new Firebase('https://trala.firebaseio.com/.info/connected')
  this.studioCollectionModel = studioCollectionModel
  this.collectionState = []
}

Data.FirebaseManager.prototype = {
  addStudio: function(name, data) {
    //var newStudio = this.studioCollectionRef.push()
    //newStudio.set(data)
    //this.currentUserStudio = newStudio.name()
    this.studioCollectionRef.child(name).set(data)
    //this.studioRef = new Firebase('https://trala.firebaseio.com/studioCollection/' + this.currentUserStudio)
   // this.studioRef.onDisconnect().update({ active: false})
  },

  destroyStudio: function(studio) {
    this.studioCollectionRef.child(studio).set(null)
  },

  modifyStudioState: function(studio, newData) {
    this.studioCollectionRef.child(studio).update(newData)
  },

  nukeCollection: function() {
    this.studioCollectionRef.set(null)
  },

  studioStateModified: function(data) {
    console.log("Studio state updated")
  },

  collectionStateUpdated: function(data) {
     var tempData = this.parseFbData(data)
     //debugger
    // var tempLength = this.collectionState.length
    // var uniqCount = 0
    // if (this.collectionState.length > 0) {  
    //   for (var i = 0; i < tempLength; i++) {
    //     if (tempData === this.collectionState[i]) {
    //       uniqCount++
    //     }
    //   }
    // }
    // if (uniqCount === 0) {
    this.collectionState = tempData
   this.studioCollectionModel.updateState(this.collectionState)    
 
   
  },

  parseFbData: function(data) {
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
    this.studioCollectionRef.on('value', this.collectionStateUpdated.bind(this))
    // this.studioCollectionRef.on('child_added', this.collectionStateUpdated.bind(this))
    this.studioCollectionRef.on('child_changed', this.studioStateModified.bind(this))
    this.studioCollectionRef.on('child_removed', this.collectionStateUpdated.bind(this))
    this.connectionRef.on('value', this.connectionStateUpdate.bind(this))
  }
}
