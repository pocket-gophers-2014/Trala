Studio.Model = function(studio) {
  this.name = studio.name
  this.listeners = studio.data.listeners || 1
  this.playlist = studio.data.playlist
  this.active = true
  this.removelistener = false
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