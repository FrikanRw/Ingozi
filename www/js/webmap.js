$(document).ready( function() {

// =============================
// ========== LEAFLET ==========
// =============================

// initialize the map on the "map" div with a given center and zoom
map = L.map('map').setView([-25.731527, 28.446349], 16);

// load a tile layer
var OpenStreetMap =L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: 'Map data <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
      maxZoom: 20,
      minZoom: 11
    });
//OpenStreetMap.addTo(map)

var OpenTopoMap = L.tileLayer('http://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    {
        maxZoom: 20,
        attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });

var OpenStreetMap_BlackAndWhite = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
        maxZoom: 20,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

var mapbox = L.tileLayer('https://api.mapbox.com/styles/v1/frikan/ciuy0zfu501aq2jl84yq2hxah/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZnJpa2FuIiwiYSI6ImNpc3dzc2FrbDAwMmEydHBkMnB2dXRjNXUifQ.Nf2lV7VkWbzMA5OTJxFesw', {
		maxZoom: 18,

	});
mapbox.addTo(map)


//Geolocation with a marker and radius
	map.locate({setView: true, maxZoom: 13});
	function onLocationFound(e) {
    var radius = e.accuracy / 2;

    L.marker(e.latlng).addTo(map)
	 L.circle(e.latlng, radius).addTo(map);
}

map.on('locationfound', onLocationFound);
map.on('click', onMapClick);

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
});

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

//LOCATION
$(document).ready(function()
            { var longitude
              var latitude
              var accuracy


            function watchPosition() {
                var options = {
                  enableHighAccuracy: true,
                  maximumAge: 3600000,
                  enableHighAccuracy: true,
                  }

            var watchID = navigator.geolocation.watchPosition(geolocation, onError, options);

            function geolocation(position) {
              longitude = position.coords.longitude.toFixed(4);
              latitude = position.coords.latitude.toFixed(4);
              accuracy = position.coords.accuracy;
              
              document.getElementById("place").value=[latitude,longitude];

            }

                function onError(error) {
                    alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
            }

          }
            var geolocate = setInterval(watchPosition, 5000);

            if (accuracy == 5){
              clearInterval(geolocate);
            };

            $("#create").click(function(){
            var user=$("#username").val();
            var desc=$("#desc").val();
            var type=$("#type").val();
            var dataString="&User name="+user+"&Description="+desc+"&type="+type+"&insert=";
            if($.trim(user).length>0 & $.trim(Description).length>0 & $.trim(type).length>0)
            {
            $.ajax({
            type: "POST",
            url:"http://localhost/phonegap/database/insert.php",
            data: dataString,
            crossDomain: true,
            cache: false,
            beforeSend: function(){ $("#create").val('Connecting...');},
            success: function(data){
            if(data=="success")
            {
            alert("inserted");
            $("#create").val('submit');
            }
            else if(data=="error")
            {
            alert("error");
            }
            }
            });
            }return false;
            });
            });

function onMapClick(e) {
 latitude= e.latlng.lat.toFixed(4);
 longitude= e.latlng.lng.toFixed(4);

 document.getElementById('desti').value=[latitude, longitude]


 myIcon = L.icon({
   iconUrl: 'img/desti.svg',
   iconSize: [20, 20]
 });


 marker=L.marker([latitude, longitude],{icon: myIcon}).addTo(map);

}