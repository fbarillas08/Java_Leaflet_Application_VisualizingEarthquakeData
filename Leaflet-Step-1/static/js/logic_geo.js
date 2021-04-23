var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl).then(function(data) {
  var earthquakeData = data.features
  console.log(earthquakeData)  
  
  createFeatures(data.features);
});

// DEFINE MAP VARIABLE
var myMap = L.map("mapid", {
  center: [37.09, -95.71],
  zoom: 5  
});

// CREATE BASE MAPS: LIGHT MAP AND SATELLITE MAP
// function is called in line 96
function createMap(earthquakes) {

  // Define streetmap and darkmap layers
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/light-v10",
    accessToken: API_KEY
  }).addTo(myMap);

  var satellitemap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "satellite-v9",
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Light Map": lightmap,
    "Satellite": satellitemap
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create a layer control
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  })    
  .addTo(myMap);
}

// CREATE EARTHQUAKE FEATURES
// function is called as we read the geoJSON in line 8
function createFeatures(earthquakeData) {
  
  // For each feature create Popup leyend, size and color the marker
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3> Magnitude: " + feature.properties.mag +
      "</h3><hr><h3> Location: " + (feature.properties.place) + "</h3><hr><h3> Depth: "
      + (feature.geometry.coordinates[2])+ "</h3>");

      var magnitude = feature.properties.mag
      var depth = feature.geometry.coordinates[2]
      var longitude = feature.geometry.coordinates[0]
      var latitude = feature.geometry.coordinates[1]  
      
      // console.log(depth) it works!

    // Conditional coloring of circles based on depth
      var color = "";
      if(depth > 25){ color = "red";}
      else if (depth > 15){ color = "yellow";}
      else{ color = "green";}

    // Define the marker styling
      var markerOptions = {
        fillOpacity: 0.75,
        color: "white",
        fillColor: color,
        radius : magnitude * 50
      };
      
      

      
  }// End of onEachFeature
  
  // Create a GeoJSON layer 
      var earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature
      }) 
 
  // Send earthquakes layer to the createMap function
    createMap(earthquakes); 
  
}// End of CreateFeatures()




