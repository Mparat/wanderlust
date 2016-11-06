app.controller('MainController', ['$scope', '$http', function($scope, $http) {
    $scope.searchText = ''
    $scope.searchPlace = function() {
    		$http.post('api/Place/get', {query: $scope.searchText})
            .then(function(response) {
                console.log(response);
                returned_array = response.data.data;
                $scope.images = {};
                for (var i = 0; i < returned_array.length; i++) {
                  images = returned_array[i]["images"];   // dictionary
                  for (var key in images) {
                    caption = key;
                    img_link = images[key];
                    $scope.images[caption] = img_link;
                  }
                }
                console.log($scope.images);
    				})
    };
}]);
