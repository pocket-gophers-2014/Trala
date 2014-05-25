StudioCollection.Model = function() {
  this.state = []
}

StudioCollection.Model.prototype = {
  initialStateGenerate: function(stateData) {
    for (var i = 0; i < stateData.length; i++) {
      var newStudio = new Studio.Model(stateData[i])
      this.state.push(newStudio)
    }
  },

  createNewStudio: function(studioData) {
    var newStudio = new Studio.Model(studioData)
    this.state.push(newStudio)
    this.addStudioToSubscriber(newStudio)
  },

  addStudioToSubscriber: function(studioData) {
    var packagedStudioData = this.packageStudioData(studioData)
    this.subscriber.addStudio(packagedStudioData)
  },

  setMonitorOnCurentUser: function(studioName) {
    var currentListenerCount = this.fetchStudio({name: studioName}).studio.listeners
    var newListenerCount = currentListenerCount++
    this.subscriber.setConnectionMonitor(studioName, newListenerCount)
  },
  
  updateCollectionState: function(studioData) {
    var tempStudio = this.fetchStudio(studioData.name)
    if (tempStudio === false) {
      var newStudio = new Studio.Model(studio)
      this.state.push(newStudio)
    }
    this.controller.constructStudio(studioData)
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
    debugger
    var studioToModify = this.fetchStudio(studio.name).studio
    for (var attribute in studio.data) {
      if (attribute === "playlist") { 
        for (var i = 0; i < studio.data.playlist.length; i++) {
          for (var playlistData in studio.data.playlist[0]) {
            if ()
          }
        }
      }
      if (studioToModify[attribute] !== studio.data[attribute]) {
        studioToModify[attribute] = studio.data[attribute]
      }
    }
    this.controller.modifyRenderedStudio(studio)
  },

  packageStudioData: function(studio) {
    var studioData = { name: studio.name, data: { listeners: studio.listeners, active: studio.active, playlist: studio.playlist } }
    return studioData
  },

  fetchStudio: function(studioName) {
    for (var i = 0; i < this.state.length; i++) {
      if (studioName === this.state[i].name) {      
        return { studio: this.state[i], index: i }
      }
    }
    return false
  },

  removeStudio: function(studioData) {
    var studioToRemove = this.fetchStudio(studioData.name)
    this.state.remove(studioToRemove.index)
    this.controller.destructStudio(studioData)
    // this.subscriber.destroyStudio(studioData)
  },


 updateStudioState: function(studio, data) {
  this.subscriber.modifyStudioState(studio, data)
 },

  registerStudioCollectionSubscriber: function(subscriber) {
    this.subscriber = subscriber
  },

  registerController: function(controller) {
    this.controller = controller
  }

}