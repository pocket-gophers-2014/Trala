Studio.Model = function(studioData) {
  this.name = studioData.name
  this.listeners = 0
  this.playlist = studioData.playlist
  this.active = true
 }

Studio.Model.prototype = {
  updateCurrentTrack: function(track) {

  },

  updateCurrentTrackTime: function() {
    
  },

  addUser: function(user) {
    this.users.push(user)
  },

  addSong: function(song) {
    this.playlist.push(song)
  },

  getCurrentSong: function() {
    return this.playlist.slice(-1)
  } 
}