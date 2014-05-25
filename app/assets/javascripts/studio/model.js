Studio.Model = function(studioName, studioData) {
  this.name = studioName
  this.active = studioData.active
  this.listeners = studioData.listeners
  this.playlist = studioData.playlist
}

Studio.Model.prototype = {
  updateCurrentTrack: function(track) {

  },

  updateCurrentTrackTime: function() {
    
  }
}