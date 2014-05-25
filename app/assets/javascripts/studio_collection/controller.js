StudioCollection.Controller = function(args) {
  this.studioModel = args.studioModel
  this.studioView = args.studioView
  this.studioCollectionModel = args.studioCollectionModel
  this.studioCollectionView = args.studioCollectionView
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
    for (var i = 0; i < tempCollection.length; i++) {
        this.studioCollectionView.renderStudioCollection(tempCollection[i])
    }
  },

  loadInitialStudioCollection: function(){
    console.log("loadInitial for StudioCollection controller")
    // debugger
  },

  initStudio: function() {
    // this.songManager.searchSongs('2pac', function(tracks) {
    //  this.testSliceFirstSong(tracks)
    // }.bind(this))
    this.loadInitial();
  },
  
  buildPlayer: function(song) {
    return HandlebarsTemplates['player'](song)
  },
  
  addSong: function(song) {
    this.studioModel.addSong(song);
    // this.loadInitial();
  },

  loadInitialStudio: function() {
    console.log("loadInitial for studio controller")
    // debugger
    playerTemplate = this.buildPlayer(this.model.getCurrentSong()[0]);
    this.view.drawInitial(playerTemplate);
  }
}