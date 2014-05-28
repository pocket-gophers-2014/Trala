// Dat der firebaseORM soN
Data.FirebaseORM = function(subscribedInterface){
  this.subscribedInterface = subscribedInterface
}

Data.FirebaseORM.prototype = {
  // New Studio Created
  newStudioCreated: function(newStudioData) {
    console.log("New Studio Created FB ORM")
    //note: call SCM
    this.subscribedInterface.createNewStudio(newStudioData)
  },

  // Studio Destroyed
  studioDestroyed: function(studioData) {
    console.log("Studio Destroyed FB ORM")
    //note: call SCM
    this.subscribedInterface.removeStudio(studioData)
  },

// Studio status management
  interpretStudioStatus: function(returnedStudioData) {
    if (returnedStudioData.data.status === "needSync") {
      this.needSyncRequested(returnedStudioData)
    }
    else if (returnedStudioData.data.status === "syncToMe") {
      this.syncCurrentStudioState(returnedStudioData)
    }
    else if (returnedStudioData.data.status === "removeListener") {
      this.updateListenerCount(returnedStudioData)
    }
  },

// needSync status
  needSyncRequested: function(returnedStudioData) {
    console.log("FB ORM - needSync")
    if (this.listenerValidAndSynced(returnedStudioData)) {
      var newStudioData = this.packageNewStudioData(returnedStudioData, "add")
     // this.subscribedInterface.updateStudioState(newStudioData)
      this.updateStudioState(newStudioData)
    }
  },

// syncToMe status
  syncCurrentStudioState: function(newStudioData) {
    console.log("FB ORM - sync data")
    if ( (this.listenerValidAndNotSynced(newStudioData)) || (this.listenerNotValid) )  {
      this.subscribedInterface.updateStudioState(newStudioData)
    }
  },

  updateListenerCount: function(studioData) {
    if (this.listenerValidAndSynced) {
      var latestStudioData = this.packageStudioData(studioData, "deduct")
      this.updateStudioState(latestStudioData)
    }
    else if ( (this.listenerNotValid(studioData)) && (studioData.data.listenerCount === 1) ) {
      this.removeStudio(studioData)
    }  
  },
  
  removeStudio: function(studioData) {
    this.firebaseManager.destroyStudio(studioData.name)
  },

  // Confirms listener in studio and synced
  listenerValidAndSynced: function(studioDataChecksum) {
    if ((this.subscribedInterface.synced) && (this.subscribedInterface.currentStudioState.name === studioDataChecksum.name)) {
      return true
    }
    else {
      return false
    }
  }, 

  listenerValidAndNotSynced: function(studioDataChecksum) {
    if ((!this.subscribedInterface.synced) && (this.subscribedInterface.currentStudioState.name === studioDataChecksum.name)) {
      return true
    }
    else {
      return false
    } 
  },
  
  listenerNotValid: function(studioDataChecksum) {
    if ((this.subscribedInterface.currentStudioState.name !== studioDataChecksum.name)) {
      return true
    }
    else {
      return false
    }
  },

  retrieveCurrentStudioState: function(studioDataChecksum) {
    var currentStudioData = this.subscribedInterface.fetchCurrentStudioData(studioDataChecksum)
    return currentStudioData
  },

  packageNewStudioData: function(studioToPackage, type) {
    var packagedStudioData = this.retrieveCurrentStudioState(studioToPackage)
    if (type === "add") {
      var newListenerCount = packagedStudioData.data.listenerCount + 1
    }
    else if (type === "deduct") {
      var newListenerCount = packagedStudioData.data.listenerCount - 1
    }
    packagedStudioData.data.listenerCount = newListenerCount
    packagedStudioData.data.syncTimeStamp = Date.now()
    packagedStudioData.data.status = "syncToMe"
    return packagedStudioData
  },

  updateStudioState: function(newStudioData) {
    this.firebaseManager.modifyStudioState(newStudioData)
  },

  setStudioToSync: function(studioToSync) {
    this.firebaseManager.modifyStudioState({ name: studioToSync, data: { status: "needSync"} })
  },

  setMonitorActivation: function(studioName) {
    this.firebaseManager.setConnectionMonitor(studioName)
  },

  addStudioToSubscriber: function(studioData) {
   // var packagedStudioData = this.packageStudioData(studioData)
    this.firebaseManager.addStudio(studioData)
  },

  registerFirebaseManager: function(manager) {
    this.firebaseManager = manager
  }
}