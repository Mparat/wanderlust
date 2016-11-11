app.controller('MainController', ['$scope', '$http', function($scope, $http) {
    $scope.searchText = '';
    $scope.addedLinks = [];
    $scope.searchPlace = function() {
      console.log('searching');
    		$http.post('api/Place/get', {query: $scope.searchText})
            .then(function(response) {
                returned_array = response.data.data;
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
    $scope.addImage = function(link) {
      if ($scope.addedLinks.includes(link)) {
        $scope.removeImage(link);
      }
      else {
        var add_button = document.getElementById(link);
        var image = document.getElementsByClassName(link)[0];
        $scope.addedLinks.push(link);
        add_button.className = 'fa fa-check-circle fa-lg';
        image.style.border = "5px solid";
        image.style.borderColor = "#ffcc00";
      }
    }

    $scope.removeImage = function(link) {
      index = $scope.addedLinks.indexOf(link);
      $scope.addedLinks.splice(index, 1);
      var add_button = document.getElementById(link);
      var image = document.getElementsByClassName(link)[0];
      add_button.className = 'fa fa-plus fa-lg';
      image.style.border = "none";
    }
}]);
