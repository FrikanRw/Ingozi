function implementMap(){
//Creating a webmap on map element with view centre on Alaska

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


		//url of the geoserver
		var rootUrl = 'http://41.185.27.219:8080/geoserver/Devgroup2/ows';

		//Parameters for WFS
		var defaultParameters = {
		    service: 'WFS',
		    version: '1.0.0',
		    request: 'GetFeature',
		    typeName: 'Devgroup2:hazards',
		    maxFeatures: 200,
		    outputFormat: 'text/javascript',
		    format_options: 'callback: getJson'

		};

		var parameters = L.Util.extend(defaultParameters);
		//ajaxCAll
		$.ajax({
		    url: rootUrl + L.Util.getParamString(parameters),
		    dataType: 'jsonp',
		    jsonpCallback: 'getJson',
		    success: handleJson
		});
		//Styling options for webmarkers
		var geojsonElect= L.icon({
		    iconUrl: 'img/elect_icon.png',
		    iconSize:     [30, 38], // size of the icon
		    iconAnchor:   [15, 32], // point of the icon which will correspond to marker's location
		});

		var geojsonGarb=L.icon({
		    iconUrl: 'img/garbage_icon.png',
		    iconSize:     [38, 38], // size of the icon
		    iconAnchor:   [22, 22], // point of the icon which will correspond to marker's location
		});

		var geojsonOther=L.icon({
		    iconUrl: 'img/other_icon.png',
		    iconSize:     [38, 38], // size of the icon
		    iconAnchor:   [22, 22], // point of the icon which will correspond to marker's location
		});
		var geojsonSlope = L.icon({
		    iconUrl: 'img/slope_icon.png',
		    iconSize:     [38, 38], // size of the icon
		    iconAnchor:   [22, 22], // point of the icon which will correspond to marker's location
		});

		//populate the webmap with layer ajax call
		function handleJson(data) {

		  L.geoJson(data, {

		       onEachFeature: function (feature, my_Layer) {

		           my_Layer.bindPopup('<b><center>HAZARD INFORMATION</b>'+ '<center> Coordinates:' +feature.geometry.coordinates + '<center> Hazard Type:' +feature.properties.h_type + '<center> Reported by: ' + feature.properties.user_name);


		       },
		       // Switch function on hazard type
		       pointToLayer: function (feature, latlng) {
		         switch (feature.properties.h_type){
		           case "Electrical":
		           return L.marker(latlng, {icon:geojsonElect});
		           break;

		           case "Garbage":
		           return L.marker(latlng, {icon: geojsonGarb});
		           break;

		           case "Slope":
		           return L.marker(latlng, {icon: geojsonSlope});
		           break;

		           default:
		           return L.marker(latlng, {icon: geojsonOther});
		         }

		   }
		   }).addTo(map);
		};
}

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
