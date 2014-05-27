Data.LocationManager = function() {
	this.startCoords = {}

	Number.prototype.toRad = function() {
  return this * Math.PI / 180;
	}
}

Data.LocationManager.prototype = {
	getCoords: function() {
		return this.startCoords;
	},

	registerCoords: function(){
		if( navigator.geolocation ){
			navigator.geolocation.getCurrentPosition(this._setCoords.bind(this))
		}
	},

	filterByDistance: function(studioCollection, distance) {
		var filteredStudioCollection = []
		studioCollection.forEach(function(studio) {
			if ( this._calcDistance(studio.coords, this.startCoords) < distance) {
				studio.distanceFromCurrentUser = distance
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
		var R = 6371; // km
  	var dLat = (lat2 - lat1).toRad();
  	var dLon = (lon2 - lon1).toRad(); 
  	var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          	Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
          	Math.sin(dLon / 2) * Math.sin(dLon / 2); 
  	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
  	var distance = R * c;
  return distance;
	},

	_setCoords: function( position ) {
		var latitude = position.coords.latitude
		var longitude = position.coords.longitude
		this.startCoords = { latitude: latitude, longitude: longitude }
	}
}