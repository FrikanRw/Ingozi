/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
          },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();



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
              
              document.getElementById("coord").value=[latitude,longitude];

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



//CAMERA
var pictureSource;   // picture source
    var destinationType; // sets the format of returned value
    // Wait for Cordova to connect with the device
    document.addEventListener("deviceready", onDeviceReady, false);
    // Cordova is ready to be used!
    function onDeviceReady() {
        pictureSource = navigator.camera.PictureSourceType;
        destinationType = navigator.camera.DestinationType;
    }
    // Called when a photo is successfully retrieved       
    function onPhotoDataSuccess(imageData) {
        // Uncomment to view the base64 encoded image data
        //  console.log(imageData);
        // Get image handle
        var smallImage = document.getElementById('smallImage');
        // Unhide image elements      
        smallImage.style.display = 'block';
        // Show the captured photo
        // The inline CSS rules are used to resize the image
        smallImage.src = "data:image/jpeg;base64," + imageData;
    }
    // Called when a photo is successfully retrieved
    function onPhotoURISuccess(imageURI) {
        // Uncomment to view the image file URI
        //console.log(imageURI);
        // Get image handle  
        var largeImage = document.getElementById('largeImage');
        // Unhide image elements          
        largeImage.style.display = 'block';
        // Show the captured photo
        // The inline CSS rules are used to resize the image          
        largeImage.src = imageURI;
    }
    // A button will call this function
    function capturePhoto() {
        // Take picture using device camera and retrieve image as base64-encoded string
        navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
            destinationType: destinationType.DATA_URL
        });
}

// Called if something bad happens.
function onFail(message) {
    alert('Failed because: ' + message);
}