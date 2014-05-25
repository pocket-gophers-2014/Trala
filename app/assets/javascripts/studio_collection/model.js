StudioCollection.Model = function() {
  this.state = []
}

StudioCollection.Model.prototype = {
  initialStateGenerate: function(stateData) {
    for (var i = 0; i < stateData.length; i++) {
      this.controller.createStudio(stateData[i])
    }
  },

  addStudio: function(studio) {
    this.state.push(studio)
    this.updateFbState(studio)
    this.controller.collectionStateChange()
  },

  updateFbState: function(studio) {
    this.subscriber.addStudio(studio)
  },

  setUserCurrentStudio: function(studioName) {
    var currentListenerCount = this.fetchStudio({name: studioName}).studio.listeners
    var newListenerCount = currentListenerCount++
    this.subscriber.setConnectionMonitor(studioName, newListenerCount)
  },

  subscriberStateReactor: function(studioData, action) {
    if (action === "add") {
      this.controller.createStudio(studioData)
    }
    else if (action === "destroy") {
      this.removeStudio(studioData)
    }
  },
  
  subscriberStudioStateReactor: function(studioData) {
    var studioToModify = this.fetchStudio(studioData).studio
    for (var attribute in modifiedStudio) {
      if (studioToModify[attribute] !== studioData[attribute]) {
        studioTomodify[attribute] = studioData[attribute]
      }
    }
  },

  studioDataPackage: function(studio) {
    var fbStudioData = { name: studio.name, listeners: studio.listeners, active: studio.active, playlist: studio.playlist }
    return fbStudioData
  },

  fetchStudio: function(studioData) {
    for (var i = 0; i < this.state.length; i++) {
      if (studioData.name === this.state[i].name) {
        return { studio: this.state[i], index: i }
      }
    }
  },

  removeStudio: function(studioData) {
    var studioToRemove = this.fetchStudio(studioData)
    this.state.remove(studioToRemove.index)
    this.subscriber.destroyStudio(studioData)
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