StudioCollection.Controller = function(args) {
  this.studioView = args.studioView
  this.studioCollectionModel = args.studioCollectionModel
  this.studioCollectionView = args.studioCollectionView

  this.currentUserState = "collectionPage"
  Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
  }

  this.tempPlaylist = []

}

StudioCollection.Controller.prototype = {
  createStudio: function(studioData) {
    this.studioCollectionModel.createNewStudio(studioData)
  },

  destroyStudio: function(studioData) {
    this.studioCollectionModel.removeStudio(studioData)
  },

  constructStudio: function(studioData) {
    if (this.currentUserState === "collectionPage") {
      this.studioCollectionView.appendStudio(studioData)
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
    this.studioCollectionModel.addListenerToStudio(studioName)
   },

  initStudioCollection: function() {
    this.studioCollectionView.addUl()
  },

  fetchStudioCollection: function() {
    return this.studioCollectionModel.state
  },

  renderCollection: function() {
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
  

  loadInitialStudioCollection: function(){
    console.log("loadInitial for StudioCollection controller")
  },

  // initStudio: function() {
  //   this.loadInitial();
  // },


  buildPlayer: function(song) {
    return HandlebarsTemplates['player'](song)
  },

  buildPlaylist: function(playlist) {
    // debugger
    playlist = { songs: playlist }
    return HandlebarsTemplates['song_basket_item'](playlist)
  },

  addSong: function(song) {

    // this.studioModel.addSong(song);
    // this.loadInitial();

    this.tempPlaylist.push(song)
    playlist = this.buildPlaylist(this.tempPlaylist)
    this.studioView.redrawPlaylist(playlist)
    //this.loadInitial();
    //Hit three songs and we proceed to load player

  },

  loadStudioWithPlayer: function(song) {
    // song = {} //GET SONG FROM BACKEND
    player = this.buildPlayer(song)
    this.studioView.draw(player);
  },

  //!!Currently not called
  loadInitialStudio: function() {
  //   console.log("loadInitial for studio controller")
  //   // playerTemplate = this.buildPlayer(this.model.getCurrentSong()[0]);
  //   // this.view.drawInitial(playerTemplate);
  }
}