function addlayer(){    //geoserver wfs layer allowing for data adding and layers

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
