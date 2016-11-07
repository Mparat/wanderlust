app.controller('MainController', ['$scope', '$http', function($scope, $http) {
    $scope.searchText = '';
    $scope.addedCaptions = [];
    $scope.searchPlace = function() {
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
                // console.log($scope.images);
    				})
    };
    $scope.addImage = function(caption) {
      if ($scope.addedCaptions.includes(caption)) {
        $scope.removeImage(caption);
      }
      else {
        var add_button = document.getElementById(caption);
        $scope.addedCaptions.push(caption);
        add_button.className = 'fa fa-check-circle fa-lg';
      }
    }

    $scope.removeImage = function(caption) {
      index = $scope.addedCaptions.indexOf(caption);
      $scope.addedCaptions.splice(index, 1);
      var add_button = document.getElementById(caption);
      add_button.className = 'fa fa-plus fa-lg';
    }
}]);
