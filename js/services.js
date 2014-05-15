angular.module("amapServices", [])
.factory("searchService", function () {
  return {
    "placeSearch": function(keyword, mapObj, currentCity, successCallback, errorCallback) {
      mapObj.plugin(["AMap.PlaceSearch"],function(){
        var options = {
          city: currentCity
        };
        var placeSearch = new AMap.PlaceSearch(options);
        if (angular.isFunction(successCallback)) {
          AMap.event.addListener(placeSearch,"complete", successCallback);
        };
        if (angular.isFunction(errorCallback)) {
          AMap.event.addListener(placeSearch,"error", errorCallback);
        };
        placeSearch.search(keyword);
      });
    }
  };
})
.factory("geoService", function() {
  return {
    // Get current city by user IP address.
    "getUserCity": function(mapObj, successCallback, errorCallback) {
      mapObj.plugin(["AMap.CitySearch"], function(){
        var citySearch = new AMap.CitySearch();
        if (angular.isFunction(successCallback)) {
          AMap.event.addListener(citySearch,"complete", successCallback);
        }
        if (angular.isFunction(errorCallback)) {
          AMap.event.addListener(citySearch,"error", errorCallback);
        }
        citySearch.getLocalCity();
      });
    }
  };
});