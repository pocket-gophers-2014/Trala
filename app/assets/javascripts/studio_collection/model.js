StudioCollection.Model = function() {
  this.state = []
  this.currentStudioState = {}
  this.synced = false
  this.studioCreator = false
  this.syncPending = false
}

StudioCollection.Model.prototype = {

  freshStudioCreation: function(freshStudioData) {
    console.log("SCM - freshSC - sdata: " + freshStudioData)
    var newStudioData = new Studio.Model(freshStudioData)
    this.subscriber.createStudio(newStudioData)
  },

  // New user joins studio
  initStudioState: function(studioName) {
    this.currentStudioState.name = studioName 
    this.subscriber.setMonitorActivation(studioName)
    this.requestSyncedData(studioName)
  },

  requestSyncedData: function(studioName) {
    this.syncPending = true
    this.subscriber.sendSyncRequest(studioName)
  },

  syncTrackTime: function() {
    var timeDifference = ((Date.now() - this.currentStudioState.data.syncTimeStamp) / 1000 ) 
    var newTrackTime = timeDifference + this.currentStudioState.data.currentTrackTime
    this.currentStudioState.data.currentTrackTime = newTrackTime
  },

  createNewStudio: function(newStudioData) {
    console.log("New Studio Created on SCM")
    var newStudio = new Studio.Model(newStudioData)
    this.state.push(newStudio)
    this.notifyStudioCollectionStateUpdate()
  },

  removeStudio: function(studioData) {
    console.log("Removing Studio from SCM")
    var studioToRemove = this.fetchStudioData(studioData.name)
    this.state.remove(studioToRemove.index)
    this.notifyStudioCollectionStateUpdate()
  },

  setStateSynced: function() {
    this.synced = true
    if (this.currentStudioState.data.listenerCount === 1) {
      this.first = true
    }
    this.subscriber.syncStudioData(this.currentStudioState)
  },

  updateStudioState: function(newStudioData) {
    console.log("SCM - updating studio state")
    if (newStudioData.name === this.currentStudioState.name) {
      this.updateCollectionState(newStudioData)
      this.currentStudioState = newStudioData    
      this.initStudioBuild() 
    }
    else {
      this.updateCollectionState(newStudioData)
      this.notifyStudioCollectionStateUpdate()
    }
  },
  
  initStudioBuild: function() {
    var studioData = this.currentStudioState
    this.controller.buildStudio(studioData)
  },

  sendTrackData: function() {
    var trackData = {currentTrack: this.currentStudioState.data.currentTrack, currentTrackTime: this.currentStudioState.data.currentTrackTime }
    return trackData
  },

  updateCollectionState: function(studioData) {
    var studioIndexToUpdate = this.fetchStudioData(studioData.name)
    if (!studioIndexToUpdate) {
      var newStudio = new Studio.Model(studioData)
      this.state.push(newStudio)
    }
    else {
      this.state[studioIndexToUpdate] = new Studio.Model(studioData)
    }
  },
  
  toggleListenerCount: function(studioData) {
    this.updateCollectionState(studioData)
    if (this.currentStudioState.name === studioData.name) {
      this.currentStudioState.data.listenerCount = studioData.data.listenerCount
      this.notifyCurrentStudioStateUpdate()
    }
    else {
      this.notifyStudioCollectionStateUpdate()
    }
  },

  fetchStudioData: function(studioName) {
    for (var i = 0; i < this.state.length; i++) {
      if (studioName === this.state[i].name) {      
        return { studioData: jQuery.extend({},this.state[i]), index: i }
      }
    }
    return false
  },

  studioStateChecksumUpdate: function() {
    if (this.synced) {
      this.notifyCurrentStudioStateUpdate()  
    }
    else if (!this.synced) {
      console.log('SCM - syncing track data')
      this.syncTrackTime()
      this.synced = true
      this.syncPending = false  
    }
  },

 // Notify
  notifyCorrectStudioState: function() {
    console.log("SCM - notifying controller to update track state")
    this.controller.updatePlayerState()
  },

  notifyStudioCollectionStateUpdate: function() {
    console.log("Notify Controller of studio state update")
    this.controller.collectionStateUpdate()
  },

  notifyCurrentStudioStateUpdate: function() {
    console.log("Notifying Controller of current studio state change")
  //  this.controller.currentStudioStateUpdate(this.currentStudioState)
  },

  // Fetch latest studio state data
  fetchCurrentStudioData: function() {
    console.log("SCM - Fetching latest studio data")
    var currentTrackData = this.controller.fetchCurrentTrackStatus()
    var currentStudioData = this.currentStudioState
    currentStudioData.data.currentTrack = currentTrackData.currentTrack
    currentStudioData.data.currentTrackTime = currentTrackData.currentTrackTime
    return currentStudioData
  },
 
  registerStudioCollectionSubscriber: function(subscriber) {
    this.subscriber = subscriber
  },

  registerController: function(controller) {
    this.controller = controller
  }
  
}

