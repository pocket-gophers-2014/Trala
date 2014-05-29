Data.LocationManager = function() {
	this.startCoords = {}
}

Data.LocationManager.prototype = {
	getBrowserCoords: function() {
		return this.startCoords;
	},

	registerBrowserCoords: function(){
		if( navigator.geolocation ){
			navigator.geolocation.getCurrentPosition(this._setCoords.bind(this))
		}
	},

	filterByDistance: function(studioCollection, distance) {
		var filteredStudioCollection = []
		studioCollection.forEach(function(studio) {
			if (studio.data.browserCoords) {
				var distanceFromStudioStartLocation = this._calcDistance(studio.data.browserCoords, this.startCoords)
			}
			else {
				var distanceFromStudioStartLocation = 0
			}
			if ( distanceFromStudioStartLocation < distance) {
				studio.data.distanceFromStudioStartLocation = distanceFromStudioStartLocation.toFixed(0)
				filteredStudioCollection.push( studio )
			}
		}.bind(this))
		return filteredStudioCollection
	},

	_calcDistance: function( coordsA, coordsB ){
		var lat1 = coordsA.latitude
		var lon1 = coordsA.longitude
		var	lat2 = coordsB.latitude
		var lon2 = coordsB.longitude
		// var R = 6371; // km
		var R = 20925524
  	var dLat = this.toRadians(lat2 - lat1);
  	var dLon = this.toRadians(lon2 - lon1); 
  	var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          	Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) * 
          	Math.sin(dLon / 2) * Math.sin(dLon / 2); 
  	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
  	var distance = R * c;
  return distance;
	},

	_setCoords: function( position ) {
		var latitude = position.coords.latitude
		var longitude = position.coords.longitude
		this.startCoords = { latitude: latitude, longitude: longitude }
	},

	toRadians: function(num) {
		return num * Math.PI / 180
	}

}