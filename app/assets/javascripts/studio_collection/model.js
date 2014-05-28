StudioCollection.Model = function() {
  this.state = []
  this.currentStudioState
  this.synced = false
}

StudioCollection.Model.prototype = {

  createNewStudio: function(newStudioData) {
    console.log("New Studio Created on SCM")
    var newStudio = new Studio.Model(newStudioData)
    this.state.push(newStudio)
    this.notifyStudioCollectionStateUpdate()
    //this.currentStudioState = jQuery.extend({}, newStudio)
    //this.addStudioToSubscriber(this.currentStudioState)
  },

  removeStudio: function(studioData) {
    console.log("Removing Studio from SCM")
    var studioToRemove = this.fetchStudioData(studioData.name)
    this.state.remove(studioToRemove.index)
    this.notifyStudioCollectionStateUpdate()
  },

  updateStudioState: function(newStudioData) {
    console.log("SCM - updating studio state")
    if (newStudioData.name === this.currentStudioState.name) {
      this.currentStudioState = newStudioData
      var studioIndexToUpdate = this.fetchStudioData(newStudioData.name)
      this.state[studioIndexToUpdate] = new Studio.Model(newStudioData)
      this.notifyCurrentStudioStateUpdate()  
    }
    else {
      var studioIndexToUpdate = this.fetchStudioData(newStudioData.name)
      this.state[studioIndexToUpdate] = new Studio.Model(newStudioData)
      this.notifyStudioCollectionStateUpdate()
    }
  },

 // Notify
  notifyStudioCollectionStateUpdate: function() {
    console.log("Notify Controller of studio state update")
    this.controller.studioStateUpdate()
  },

  notifyCurrentStudioStateUpdate: function() {
    console.log("Notifying Controller of current studio state change")
    this.controller.currentStudioStateUpdate(this.currentStudioState)
  },

  // New listener joins studio

  addListenerToStudio: function(studioName) {
    var studioData = this.fetchStudioData(studioName).latestStudioData
    if (this.currentStudioState.name !== studioName) {
      this.currentStudioState = studioData
      this.requestSyncedData()
      this.requestMonitorActivation()
    } 
  },

  // Fetch latest studio state data
  fetchCurrentStudioData: function() {
    console.log("SCM - Fetching latest studio data")
    var currentTrackData = this.controller.fetchCurrentTrackStatus()
    var currentStudioData = this.currentStudioState
    currentStudioData.data.currentTrack = latestTrackData.currentTrack
    currentStudioData.data.currentTrackTime = latestTrackData.currentTrackTime
    return currentStudioData
  },
  

  // Firebase ORM

  // New Studio Created

  fbOrmNewStudioCreated: function(newStudioData) {
    console.log("New Studio Created FB ORM")
    //note: call SCM
    this.createNewStudio(newStudioData)
  },

  // Studio Destroyed
  fbOrmStudioDestroyed: function(studioData) {
    console.log("Studio Destroyed FB ORM")
    //note: call SCM
    this.removeStudio(studioData)
  },


// Studio status management

  fbOrmInterpretStudioStatus: function(returnedStudioData) {
    if (returnedStudioData.statusValue === "needSync") {
      this.fbOrmNeedSyncRequested(returnedStudioData)
    }
    else if (returnedStudioData.statusValue === "syncToMe") {
      this.fbOrmSyncCurrentStudioState(returnedStudioData)
    }
    else if (returnedStudioData.statusValue === "removeListener") {
      this.updateListenerCount(returnedStudioData)
    }
    else if ((returnedStudioData.statusValue === "needSync") && (this.currentStudioState.data.status === "synced")) {
      this.sendSyncedData()
    }
  },

  // Confirms listener in studio and synced
  fbOrmListenerValidAndSynced: function(studioDataChecksum) {
    //call to SCM state
    if ((this.synced) && (this.currentStudioState.name === studioDataChecksum.name)) {
      return true
    }
    else {
      return false
    }
  }, 

  fbOrmListenerValidAndNotSynced: function(studioDataChecksum) {
    // call to SCM state
    if ((!this.synced) && (this.currentStudioState.name === studioDataChecksum.name)) {
      return true
    }
    else {
      return false
    } 
  },
  
  fbOrmListenerNotValid: function(studioDataChecksum) {
    //call to SCM state
    if ((this.currentStudioState.name !== studioDataChecksum.name)) {
      return true
    }
    else {
      return false
    }
  },

  fbOrmRetrieveCurrentStudioState: function(studioDataChecksum) {
    //call to SCM
    var currentStudioData = this.fetchCurrentStudioData(studioDataChecksum)
    return currentStudioData
  },

  // needSync status
  fbOrmNeedSyncRequested: function(returnedStudioData) {
    // call SCM state
    if (fbOrmListenerSyncedAndValid(returnedStudioData)) {
      var newStudioData = this.fbOrmRetrieveCurrentStudioState(returnedStudioData)
      var newListenerCount = newStudioData.data.listenerCount + 1
      newStudioData.data.listenerCount = newListenerCount
      newStudioData.data.syncTimeStamp = Date.now()
      newStudioData.data.status = "syncToMe"
      // call to SCM
      this.updateStudioState(newStudioData)
      this.fbOrmUpdateStudioState(newStudioData)
    }
  },

  fbOrmUpdateStudioState: function(newStudioData) {
    this.subscriber.modifyStudioState(newStudioData)
  },

  // syncToMe status
  
  fbOrmSyncCurrentStudioState: function(newStudioData) {
    if ( (this.fbOrmListenerValidAndNotSynced(newStudioData)) || (this.fbOrmListenerNotValid) )  {
      //call to SCM
      this.updateStudioState(newStudioData)
    }
  },


  requestMonitorActivation: function() {
    this.subscriber.setConnectionMonitor(this.currentStudioState.name)
  },

  addStudioToSubscriber: function(studioData) {
   // var packagedStudioData = this.packageStudioData(studioData)
    this.subscriber.addStudio(studioData)
  },



  syncData: function(studioName) {
    return this.currentStudioState
  },
  
  updateListenerCount: function(studioData) {
    var newListenerCount = this.currentStudioState.data.listeners + 1
    this.currentStudioState.data.listeners = newListenerCount
    this.updateStudioState({name: this.currentStudioState.name, data: { listeners: newListenerCount }})
  },

  sendSyncedData: function() {
    var packagedData = this.packageLatestStudioData()
    this.updateStudioState(packagedData)
  },

  packageLatestStudioData: function() {
    var newTrackData = this.controller.fetchCurrentTrackStatus()
    var dataToPackage = this.currentStudioState
    var newListenerCount = dataToPackage.data.listeners + 1
    dataToPackage.data.currentTrack = newTrackData.currentTrack
    dataToPackage.data.currentTrackTime = newTrackData.currentTrackTime
    dataToPackage.data.status = "syncToMe"
    dataToPackage.data.listeners = newListenerCount
    dataToPackage.data.sentTimeStamp = Date.now()
    return dataToPackage
  },
  // requestListenerCountIncrease: function() {
  //   this.updateStudioState({name: this.currentStudioState.name, data: { status: "addListener"}})
  // },

  requestSyncedTrackData: function() {
    var newTrackData = this.controller.fetchCurrentTrackStatus()
    this.updateStudioState({
                                              name: this.currentStudioState.name, 
                                              data: { status: "syncToMe", currentTrack: newTrackData.currentTrack, 
                                              currentTrackTime: newTrackData.currentTrackTime 
                                            }})
  },

  // requestSyncedData: function() {

  //   this.updateStudioState({name: this.currentStudioState.name, data: { status: "needSync"})
  // },

  // updateCollectionState: function(studioData) {
  //  var tempStudio = this.fetchStudio(studioData.name)
  //   if ((tempStudio === false) && (this.cleanStudio(studioData))) {
  //     var newStudio = new Studio.Model(studioData)
  //     this.state.push(newStudio)
  //     this.controller.constructStudio(studioData)   
  //   }
  //   else {
  //     this.controller.constructStudio(studioData)
  //   }
  // },

  // cleanStudio: function(studioData) {
  //   if (studioData.data.removelistener) {
  //     var newListenerCount = studioData.data.listeners - 1
  //     if (newListenerCount > 0) {
  //       studioData.data.listeners = newListenerCount
  //       studioData.data.removelistener = false
  //       this.updateStudioState(studioData)
  //     }
  //   }
  //   if ((newListenerCount === 0) || (studioData.data.listeners === 0)) {
  //     this.removeStudio(studioData)
  //     return false
  //   }
  //   else {
  //     return true
  //   }
  // },

  // // toggleListenerCount: function(studio) {
  // //   studio.data.listeners--
  // //   var studioData = this.packageStudioData(studio)
  // //   this.updateStudioState(studioData)
  // // },

  // subscriberStateReactor: function(studioData, action) {
  //   if (action === "add") { 
  //     this.updateCollectionState(studioData)
  //   }
  //   else if (action === "destroy") {
  //     this.removeStudio(studioData)
  //   }
  // },
  
  // subscriberStudioStateReactor: function(studio) {
  //   if ((studio.data.flagtype === "getTimes") && (this.currentStudioState.name === studio.name) && (this.currentStudioState.synced)) {
  //     this.controller.fetchTrackState()
  //     console.log('fetching data' + Date.now())
  //   }
  //   else if ((studio.data.flagtype === "setTimes") && (this.currentStudioState.name === studio.name) && (this.currentStudioState.synced === false)) {
  //    this.currentStudioState.currentTrack = studio.data.currentTrack
  //    this.currentStudioState.currentTrackTime = studio.data.currentTrackTime
  //    this.syncSentTime = studio.data.timeStamp
  //    console.log("inside settime " + Date.now() )
  //   }
  //   if (this.cleanStudio(studio)) {
  //     var studioToModify = this.fetchStudio(studio.name).studio
  //     for (var attribute in studio.data) {
  //       if (attribute !== "playlist") { 
  //         if (studioToModify[attribute] !== studio.data[attribute]) {
  //           studioToModify[attribute] = studio.data[attribute]
  //         }      
  //       }
  //     }
  //     this.controller.modifyRenderedStudio(studio)
  //   }
  // },

  // updateStudioTrack: function(trackData) {
  //   console.log(Date.now())
  //   var updateTimeStamp = Date.now()
  //   var studioData = jQuery.extend({},{ name: this.currentStudioState.name, data: { flagtype: "setTimes", currentTrack: trackData.currentTrack, currentTrackTime: trackData.currentTrackTime, timeStamp: updateTimeStamp   } })
  //   this.updateStudioState(studioData)
  // },

  // // packageStudioData: function(studio) {
  // //   var studioData = jQuery.extend({},{ name: studio.name, data: { flagtype: null, listeners: studio.listeners, removelistener: studio.removelistener, playlist: studio.playlist, currentTrack: studio.currentTrack, currentTrackTime: studio.currentTrackTime } })
  // //   return studioData
  // // },

  fetchStudioData: function(studioName) {
    for (var i = 0; i < this.state.length; i++) {
      if (studioName === this.state[i].name) {      
        return { latestStudioData: jQuery.extend({},this.state[i]), index: i }
      }
    }
    return false
  },

  // removeStudio: function(studioData) {
  //   var studioToRemove = this.fetchStudio(studioData.name)
  //   if (studioToRemove === false) {  
  //     this.controller.destructStudio(studioData)
  //     this.subscriber.destroyStudio(studioData.name)  
  //   }
  //   else { 
  //     this.state.remove(studioToRemove.index)
  //     this.controller.destructStudio(studioData)
  //     this.subscriber.destroyStudio(studioData.name) 
  //   }
  // },

 

  registerStudioCollectionSubscriber: function(subscriber) {
    this.subscriber = subscriber
  },

  registerController: function(controller) {
    this.controller = controller
  }

}