app.controller('MainController', ['$scope', '$http', '$window', 'CommonData', function($scope, $http, $window, CommonData) {
    $scope.searchText = 'Morocco';
    $scope.addedCaptions = {};
    // Performs post seach query on database based on the search field.
    // Checks to see if any search results showed up, and if not, then we display a message to the user.
    // all images populated in gallery stored in dictioanary: {link: caption}
    $scope.searchPlace = function() {
    		$http.post('api/Place/get', {query: $scope.searchText})
            .then(function(response) {
                returned_array = response.data.data;
                if (returned_array.length == 0) {
                  $scope.alertVisibility = 'visible';
                }
                else {
                  $scope.alertVisibility = 'hidden';
                }
                $scope.images = {};
                for (var i = 0; i < returned_array.length; i++) {
                  images = returned_array[i]["images"];   // dictionary
                  for (var key in images) {
                    if (images[key] instanceof Array) {
                      caption = key;
                      img_links = images[key];  // list
                      for (var i = 0; i < img_links.length; i++) {
                        link = img_links[i];
                        $scope.images[link] = caption;
                      }
                    }
                  }
                }
    				})
    };

    // Called everytime the user selects an image.
    // If the image was already selected, then once clicked again, "deselect" is triggered by calling removeImage()
    $scope.addImage = function(link, caption) {
      if (caption in $scope.addedCaptions) {
        if ($scope.addedCaptions[caption].indexOf(link) != -1) {
          $scope.removeImage(link, caption);
        }
        else {
          $scope.addedCaptions[caption].push(link);
        }
      }
      else {
        $scope.addedCaptions[caption] = [link];
      }
      var add_button = document.getElementById(link);
      var image = document.getElementsByClassName(link)[0];
      add_button.className = 'fa fa-check-circle fa-lg';
      image.style.border = "5px solid";
      image.style.borderColor = "#ffcc00";
      CommonData.setSelected($scope.addedCaptions);
    }

    // Called when image is selected twice
    $scope.removeImage = function(link, caption) {
      var index = $scope.addedCaptions[caption].indexOf(link);
      $scope.addedCaptions[caption].splice(index, 1);
      if ($scope.addedCaptions[caption].length == 0) {
        delete $scope.addedCaptions[caption];
      }
      var add_button = document.getElementById(link);
      var image = document.getElementsByClassName(link)[0];
      add_button.className = 'fa fa-plus fa-lg';
      console.log(add_button);
      image.style.border = "none";
      CommonData.setSelected($scope.addedCaptions);
    }

    $scope.searchPlace();   // Gallery is prepopulated with search results from "Morocco"
}]);

app.controller('MapController', ['$scope', '$http', '$window', 'CommonData', '$q', function($scope, $http, $window, CommonData, $q) {
    // The following example creates complex markers to indicate beaches near
      // Sydney, NSW, Australia. Note that the anchor is set to (0,32) to correspond
      // to the base of the flagpole.
      $scope.markers = [];
      $scope.infowindows = [];
      $scope.initMap = function() {
        var first = $scope.selected[0];
        var baseLat = Number(first[1]);
        var baseLon = Number(first[2]);
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 5,
          center: {lat: baseLat, lng: baseLon}
        });

        $scope.setMarkers(map);
      }

      // Data for the markers consisting of a name, a LatLng and a zIndex for the
      // order in which these markers should display on top of each other.

      $scope.getImage = function(link) {
        var image = {
          url: link,
          // This marker is 20 pixels wide by 32 pixels high.
          size: new google.maps.Size(50, 30),
          // The origin for this image is (0, 0).
          origin: new google.maps.Point(0, 0),
          // The anchor for this image is the base of the flagpole at (0, 32).
          anchor: new google.maps.Point(0, 30)
        };
        return image;
      };

      $scope.setMarkers = function(map) {
        // Adds markers to the map.

        // Marker sizes are expressed as a Size of X,Y where the origin of the image
        // (0,0) is located in the top left of the image.

        // Origins, anchor positions and coordinates of the marker increase in the X
        // direction to the right and in the Y direction down.
        var image = {
          url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
          // This marker is 20 pixels wide by 32 pixels high.
          size: new google.maps.Size(20, 32),
          // The origin for this image is (0, 0).
          origin: new google.maps.Point(0, 0),
          // The anchor for this image is the base of the flagpole at (0, 32).
          anchor: new google.maps.Point(0, 32)
        };
        // Shapes define the clickable region of the icon. The type defines an HTML
        // <area> element 'poly' which traces out a polygon as a series of X,Y points.
        // The final coordinate closes the poly by connecting to the first coordinate.
        var shape = {
          coords: [1, 1, 1, 20, 18, 20, 18, 1],
          type: 'poly'
        };

        for (var i = 0; i < $scope.selected.length; i++) {
          var beach = $scope.selected[i];
          var image = $scope.getImage(beach[3]);
          caption = beach[0];
          link = beach[3];
          var contentString = '<div id="content">'+
              '<div id="siteNotice">'+
              '</div>'+
              '<h1 id="firstHeading" class="firstHeading">'+caption+'</h1>'+
              '<div id="bodyContent">'+
              '<p>View more: <a href="https://500px.com/search?q='+caption+'&type=photos&sort=relevance">'+
              '500px.com</a>'+
              '</p>'+
              '</div>'+
              '</div>';
          var marker = new google.maps.Marker({
            position: {lat: Number(beach[1]), lng: Number(beach[2])},
            map: map,
            title: beach[0],
          });
          $scope.infowindows.push(contentString);
          $scope.markers.push(marker);
          //Attach click event to the marker.
          var infowindow = new google.maps.InfoWindow();
          (function (marker) {
              google.maps.event.addListener(marker, "click", function (e) {
                var idx = $scope.markers.indexOf(marker);
                var string = $scope.infowindows[idx];
                //Wrap the content inside an HTML DIV in order to set height and width of InfoWindow.
                infowindow.setContent(string);
                infowindow.open(map, marker);
              });
          })(marker);
        }
      }

  $scope.images = CommonData.getSelected();

  // Perform async call of returning geocode per location in $scope.images using promises and $q.all
  $scope.selected = [];
  var promises = [];
  for (var caption in $scope.images) {
    query = caption.replace(' ', '+');
    var promise = $http.get('https://maps.googleapis.com/maps/api/geocode/json?address='+query+'&key=AIzaSyAWtWskzz3LEIHDhxtOgGE48gc6r_GlVpE');
    promises.push(promise);
  }
  $q.all(promises).then(function(response){
    if (!$scope.images[0]) {
      $scope.alertVisibility = 'visible';
    }
    else {
      $scope.alertVisibility = 'hidden';
    }
    for (var i = 0; i < response.length; i++) {
      var caption = response[i].data.results[0].formatted_address;
      var title = caption.split(",")[0] + "," + caption.split(",").pop();
      var lat = response[i].data.results[0].geometry.location.lat;
      var lon = response[i].data.results[0].geometry.location.lng;
      $scope.selected.push([title, lat, lon, $scope.images[title]]);
      if ($scope.selected.length==Object.keys($scope.images).length) {
        $scope.initMap();
      }
    }
  });

}]);
