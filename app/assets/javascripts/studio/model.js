Studio.Model = function(studio) {
  this.name = studio.name
  this.data = {}
  this.data.listenerCount = studio.data.listenerCount || 0
  this.data.playlist = studio.data.playlist
  this.data.currentTrack = studio.data.currentTrack || "track0"
  this.data.currentTrackTime = studio.data.currentTrackTime || 0
  this.data.status = studio.data.status || "synced"
  this.data.syncTimeStamp = studio.data.syncTimeStamp || 0
  this.data.browserCoords = studio.data.browserCoords
 }

Studio.Model.prototype = {
}