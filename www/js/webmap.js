//Creating a webmap on map element with view centre on PTA
	var map = L.map('map').setView([-25.731527, 28.446349], 16);

//
	L.tileLayer('https://api.mapbox.com/styles/v1/frikan/ciuy0zfu501aq2jl84yq2hxah/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZnJpa2FuIiwiYSI6ImNpc3dzc2FrbDAwMmEydHBkMnB2dXRjNXUifQ.Nf2lV7VkWbzMA5OTJxFesw', {
		maxZoom: 18,
	
	}).addTo(map);
	
//Geolocation with a marker and radius
	map.locate({setView: true, maxZoom: 13});
	function onLocationFound(e) {
    var radius = e.accuracy / 2;

    L.marker(e.latlng).addTo(map)
	 L.circle(e.latlng, radius).addTo(map);
}

map.on('locationfound', onLocationFound);

//Adds attribution to map from mapbox	
	var credits = L.control.attribution().addTo(map);
	credits.addAttribution('© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>');
	
/************************* SIDE NAV *****************************/
    /* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
    function openNav() {
        document.getElementById("sidenav").style.width = "250px";
        //document.getElementById("main").style.marginLeft = "250px";
        document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    }

    function closeNav() {
        document.getElementById("sidenav").style.width = "0";
        //document.getElementById("main").style.marginLeft= "0";
        document.body.style.backgroundColor = "white";
    }