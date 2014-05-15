var myApp = angular.module("mainApp", ["amapServices"]);

myApp.controller("initCtrl", function ($scope, geoService, pluginService) {
  var position = new AMap.LngLat(116.404,39.915);
  var mapOptions = {
    center: position,
    level: 12
  };
  var mapObj = new AMap.Map("mapContainer", mapOptions);
  $scope.mapObj = mapObj;

  pluginService.toolBar($scope.mapObj);

  geoService.getUserCity($scope.mapObj, function(data) {
    $scope.currentCity = data.city;
  });

});

myApp.controller("searchCtrl", function ($scope, searchService) {
  $scope.data = {};

  $scope.submitForm = function(){
    searchService.placeSearch($scope.data.keyword, $scope.mapObj, $scope.currentCity, function(data) {
      console.log("Everything is OK:", data);
    });
  };
});