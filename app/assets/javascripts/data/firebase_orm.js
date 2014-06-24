// Dat der firebaseORM soN
Data.FirebaseORM = function(){
  this.subscribedInterface = {}
}

Data.FirebaseORM.prototype = {

  newStudioCreated: function(newStudioData) {
    if (this.canDestroyStudio(newStudioData)) {
      this.removeStudio(newStudioData.name)   
    }
    else {
      this.subscribedInterface.createNewStudio(newStudioData)
    }
  },

  createStudio: function(newStudioData) {
    this.firebaseManager.createStudio(newStudioData)
  },

  studioDestroyed: function(studioData) {
    this.subscribedInterface.removeStudio(studioData)
  },

  interpretStudioStatus: function(returnedStudioData) {
    if (returnedStudioData.data.status === "needSync") {
      this.needSyncRequested(returnedStudioData)
    }
    else if (returnedStudioData.data.status === "syncToMe") {
      this.syncCurrentStudioState(returnedStudioData)
    }
    else if (returnedStudioData.data.status === "removeListener") {
      this.toggleListenerCount(returnedStudioData)
    }
    else if (returnedStudioData.data.status === "adjustListenerCount") {
      this.updateListenerCount(returnedStudioData)
    }
  },

  needSyncRequested: function(returnedStudioData) {
    if ((returnedStudioData.data.listenerCount === 0) && (this.listenerValidAndNotSynced(returnedStudioData)))  {
      var syncedStudioData = this.packageNewStudioData(returnedStudioData, "add")
      this.subscribedInterface.updateStudioState(syncedStudioData) 
    }

    if (this.listenerValidAndSynced(returnedStudioData)) { 
      var syncedTrackData = this.retrieveCurrentStudioState()
      var syncedStudioData = this.packageNewStudioData(syncedTrackData, "add")
      this.updateStudioState(syncedStudioData)
    }
  },

  syncCurrentStudioState: function(newStudioData) {
    if ( (this.listenerValidAndNotSynced(newStudioData)) || (this.listenerNotValid(newStudioData)) )  {
      this.subscribedInterface.updateStudioState(newStudioData)
    }
  },

  syncStudioData: function(syncedStudioData) {
    var packagedSyncedData = this.packageNewStudioData(syncedStudioData, "none")
    this.updateStudioState(packagedSyncedData)
  },

  updateListenerCount: function(studioData) {
    this.subscribedInterface.toggleListenerCount(studioData)
  },

  toggleListenerCount: function(studioData) {
    if (this.canDestroyStudio(studioData)) {
      this.removeStudio(studioData.name)
    }
    else {
      if (this.listenerValidAndSynced) {
        var latestStudioData = this.packageNewStudioData(studioData, "deduct")
        latestStudioData.data.status = "adjustListenerCount"
        this.updateStudioState(latestStudioData)
      }
    }
  },
  
  canDestroyStudio: function(studioData) {
    if ((studioData.data.status === "removeListener") && (studioData.data.listenerCount < 2)) {
      return true
    }
    else {
      return false
    }
  },

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
    else if (type === "none") {
      var newListenerCount = packagedStudioData.data.listenerCount
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
  },

  registerSubscriber: function(subscriber) {
    this.subscribedInterface = subscriber;
  }
}