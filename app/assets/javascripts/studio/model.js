Studio.Model = function(studio) {
  this.name = studio.name
  this.data = {}
  this.data.listeners = 1
  this.data.playlist = studio.data.playlist
  this.data.removelistener = false
  this.data.currentTrack = 0
  this.data.currentTrackTime = 0
  this.data.status = "synced"
 }

Studio.Model.prototype = {
}