StudioCollection.Controller = function(args) {
  this.studioView = args.studioView
  this.studioCollectionModel = args.studioCollectionModel
  this.studioCollectionView = args.studioCollectionView
  this.locatonManager = args.locationManager
  this.currentUserState = ""
  this.tempPlaylist = []

}

StudioCollection.Controller.prototype = {

  initStudioCreation: function(studioData) {
    this.studioCollectionModel.freshStudioCreation(studioData)
    this.initUserStudioState(studioData.name)
  },

  initUserStudioState: function(studioName) {
    this.studioCollectionModel.initStudioState(studioName)
   },
   
   buildStudio: function(studioBuildData) {
    this.loadStudioWithPlayer(studioBuildData)
    var tdiff = (Date.now() - studioBuildData.data.syncTimeStamp) / 1000
    console.log("BUILD STUDIO Time difference: " + tdiff)
    var preLoadTime = Date.now()
    setTimeout(this.initTrackPlay.bind(this, preLoadTime), 2000)
   },

  loadStudioWithPlayer: function(studioData) {
    var studioTemplateData = studioData.data
    players = this.buildPlayers(studioTemplateData)
    this.studioView.draw(players);
  },

  initTrackPlay: function(preLoadTime) {
    var tdiff = (Date.now() - this.studioCollectionModel.currentStudioState.data.syncTimeStamp) / 1000
    console.log("INITTRACKPLAY - Time difference: " + tdiff)
    var trackData = this.studioCollectionModel.syncedTrackData()
    this.setActiveTrack(trackData.currentTrack)
    var trackTime = trackData.currentTrackTime
    this.activePlayer.load() 
    this.boundListenerEvent = this.playActiveTrack.bind(this, trackTime, preLoadTime)
    this.activePlayer.addEventListener('load', this.boundListenerEvent, false)
    this.activePlayer.addEventListener('canplay', this.boundListenerEvent, false)
   },

   playActiveTrack: function(trackTime, preLoadTime) { 
      var afterLoadTime = Date.now()
      var tDiff = ((afterLoadTime - preLoadTime)/1000)
      console.log("Time difference at play track point: " + tDiff )
      if (trackTime === 0) {
        this.activePlayer.play()
      }
      else {
        var newTrackTime = ((afterLoadTime - preLoadTime)/1000) + trackTime
        this.activePlayer.play()
        this.activePlayer.currentTime = newTrackTime
      }
      this.activePlayer.removeEventListener('load', this.boundListenerEvent, false)
      this.activePlayer.removeEventListener('canplay', this.boundListenerEvent, false)
      this.studioCollectionModel.setStateSynced()
   },

   setActiveTrack: function(trackNumber) {
    document.querySelector('#' + trackNumber).classList.add('active')
    this.activePlayer = document.querySelector('.active')
   },

  newStudioAdded: function(studioData) {
    console.log("Controller notified of new studio")
    // check user page state
    // if user on collection page
    var temPlateData = { studioName: studioData.name, studioListenerCount: studioData.listenerCount }
    this.studioCollectionView.renderNewStudio(templateData)
  },

  // studio Removed
  studioRemoved: function(studioData) {
    var studioNameToRemove = studioData.name
    this.studioCollectionView.removeStudio(studioNameToRemove)
  },

  currentStudioStateUpdate: function(newStudioData) {
    console.log("Controller notified of current studio state update")
    this.studioCollectionView.updateCurrentStudio(newStudioData)
  },

  fetchCurrentTrackStatus: function() {
    var trackData = this.studioCollectionView.updatePlayerData()
    var trackData = { currentTrack: trackData.trackPlaying , currentTrackTime: trackData.trackTime }
    return trackData
  },

  updatePlayerState: function() {
    document.querySelector('.active').addEventListener('canplay', function() {  
      this.studioCollectionModel.requestSyncedData(this.studioCollectionModel.currentStudioState.name)
      var syncedStudioData = this.studioCollectionModel.currentStudioState
      var syncedTrackData = { currentTrack: syncedStudioData.data.currentTrack, currentTrackTime: syncedStudioData.data.currentTrackTime }
      document.querySelector('.active').play()
      this.syncPlayerState(syncedTrackData)
    }.bind(this))
  },

  syncPlayerState: function(trackData) {
    this.studioCollectionView.syncPlayer(trackData)
  },

  collectionStateUpdate: function() {
    if (this.currentUserState === "collectionPage") {
      var studioCollection = this.studioCollectionModel.state
      this.renderCollectionPage(studioCollection)
    }
  },

  renderCollectionPage: function() {
    this.currentUserState = "collectionPage"
    var studioCollection = this.studioCollectionModel.state
    studioCollection = locationManager.filterByDistance(studioCollection, 10000)
    // debugger
    var studioCollectionTemplateData = { studio: studioCollection }
    var studioCollectionTemplate = this.buildStudioCollectionTemplate(studioCollectionTemplateData)
    this.studioCollectionView.draw(studioCollectionTemplate)
  },

  initListenerToStudio: function(studioName) {
    this.studioCollectionModel.initStudioState(studioName)
  },
  
  updateTrackState: function() {
    this.studioCollectionView.updateTrackState(newTime)
    this.studioCollectionModel.currentStudioState.synced = true
  },


// Old
  createStudio: function(studioData) {
    this.studioCollectionModel.createNewStudio(studioData)
  },

  destroyStudio: function(studioData) {
    this.studioCollectionModel.removeStudio(studioData)
  },

  constructStudio: function(studioData) {
    if (this.currentUserState === "collectionPage") {
      this.renderStudioCollection()
      // this.studioCollectionView.appendStudio(studioData)
    }
  },

  destructStudio: function(studioData) {
    if (this.currentUserState === "collectionPage") {
      this.studioCollectionView.removeStudio(studioData)
    }
  },

  modifyRenderedStudio: function(studioData) {
    if (this.currentUserState === "collectionPage") {
      this.studioCollectionView.modifyStudio(studioData)
    }
  },

 fetchTrackState: function() {
    var trackData = this.fetchCurrentTrackStatus()
    this.studioCollectionModel.updateStudioTrack(trackData)
  },

  fetchStudioCollection: function() {
    return this.studioCollectionModel.state
  },

  buildStudioCollectionTemplate: function(studioCollection) {
    return HandlebarsTemplates['list_room'](studioCollection)
  },

  renderCollection: function() {
    this.currentUserState = "collectionPage"
    var tempCollection = this.fetchStudioCollection()
    $('.container ul').empty()
    for (var i = 0; i < tempCollection.length; i++) {
        this.studioCollectionView.renderStudioCollection(tempCollection[i])
    }
  },


  initStudio: function() {
    // this.songManager.searchSongs('2pac', function(tracks) {
    //  this.testSliceFirstSong(tracks)
    // }.bind(this))
    this.loadInitial();
  },

  buildPlayers: function(templateData) { // will take songData array
    return HandlebarsTemplates['player'](templateData)
  },

  setNewActiveTrack: function() {
    var currentTrackState = this.studioCollectionView.updateTrackState()
    if (this.validateTrackNumber(currentTrackState.trackPlaying)) {
      var newActiveTrackNumber = currentTrackState.trackPlaying + 1
    }
    else {
      var newActiveTrackNumber = 0
    }
    this.studioCollectionView.toggleActivePlayer(newActiveTrackNumber)
  },

  validateTrackNumber: function(trackNumberToValidate) {
    if (trackNumberToValidate === null) {
      return false
    }
    else if ((trackNumberToValidate < 3) && (trackNumberToValidate > -1)) {
      return true
    }
  },

  loadInitialStudio: function() {

  }
}


