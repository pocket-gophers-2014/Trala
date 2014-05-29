Data.SongManager = function() {
    this.clientId = "d74d7683ae187691bec3da7a1798abce"
    this.soundcloud = {}
    this.soundcloudUrl = "http://api.soundcloud.com/tracks/"
}

Data.SongManager.prototype = {
    init: function() {
        this.soundcloud = SC.initialize({
            client_id: this.clientId
        })
    },

  searchSongs: function(query, callback) {
    this.soundcloud.get(this.soundcloudUrl,
      {
        q: query,
        streamable: true
      },
      function(tracks) {
        tracks = this.appendClientIdToTracks( tracks )
        tracks = this.dropTracksWithoutArtwork( tracks )
        tracks = this.dropTracksWithoutUrl( tracks )
        tracks = this.editTitle( tracks )
        callback(tracks)
    	}.bind(this))
  },

  appendClientIdToTracks: function(tracks) {
    for (var i = 0; i < tracks.length; i++ ) {
      tracks[i].client_id = this.clientId
    }
    return tracks
  },

  dropTracksWithoutArtwork: function(tracks) {
    tracksWithArt = []
    for (var i = 0; i < tracks.length; i++ ) {
      if ( tracks[i].artwork_url !== null ) {
        tracksWithArt.push(tracks[i])
      }
    }
    return tracksWithArt
  },

  dropTracksWithoutUrl: function(tracks) {
    tracksWithUrl = []
    for (var i = 0; i < tracks.length; i++ ) {
      if ( tracks[i].stream_url !== null ) {
        tracksWithUrl.push(tracks[i])
      }
    }
    return tracksWithUrl
  },

  editTitle: function( tracks ) {
    allTracks = []
    for (var i = 0; i < tracks.length; i++ ) {
      tracks[i]["title"] = tracks[i]["title"].replace(/^-\d\d|-/, '')
      tracks[i]["title"] = tracks[i]["title"].substring( 0, 20 ) + " ..."
      allTracks.push( tracks[i] )
    }
    return allTracks
  }

}
