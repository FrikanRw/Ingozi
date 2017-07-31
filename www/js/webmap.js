//Creating a webmap on map element with view centre on PTA
	var map = L.map('map').setView([-25.7487, 28.2380], 13);

//
	L.tileLayer('https://api.mapbox.com/styles/v1/frikan/ciuy0zfu501aq2jl84yq2hxah/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZnJpa2FuIiwiYSI6ImNpc3dzc2FrbDAwMmEydHBkMnB2dXRjNXUifQ.Nf2lV7VkWbzMA5OTJxFesw', {
		maxZoom: 18,
	
	}).addTo(map);

//Adds attribution to map from mapbox	
	var credits = L.control.attribution().addTo(map);
	credits.addAttribution('© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>');
	
//Geolocation - setting the map view to the location 
	map.locate({setView: true, maxZoom: 16});
	
//Add marker on detected location 
	function onLocationFound(e) {
    var radius = e.accuracy / 2;

    L.marker(e.latlng).addTo(map)
        //.bindPopup("You are within " + radius + " meters from this point").openPopup();

    L.circle(e.latlng, radius).addTo(map);
}

map.on('locationfound', onLocationFound);

//Error message if geolocation fails - error message is a system message 
	function onLocationError(e) {
    alert(e.message);
}

map.on('locationerror', onLocationError);





