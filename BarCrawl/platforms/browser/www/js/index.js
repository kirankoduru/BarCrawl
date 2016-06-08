/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

function getQueryVariable(variable){
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

var app = {
  // Application Constructor
  initialize: function() {
    this.bindEvents();

  },
  // Bind Event Listeners
  //
  // Bind any events that are required on startup. Common events are:
  // 'load', 'deviceready', 'offline', and 'online'.
  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },
  // deviceready Event Handler
  //
  // The scope of 'this' is the event. In order to call the 'receivedEvent'
  // function, we must explicitly call 'app.receivedEvent(...);'
  onDeviceReady: function() {

    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    navigator.geolocation.getCurrentPosition(success, error, options);
    function error(err){
      console.log(err);
    }
    function success(pos) {
      var crd = pos.coords;


      var latitude = crd.latitude;
      var longitude = crd.longitude;

<<<<<<< HEAD
      function success(pos) {
        var crd = pos.coords;


        var latitude = crd.latitude;
        var longitude = crd.longitude;

        console.log(longitude, latitude);
        
        require(['esri/urlUtils','esri/map','esri/tasks/RouteTask', 'dojo/domReady!', 'dijit/layout/ContentPane'], function(
              urlUtils,Map
          ){
          var map = new Map("map",{
              basemap:"streets",
              center:[longitude, latitude],
              zoom: 18
          });
        });

        require(["esri/tasks/RouteTask"], function(RouteTask) {
          
        });

      };
=======
      require(["esri/urlUtils",
        "esri/config",
        "esri/map",
        "esri/graphic",
        "esri/geometry/Point",
        "esri/tasks/RouteTask",
        "esri/tasks/RouteParameters",

        "esri/IdentityManager",

        "esri/tasks/FeatureSet",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/symbols/SimpleLineSymbol",

        "esri/Color",
        "dojo/_base/array",
        "dojo/on",
        "dojo/dom",
        "dijit/registry",
        "esri/arcgis/OAuthInfo",
        "esri/IdentityManager",
        "dijit/layout/BorderContainer",
        "dijit/layout/ContentPane",
        "dijit/form/HorizontalSlider",
        "dijit/form/HorizontalRuleLabels"], function (urlUtils, esriConfig, Map, Graphic, Point, RouteTask, RouteParameters, IdentityManager,
                                                      FeatureSet, SimpleMarkerSymbol, SimpleLineSymbol,
                                                      Color, array, on, dom, registry, OAuthInfo, esriId) {

        esriConfig.defaults.io.corsEnabledServers.push("https://route.arcgis.com");
        //   urlUtils.addProxyRule({
        //   urlPrefix: "route.arcgis.com",  
        //   proxyUrl: "/sproxy/"
        // });
        var map = new Map("map", {
          basemap: "streets",
          center: [longitude, latitude],
          zoom: 16
        });

        var bars = [];

        var routeParams = new RouteParameters();
        routeParams.stops = new FeatureSet();
        var routeTask = new RouteTask("https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World");
        var stopSymbol = new SimpleMarkerSymbol().setStyle(SimpleMarkerSymbol.STYLE_CIRCLE).setSize(12).setColor(new Color([255, 153, 0, 1]));
        var routeSymbol = {
          "Beer Route": new SimpleLineSymbol().setColor(new Color([0, 0, 255, 0.5])).setWidth(5)
        };
        routeParams.outSpatialReference = {"wkid": 102100};
        // routeTask.on('solve-complete', showRoute);
        map.on('load', onLoadMaps);

        function onLoadMaps(){
            var barCount = getQueryVariable('bars');
            var url = 'http://localhost:3000/search?latitude=' + latitude + '&longitude=' + longitude +'&size=' + barCount;
            jQuery.ajax({
                url: url,
                success: function (response) {

                    //coordinates of coord
                    var coords = new Point(longitude, latitude);
                    var symbol = stopSymbol;
                    var startGraphic = new Graphic(coords, stopSymbol);
                    startGraphic.symbol = stopSymbol;
                    bars.push(startGraphic);

                    response.businesses.forEach(function (business) {

                      var lat = business.location.coordinate.latitude;
                      var lon = business.location.coordinate.longitude;
                      
                      var geom = new Point(lon, lat);
                      var graphic = new Graphic(geom, stopSymbol);
                      graphic.symbol = stopSymbol;
                      bars.push(graphic);

                    });


                    for (var i = 0; i < bars.length; ++i) {
                      map.graphics.add(bars[i]);
                    };

                    for (var i = 1; i < bars.length; ++i) {
                      map.graphics.add(bars[i]);
                      routeParams.stops.features.push(
                          map.graphics.add(bars[i])
                      );
                    }
                    routeTask.solve(routeParams, showRoute, function (err) {
                      console.log(err);
                    });

                },
                async: false
            });
        }

        function clearRoutes() {
                for (var i = bars.length - 1; i >= 0; i--) {
                    map.graphics.remove(bars.splice(i, 1)[0]);
                }
                bars = [];
        }

        function showRoute(evt) {
              // clearRoutes();
              array.forEach(evt.routeResults, function (routeResult, i) {
                  ///symbol is not setting
                  bars.push(
                      map.graphics.add(
                          routeResult.route.setSymbol(routeSymbol['Beer Route'])
                      )
                  );
              });

        }

      });
>>>>>>> 1e1cbc738ca627b501ef28688300961d60fa9281

      function error(err) {
        console.warn('ERROR(' + err.code + '): ' + err.message);
      };

      // get current location and show on map
    }
  },


    // Update DOM on a Received Event
    receivedEvent: function(id) {
      var listeningElement = $(id + ' .listening');
      var receivedElement = $(id + ' .received');
      listeningElement.hide();
      receivedElement.show();
    }
  };

app.initialize();
