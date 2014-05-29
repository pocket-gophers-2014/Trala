StudioCollection.Model = function() {
  this.state = []
  this.currentStudioState = {}
  this.synced = false
  this.studioCreator = false
}

StudioCollection.Model.prototype = {

  freshStudioCreation: function(freshStudioData) {
    var newStudioData = new Studio.Model(freshStudioData)
    this.subscriber.createStudio(newStudioData)
  },

  initStudioState: function(studioName) {
    this.currentStudioState.name = studioName 
    this.subscriber.setMonitorActivation(studioName)
    this.requestSyncedData(studioName)
  },

  requestSyncedData: function(studioName) {
    this.subscriber.sendSyncRequest(studioName)
  },

 createNewStudio: function(newStudioData) {
    this.updateCollectionState(newStudioData)
    this.notifyStudioCollectionStateUpdate()
  },

  removeStudio: function(studioData) {
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
    if (newStudioData.name === this.currentStudioState.name) {
      this.updateCollectionState(newStudioData)
      this.currentStudioState = newStudioData   
      console.log("Sync time stamp:" + this.currentStudioState.data.syncTimeStamp)
      var tdiff = (Date.now() - this.currentStudioState.data.syncTimeStamp + 3000) / 1000
      console.log("Time difference: " + tdiff)
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

  syncedTrackData: function() {
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
      this.syncTrackTime()
      this.synced = true
    }
  },

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

  fetchCurrentStudioData: function() {
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

