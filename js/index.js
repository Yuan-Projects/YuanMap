var myApp = angular.module("mainApp", []);

myApp.controller("initCtrl", function ($scope) {
  var position = new AMap.LngLat(116.404,39.915);
  var mapOptions = {
    center: position,
    level: 12
  };
  var mapObj = new AMap.Map("mapContainer", mapOptions);
  $scope.mapObj = mapObj;

  mapObj.plugin(["AMap.ToolBar", "AMap.CitySearch"], function(){

    var toolBarOptions = {};
    var isGeoSupported = ("geolocation" in navigator);
    if (isGeoSupported) {
      toolBarOptions.autoPosition = true;
    }
    var toolbar = new AMap.ToolBar(toolBarOptions);
    mapObj.addControl(toolbar);
    $scope.toolbar = toolbar;

    // Get current city by user IP address.
    var citySearch = new AMap.CitySearch();
    citySearch.getLocalCity();
    AMap.event.addListener(citySearch,"complete",function(data){
      $scope.currentCity = data.city;
    });
  });

});

myApp.controller("searchCtrl", function ($scope, $http) {

  $scope.data = {};

  $scope.submitForm = function(){
    $scope.mapObj.plugin(["AMap.PlaceSearch"],function(){
      var options = {
        city: $scope.currentCity
      };
      var placeSearch = new AMap.PlaceSearch(options);
      AMap.event.addListener(placeSearch,"complete",function(data){
        console.log("Result:", data);
      });
      placeSearch.search($scope.data.keyword);
    });
  };
});