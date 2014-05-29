StudioCollection.Controller = function(args) {
  this.studioView = args.studioView
  this.studioCollectionModel = args.studioCollectionModel
  this.studioCollectionView = args.studioCollectionView
  this.locatonManager = args.locationManager
  this.currentUserState = ""
  this.tempPlaylist = []

}

StudioCollection.Controller.prototype = {
  // New Model and ORM response

  // Fresh Studio Creation
  initStudioCreation: function(studioData) {
    console.log('SCM - initScreation sdata: ' + studioData.name + '-' + studioData.data)
    this.studioCollectionModel.freshStudioCreation(studioData)
    this.initUserStudioState(studioData.name)
   // this.loadStudioWithPlayer(this.studioCollectionModel.currentStudioState)
   // this.studioCollectionView.toggleActivePlayer('0')
   // this.playTrack()
  },

  initUserStudioState: function(studioName) {
    this.studioCollectionModel.initStudioState(studioName)
    // var currentStudioData = this.studioCollectionModel.currentStudioState
    // this.loadStudioWithPlayer(currentStudioData)

    //  this.studioCollectionView.toggleActivePlayer('0')
    // this.updatePlayerState()
   },
   
   buildStudio: function(studioBuildData) {
    console.log("building STUDIO")
    this.loadStudioWithPlayer(studioBuildData)
    setTimeout(this.initTrackPlay.bind(this), 2000)
   },

  loadStudioWithPlayer: function(studioData) {
    var studioTemplateData = studioData.data
    players = this.buildPlayers(studioTemplateData)
    this.studioView.draw(players);
  },

   initTrackPlay: function() {
    var trackData = this.studioCollectionModel.sendTrackData()
    this.setActiveTrack(trackData.currentTrack)
    console.log("in inittrackplay!!")
    console.log(document.querySelector('.active'))
    $('.active').trigger('load')
    this.playActiveTrack(trackData.currentTrackTime)
   },

   playActiveTrack: function(trackTime) {
    var beforeLoadTime = Date.now()
    console.log("In playactive track!!!")
    console.log(document.querySelector('.active'))
    $('.active').bind('loadeddata', function(){
      console.log("PLAYER CAN PLAY NOW")
      var afterLoadTime = Date.now()
      var newTrackTime = ((afterLoadTime - beforeLoadTime)/1000) + trackTime
      $('.active').prop('currentTime' , newTrackTime)
      $('.active').trigger('play')
      this.studioCollectionModel.setStateSynced()
    }.bind(this, trackTime))
   },

   setActiveTrack: function(trackNumber) {
    document.querySelector('#' + trackNumber).classList.add('active')
   },
  // new Studio Added
  newStudioAdded: function(studioData) {
    console.log("Controller notified of new studio")
    // check user page state
    // if user on collection page
    var temPlateData = { studioName: studioData.name, studioListenerCount: studioData.listenerCount }
    this.studioCollectionView.renderNewStudio(templateData)
  },

  // studio Removed
  studioRemoved: function(studioData) {
    console.log("Controller notified of removed studio")
    // check user page state
    // if user on collection page
    var studioNameToRemove = studioData.name
    this.studioCollectionView.removeStudio(studioNameToRemove)
  },

  currentStudioStateUpdate: function(newStudioData) {
    console.log("Controller notified of current studio state update")
    this.studioCollectionView.updateCurrentStudio(newStudioData)
  },

  fetchCurrentTrackStatus: function() {
    console.log("Controller - fetched current track state")
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
    console.log("Controller - Rendering collection page")
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

  playTrack: function() {
    console.log('playtrack outside')
    document.getElementsByClassName('active')[0].addEventListener('canplay', function() {
        document.getElementsByClassName('active')[0].play()
    }.bind(this))
  },
  

  fetchTrackState: function() {
    var trackData = this.fetchCurrentTrackStatus()
    this.studioCollectionModel.updateStudioTrack(trackData)
  },

// <<<<<<< HEAD
// =======
//   updateTrackState: function(trackData) {
//     document.getElementById('audio_player').addEventListener('canplay', function(){
//       var newTime = ((Date.now() - trackData.timeStamp) / 1000) + trackData.trackTime
//       this.studioCollectionView.updateTrackState(newTime)
//       this.playTrack()
//     }.bind(this, trackData))
//    // this.playTrack()
//   },

//   fetchCurrentTrackStatus: function() {
//     var trackData = document.getElementById('audio_player').currentTime
//     return trackData
//   },

// >>>>>>> master
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


