var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Create map object 
var myMap = L.map("mapid", {
  center: [37.09, -95.71],
  zoom: 5  
});

// Create Light Map
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/light-v10",
    accessToken: API_KEY
}).addTo(myMap);


// Create Satellite Map  
  var satellitemap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "satellite-v9",
    accessToken: API_KEY
});

// Create Layer Control for Base Map
var baseMaps = {
  "Light Map": lightmap,
  "Satellite": satellitemap
};


// Read Earthquake Data into a data and earthquakeData variables
d3.json(queryUrl).then(function(data){   
  // console.log(data)

  var earthquakeData = data.features
  console.log(earthquakeData)  
})

function onEachFeature(feature, layer) {

  var magnitude = earthquakeData.properties.mag
  var depth = earthquakeData.geometry.coordinates[2]
  var longitude = earthquakeData.geometry.coordinates[0]
  var latitude = earthquakeData.geometry.coordinates[1]  
  
    console.log(magnitude)  
}  
  // layer.bindPopup("<h3> Magnitude: " + feature.properties.mag +
  //   "</h3><hr><h3> Location: " + (feature.properties.place) + "</h3><hr><h3> Depth: "
  //   + (feature.geometry.coordinates[2])+ "</h3>");

      

  //   // Conditional coloring of circles based on depth
  //   var color = "";
  //   if(depth > 25){ color = "red";}
  //   else if (depth > 15){ color = "yellow";}
  //   else{ color = "green";}
        
  //   // Size the marker based on the magnitude of the earthquake
  //   var markerOptions = {
  //     fillOpacity: 0.75,
  //     color: "white",
  //     fillColor: color,
  //     radius : magnitude * 2000      
// }



// var overlayMaps = {
//   Earthquakes: earthquakes
// };

L.control.layers(baseMaps,).addTo(myMap)

// Create a GeoJSON layer containing the features array on the earthquakeData object
// var earthquakes = L.geoJSON(data, {onEachFeature: onEachFeature}) 