var myApp = angular.module("mainApp", []);

myApp.controller("initCtrl", function ($scope) {
  var position = new AMap.LngLat(116.404,39.915);
  var mapOptions = {
    center: position,
    level: 12
  };
  var mapObj = new AMap.Map("mapContainer", mapOptions);
  $scope.mapObj = mapObj;

  mapObj.plugin(["AMap.ToolBar"], function(){

    var toolBarOptions = {};
    if ("geolocation" in navigator) {
      toolBarOptions.autoPosition = true;
    }
    var toolbar = new AMap.ToolBar(toolBarOptions);
    mapObj.addControl(toolbar);
    $scope.toolbar = toolbar;

  });

});

myApp.controller("searchCtrl", function ($scope, $http) {

  $scope.data = {};

  $scope.submitForm = function(){
    $scope.mapObj.plugin(["AMap.PlaceSearch"],function(){
      // TODO
      var options = {
        city: "北京市"
      };
      var placeSearch = new AMap.PlaceSearch(options);
      AMap.event.addListener(placeSearch,"complete",function(data){
        console.log("Result:", data);
      });
      placeSearch.search($scope.data.keyword);
    });
  };
});