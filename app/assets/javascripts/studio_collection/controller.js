StudioCollection.Controller = function(args) {
  this.studioModel = args.studioModel
  this.studioView = args.studioView
  this.studioCollectionModel = args.studioCollectionModel
  this.studioCollectionView = args.studioCollectionView
  this.tempPlaylist = []
}

StudioCollection.Controller.prototype = {
  initStudioCollection: function() {
    this.studioCollectionView.addUl()
  },

  fetchCollection: function() {
    return this.studioCollectionModel.state
  },

  renderCollection: function() {
    var tempCollection = this.fetchCollection()
    $('.container ul').empty()
    for (var i = 0; i < tempCollection.length; i++) {
        this.studioCollectionView.renderStudioCollection(tempCollection[i])
    }
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
    this.tempPlaylist.push(song)
    playlist = this.buildPlaylist(this.tempPlaylist)
    this.studioView.redrawPlaylist(playlist)
    //this.loadInitial();
    //Hit three songs and we proceed to load player
  },

  loadStudioWithPlayer: function() {
    song = {} //GET SONG FROM BACKEND
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