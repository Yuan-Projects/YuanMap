var myApp = angular.module("mainApp", ["amapServices"]);

myApp.controller("initCtrl", function ($scope, geoService) {
  var position = new AMap.LngLat(116.404,39.915);
  var mapOptions = {
    center: position,
    level: 12
  };
  var mapObj = new AMap.Map("mapContainer", mapOptions);
  $scope.mapObj = mapObj;

  mapObj.plugin(["AMap.ToolBar"], function(){
    var toolBarOptions = {};
    var isGeoSupported = ("geolocation" in navigator);
    if (isGeoSupported) {
      toolBarOptions.autoPosition = true;
    }
    var toolbar = new AMap.ToolBar(toolBarOptions);
    mapObj.addControl(toolbar);
    $scope.toolbar = toolbar;
  });

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