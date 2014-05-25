StudioCollection.Model = function() {
  this.state = []
}

StudioCollection.Model.prototype = {
  initialStateGenerate: function(stateData) {
    for (var i = 0; i < stateData.length; i++) {
      this.controller.createStudio(stateData[i])
    }
  },

  createNewStudio: function(studioData) {
    var newStudio = new Studio.Model(studioData)
    this.state.push(newStudio)
    this.addStudioToSubscriber(studioData)
  },

  addStudioToSubscriber: function(studioData) {
    var packagedStudioData = this.packageStudioData(studioData)
    this.subscriber.addStudio(packagedStudioData)
  },

  setUserCurrentStudio: function(studioName) {
    var currentListenerCount = this.fetchStudio({name: studioName}).studio.listeners
    var newListenerCount = currentListenerCount++
    this.subscriber.setConnectionMonitor(studioName, newListenerCount)
  },
  
  updateCollectionState: function(studioData) {
    var tempStudio = this.fetchStudio(studioData)
    if (tempStudio === false) {
      var newStudio = new Studio.Model(studio)
      this.state.push(newStudio)
    }
  },

  subscriberStateReactor: function(studioData, action) {
    if (action === "add") {
      this.updateCollectionState(studioData)
    }
    else if (action === "destroy") {
      this.removeStudio(studioData)
    }
  },
  
  subscriberStudioStateReactor: function(studioData) {
    var studioToModify = this.fetchStudio(studioData.name).studio
    for (var attribute in modifiedStudio) {
      if (studioToModify[attribute] !== studioData[attribute]) {
        studioTomodify[attribute] = studioData[attribute]
      }
    }
  },

  packageStudioData: function(studio) {
    var studioData = { name: studio.name, listeners: studio.listeners, active: studio.active, playlist: studio.playlist }
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