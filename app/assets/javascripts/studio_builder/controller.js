StudioBuilder.Controller = function(view, locationManager) {
	this.newStudioSubscriber = {}
	this.view = view
	this.locationManager = locationManager
	this.playlist = []
}

StudioBuilder.Controller.prototype = {
 addSong: function(song) {
    this.playlist.push(song)
    this.view.redrawPlaylist(this.buildPlaylist(this.playlist))
    if (this.playlist.length > 2) {
      this.notifyNewStudioSubscribers( this.packageStudioData() );
    }
  },
  
packageStudioData: function() {
  var name = String(Math.floor(Math.random() * 1000))
  var browserCoords = locationManager.getBrowserCoords()
  return ( {name: name, data: { playlist: this.playlist, browserCoords: browserCoords } } )
  },

  buildPlaylist: function(playlist) {
    playlist = { songs: playlist }
    return HandlebarsTemplates['song_basket_item'](playlist)
  },
 
  registerNewStudioSubscriber: function( controller, cbMethod ) {
  	this.newStudioSubscriber = { controller: controller, cbMethod: cbMethod }
  },

  notifyNewStudioSubscribers: function(studioData) {
    var controller = this.newStudioSubscriber.controller
    var cbMethod = controller[this.newStudioSubscriber.cbMethod]
    cbMethod.call( controller, studioData )
  }
}