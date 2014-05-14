var myApp = angular.module("mainApp", []);

myApp.controller("initCtrl", function ($scope) {
  var position=new AMap.LngLat(116.404,39.915);
  var mapObj=new AMap.Map("mapContainer",{center:position});
});