// Dat der firebaseORM soN
Data.FirebaseORM = function(subscribedInterface){
  this.subscribedInterface = subscribedInterface

}

Data.FirebaseORM.prototype = {
  // Firebase ORM

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
    if (returnedStudioData.statusValue === "needSync") {
      this.needSyncRequested(returnedStudioData)
    }
    else if (returnedStudioData.statusValue === "syncToMe") {
      this.syncCurrentStudioState(returnedStudioData)
    }
    else if (returnedStudioData.statusValue === "removeListener") {
      this.updateListenerCount(returnedStudioData)
    }
    else if ((returnedStudioData.statusValue === "needSync") && (this.currentStudioState.data.status === "synced")) {
      this.sendSyncedData()
    }
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

  // needSync status
  needSyncRequested: function(returnedStudioData) {
    if (this.listenerValidAndSynced(returnedStudioData)) {
      var newStudioDate = this.packageNewStudioData(returnedStudioData)
     // this.subscribedInterface.updateStudioState(newStudioData)
      this.updateStudioState(newStudioData)
    }
  },

  packageNewStudioData: function(studioToPackage) {
    var packagedStudioData = this.retrieveCurrentStudioState(studioToPackage)
    var newListenerCount = packagedStudioData.data.listenerCount + 1
    packagedStudioData.data.listenerCount = newListenerCount
    packagedStudioData.data.syncTimeStamp = Date.now()
    packagedStudioData.data.status = "syncToMe"
    return packagedStudioData
  },

  updateStudioState: function(newStudioData) {
    this.firebaseManager.modifyStudioState(newStudioData)
  },

  // syncToMe status
  
  syncCurrentStudioState: function(newStudioData) {
    if ( (this.listenerValidAndNotSynced(newStudioData)) || (this.listenerNotValid) )  {
      this.subscribedInterface.updateStudioState(newStudioData)
    }
  },

  setStudioToSync: function(studioToSync) {
    this.firebaseManager.modifyStudioState({ name: studioToSync.name, data: { status: "needSync"} })
  },

  requestMonitorActivation: function() {
    this.firebaseManager.setConnectionMonitor(this.subscribedInterface.currentStudioState.name)
  },

  addStudioToSubscriber: function(studioData) {
   // var packagedStudioData = this.packageStudioData(studioData)
    this.firebaseManager.addStudio(studioData)
  },


  registerFirebaseManager: function(manager) {
    this.firebaseManager = manager
  }
  // syncData: function(studioName) {
  //   return this.currentStudioState
  // },
  
  // updateListenerCount: function(studioData) {
  //   var newListenerCount = this.currentStudioState.data.listeners + 1
  //   this.currentStudioState.data.listeners = newListenerCount
  //   this.updateStudioState({name: this.currentStudioState.name, data: { listeners: newListenerCount }})
  // },

  // sendSyncedData: function() {
  //   var packagedData = this.packageLatestStudioData()
  //   this.updateStudioState(packagedData)
  // },
}