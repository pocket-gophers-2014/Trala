StudioCollection.Controller = function(args) {
  this.studioModel = args.studioModel
  this.studioView = args.studioView
  this.studioCollectionModel = args.studioCollectionModel
  this.studioCollectionView = args.studioCollectionView
  this.currentUserState
  Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
  }
}

StudioCollection.Controller.prototype = {
  createStudio: function(studioData) {
    var studio = this.studioModel(studioData)
    this.studioCollectionModel.addStudio(studio)
  },

  destroyStudio: function(studioData) {
    this.studioCollectionModel.removeStudio(studioData)
  },

  collectionStateChange: function() {
    var currentCollectionState = this.fetchStudioCollection()
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

  // generateInitialCollectionState: function(){
  //   this.studioCollectionModel.initialStateGenerate
  // },

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
    // this.studioModel.addSong(song);
    // this.loadInitial();
  },

  loadInitialStudio: function() {
    console.log("loadInitial for studio controller")
    // debugger
    playerTemplate = this.buildPlayer(this.model.getCurrentSong()[0]);
    this.view.drawInitial(playerTemplate);
  }
}