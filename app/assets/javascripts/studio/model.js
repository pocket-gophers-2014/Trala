Studio.Model = function(studioName, studioData) {
  this.name = studioName
  // this.active = studioData.active
  // this.listeners = studioData.listeners
  // this.playlist = studioData.playlist
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