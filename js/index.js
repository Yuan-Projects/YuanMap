var myApp = angular.module("mainApp", ["amapServices"]);

myApp.controller("initCtrl", function ($scope, coreService, geoService, pluginService) {

  coreService.initMap(function(mapObj){
    $scope.mapObj = mapObj;
  });

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