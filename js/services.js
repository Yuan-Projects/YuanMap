angular.module("amapServices", [])
.factory("coreService", function(){
  return {
    "initMap": function(successCallback) {
      var position = new AMap.LngLat(116.404,39.915);
      var mapOptions = {
        center: position,
        level: 12
      };
      var mapObj = new AMap.Map("mapContainer", mapOptions);
      if (angular.isFunction(successCallback)) {
        successCallback(mapObj);
      }
    }
  };
})
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
}).
factory("pluginService", function() {
  return {
    toolBar: function(mapObj) {
      mapObj.plugin(["AMap.ToolBar"], function(){
        var toolBarOptions = {};
        var isGeoSupported = ("geolocation" in navigator);
        if (isGeoSupported) {
          toolBarOptions.autoPosition = true;
        }
        var toolbar = new AMap.ToolBar(toolBarOptions);
        mapObj.addControl(toolbar);
      });
    }
  }
});