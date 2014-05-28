StudioCollection.Controller = function(args) {
  this.studioView = args.studioView
  this.studioCollectionModel = args.studioCollectionModel
  this.studioCollectionView = args.studioCollectionView
  this.geoLocation = args.geoLocation
  this.currentUserState = ""
  this.tempPlaylist = []

}

StudioCollection.Controller.prototype = {
  // New Model and ORM response

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

  studioStateUpdate: function() {
    var studioCollection = this.studioCollectionModel.state
    this.renderCollectionPage(studioCollection)
  },

  renderCollectionPage: function(studioCollection) {
    console.log("Controller - Rendering collection page")
    this.currentUserState = "collectionPage"
    var studioCollectionTemplateData = { studio: studioCollection }
    var studioCollectionTemplate = this.buildStudioCollectionTemplate(studioCollection)
    this.studioCollectionView.renderCollectionPage(studioCollectionTemplate)
  },

  initListenerToStudio: function(studioName) {
    this.studioCollectionModel.initStudioState(studioName)
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

  initUserStudioState: function(studioName) {
    this.loadStudioWithPlayer(this.studioCollectionModel.fetchStudio(studioName).studio.playlist) 
    if (this.studioCollectionModel.currentStudioState.name === studioName) {
      this.playTrack()
    }     
    else {
      this.studioCollectionModel.addListenerToStudio(studioName)
      this.playTrack()
    }
   },



  playTrack: function() {
    console.log('playtrack outside')
    document.getElementsByClassName('active')[0].addEventListener('canplay', function() {
      if (this.studioCollectionModel.currentStudioState.synced) {
        document.getElementsByClassName('active')[0].play()
      }
      else {
        document.getElementsByClassName('active')[0].play()
        this.updateTrackState()    
        console.log('play track time diff: ' + (Date.now() - this.studioCollectionModel.syncSentTime) / 1000)
      }
    }.bind(this))
  },
  
  toggleTrackPlayer: function() {

  },

  fetchTrackState: function() {
    var trackData = this.fetchCurrentTrackStatus()
    this.studioCollectionModel.updateStudioTrack(trackData)
  },

  updateTrackState: function() {
    console.log('updatetrackstate')
    console.log(this.studioCollectionModel.syncSentTime)
    console.log(this.studioCollectionModel.currentStudioState.currentTrackTime)
    console.log('time diff: ' + (Date.now() - this.studioCollectionModel.syncSentTime) / 1000)
      var newTime = ((Date.now() - this.studioCollectionModel.syncSentTime)/ 1000) + this.studioCollectionModel.currentStudioState.currentTrackTime
      console.log(newTime)
      console.log('post time diff: ' + (Date.now() - this.studioCollectionModel.syncSentTime) / 1000)
      this.studioCollectionView.updateTrackState(newTime)
      this.studioCollectionModel.currentStudioState.synced = true
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

  buildPlayers: function(playlist) { // will take songData array
    return HandlebarsTemplates['player'](playlist)
  },

  buildPlaylist: function(list) {
    playlist = { songs: list }
    return HandlebarsTemplates['song_basket_item'](playlist)
  },

  addSong: function(song) {
    this.tempPlaylist.push(song)
    playlist = this.buildPlaylist(this.tempPlaylist)
    this.studioView.redrawPlaylist(playlist)
    if (this.tempPlaylist.length > 2) {
      var name = String(Math.floor(Math.random() * 1000))
      this.createStudio({name: name, data: { playlist: this.tempPlaylist }})
      this.tempPlaylist = []
      this.initUserStudioState(name)
    }
  },

  loadStudioWithPlayer: function(playlist) {
    newPlaylist = { playlist: playlist }
    players = this.buildPlayers(newPlaylist)
    this.studioView.draw(players);
    this.setNewActiveTrack()
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

// <div class="track-information">
//   <img src={{artwork_url}} alt="Album artwork not available">
//   <p>Now Playing: {{title}} </p>
//   <p>Sound Brought To You By: {{user.username}}</p>
// </div>