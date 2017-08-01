    //geoserver wfs layer allowing for data adding and layers

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

var geojsonMarkerOptions = {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

function handleJson(data) {

  L.geoJson(data, {

       onEachFeature: function (feature, my_Layer) {

           my_Layer.bindPopup('<b><center>HAZARD INFORMATION</b>'+ '<center> Coordinates:' +feature.geometry.coordinates + '<center> Hazard Type:' +feature.properties.h_type + '<center> Reported by: ' + feature.properties.user_name);
           console.log(feature.geometry.coordinates[0].toString());

       },
       pointToLayer: function (feature, latlng) {

      return L.circleMarker(latlng, geojsonMarkerOptions);

   }
   }).addTo(map);
};
