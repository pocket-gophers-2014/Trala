Studio.Model = function(studio) {
  this.name = studio.name
  this.listeners = studio.data.listeners || 1
  this.playlist = studio.data.playlist
  this.active = true
  this.removelistener = false

  dislikeShelf = []
  likeShelf = []
 }

Studio.Model.prototype = {
  updateCurrentTrack: function(track) {

  },

  updateCurrentTrackTime: function() {

  },

  addUser: function( user ) {
    this.users.push(user)
  },

  addSong: function( song ) {
    this.playlist.push( song )
  },

  getCurrentSong: function() {
    // this is going to return the last song every time
    return this.playlist.slice(-1)
  },

  setlikeSongCount: function( user ) {
    this.dislikeShelf.push( user )
  },

  setDislikeSongCount: function( user ) {
    this.likeShelf.push( user )
  },

  changeSong: function() {
    var song = this.playlist.indexOf( song )
    return ( this.playlist[ song ] === 0 ) ? this.playlist[ song + 1 ] : this.playlist[ song ]
  }

}