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

function handleJson(data) {
    L.geoJson(data, {
        onEachFeature: onEachFeature,
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, geojsonMarkerOptions);
            //return L.marker(latlng);
        }
    }).addTo(map);
}
