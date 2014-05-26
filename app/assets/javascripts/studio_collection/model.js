StudioCollection.Model = function() {
  this.state = []
  this.synced = false
}

StudioCollection.Model.prototype = {

  createNewStudio: function(studioData) {
    var newStudio = new Studio.Model(studioData)
    this.state.push(newStudio)
    this.currentStudio = studioData.name
    this.synced = true
    this.addStudioToSubscriber(newStudio)
  },

  addStudioToSubscriber: function(studioData) {
    var packagedStudioData = this.packageStudioData(studioData)
    this.subscriber.addStudio(packagedStudioData)
  },

  addListenerToStudio: function(studioName) {
    var studioData = this.packageStudioData(this.fetchStudio(studioName).studio)
    if (this.currentStudio !== studioName) {
      var newListenerCount = studioData.data.listeners + 1
      studioData.data.listeners = newListenerCount
      this.currentStudio = studioName
    }
    else if (this.currentStudio === studioName) {
      studioData.data.currentTrackTime = 0
      studioData.data.currentTrack = 0
    }
    studioData.data.flagtype = "getTimes"
    this.subscriber.setConnectionMonitor(studioName)
    this.updateStudioState(studioData)
  },

  updateCollectionState: function(studioData) {
   var tempStudio = this.fetchStudio(studioData.name)
    if ((tempStudio === false) && (this.cleanStudio(studioData))) {
      var newStudio = new Studio.Model(studioData)
      this.state.push(newStudio)
      this.controller.constructStudio(studioData)
    }
    else {
      this.controller.constructStudio(studioData)
    }
  },

  cleanStudio: function(studioData) {
    if (studioData.data.removelistener) {
      var newListenerCount = studioData.data.listeners - 1
      if (newListenerCount > 0) {
        studioData.data.listeners = newListenerCount
        studioData.data.removelistener = false
        this.updateStudioState(studioData)
      }
    }
    if ((newListenerCount === 0) || (studioData.data.listeners === 0)) {
      this.removeStudio(studioData)
      return false
    }
    else {
      return true
    }
  },

  toggleListenerCount: function(studio) {
    studio.data.listeners--
    var studioData = this.packageStudioData(studio)
    this.updateStudioState(studioData)
  },

  subscriberStateReactor: function(studioData, action) {
    if (action === "add") {
      this.updateCollectionState(studioData)
    }
    else if (action === "destroy") {
      this.removeStudio(studioData)
    }
  },

  subscriberStudioStateReactor: function(studio) {
    if ((studio.data.flagtype === "getTimes") && (this.currentStudio === studio.name) && (this.synced)) {
      this.controller.fetchTrackState()
    }
    else if ((studio.data.flagtype === "setTimes") && (this.currentStudio === studio.name) && (this.synced === false)) {
     this.controller.updateTrackState({ trackTime: studio.data.currentTrackTime, timeStamp: studio.data.timeStamp })
    }
    if (this.cleanStudio(studio)) {
      var studioToModify = this.fetchStudio(studio.name).studio
      for (var attribute in studio.data) {
        if (attribute !== "playlist") {
          if (studioToModify[attribute] !== studio.data[attribute]) {
            studioToModify[attribute] = studio.data[attribute]
          }
        }
      }
      this.controller.modifyRenderedStudio(studio)
    }
  },

  updateStudioTrack: function(trackData) {
    var studioData = { name: this.currentStudio, data: { flagtype: "setTimes", currentTrackTime: trackData, timeStamp: Date.now() } }
    this.updateStudioState(studioData)
  },

  packageStudioData: function(studio) {
    var studioData = { name: studio.name, data: { flagtype: null, listeners: studio.listeners, active: studio.active, removelistener: studio.removelistener, playlist: studio.playlist } }
    return studioData
  },

  fetchStudio: function(studioName) {
    for (var i = 0; i < this.state.length; i++) {
      if (studioName === this.state[i].name) {
        return { studio: jQuery.extend({},this.state[i]), index: i }
      }
    }
    return false
  },

  removeStudio: function(studioData) {
    var studioToRemove = this.fetchStudio(studioData.name)
    if (studioToRemove === false) {
      this.controller.destructStudio(studioData)
      this.subscriber.destroyStudio(studioData.name)
    }
    else {
      this.state.remove(studioToRemove.index)
      this.controller.destructStudio(studioData)
      this.subscriber.destroyStudio(studioData.name)
    }
  },

 updateStudioState: function(newStudioData) {
  this.subscriber.modifyStudioState(newStudioData)
 },

  registerStudioCollectionSubscriber: function(subscriber) {
    this.subscriber = subscriber
  },

  registerController: function(controller) {
    this.controller = controller
  }

}