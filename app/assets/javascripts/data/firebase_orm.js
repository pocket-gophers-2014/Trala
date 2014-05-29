// Dat der firebaseORM soN
Data.FirebaseORM = function(subscribedInterface){
  this.subscribedInterface = subscribedInterface
}

Data.FirebaseORM.prototype = {
  // New Studio Created
  newStudioCreated: function(newStudioData) {
    console.log("New Studio Created FB ORM")
    if (this.validateStudio(newStudioData)) {
      this.subscribedInterface.createNewStudio(newStudioData)
    }
    else {
      this.removeStudio(newStudioData.name)
    }
  },

  // Create new studio
  createStudio: function(newStudioData) {
    debugger
    this.firebaseManager.createStudio(newStudioData)
  },

  // Studio Destroyed
  studioDestroyed: function(studioData) {
    console.log("Studio Destroyed FB ORM")
    this.subscribedInterface.removeStudio(studioData)
  },

  validateStudio: function(studioData) {
    if ((studioData.data.status === "removeListener") && (studioData.data.listenerCount === 1)) {
      return false
    }
    else {
      return true
    }
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
    if (returnedStudioData.data.listenerCount === 0)  {
      var syncedStudioData = this.packageNewStudioData(returnedStudioData, "add")
      this.newStudioCreated(syncedStudioData)
      this.updateStudioState(syncedStudioData)     
    }

    if (!this.listenerValidAndSynced(returnedStudioData)) {
      this.subscribedInterface.updateStudioState(syncedStudioData)
    }

    if (this.listenerValidAndSynced) { 
      var syncedTrackData = this.retrieveCurrentStudioState()
      var syncedStudioData = this.packageNewStudioData(syncedStudioData, "add")
      this.updateStudioState(syncedStudioData)
    }
  },

// syncToMe status
  syncCurrentStudioState: function(newStudioData) {
    console.log("FB ORM - sync data")
    if ( (this.listenerValidAndNotSynced(newStudioData)) || (this.listenerNotValid(newStudioData)) )  {
      this.subscribedInterface.updateStudioState(newStudioData)
    }
  },

  updateListenerCount: function(studioData) {
    console.log("FB ORM - Removing listener")
    if (this.listenerValidAndSynced) {
      var latestStudioData = this.packageNewStudioData(studioData, "deduct")
      this.updateStudioState(latestStudioData)
    }
    else if ( (this.listenerNotValid(studioData)) && (studioData.data.listenerCount === 1) ) {
      this.removeStudio(studioData)
    }  
  },
  
 // Confirms listener in studio and synced
  listenerValidAndSynced: function(studioDataChecksum) {
    if ((this.subscribedInterface.synced) && (this.subscribedInterface.currentStudioState.name === studioDataChecksum.name) && (this.subscribedInterface.first)) {
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

  retrieveCurrentStudioState: function() {
    var currentStudioData = this.subscribedInterface.fetchCurrentStudioData()
    return currentStudioData
  },

  packageNewStudioData: function(studioToPackage, type) {
    var packagedStudioData = studioToPackage
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

  removeStudio: function(studioName) {
    this.firebaseManager.destroyStudio(studioName)
  },

  updateStudioState: function(newStudioData) {
    this.firebaseManager.modifyStudioState(newStudioData)
  },

  sendSyncRequest: function(studioToSync) {
    this.firebaseManager.modifyStudioState({ name: studioToSync, data: { status: "needSync"} })
  },

  setMonitorActivation: function(studioName) {
    this.firebaseManager.setConnectionMonitor(studioName)
  },

  registerFirebaseManager: function(manager) {
    this.firebaseManager = manager
  }
}