var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";




// Create Earthquake Layer
d3.json(queryUrl).then(function(data){  
  
  

  var earthquakeMarkers = []

  var earthquakeData = data.features
  //console.log(earthquakeData)  
  
  for (var i = 0; i < earthquakeData.length; i++) {
    
    // Extract key values from each earthquake
    var magnitude = earthquakeData[i].properties.mag
    var depth = earthquakeData[i].geometry.coordinates[2]
    var longitude = earthquakeData[i].geometry.coordinates[0]
    var latitude = earthquakeData[i].geometry.coordinates[1]  

    //console.log(earthquakeData[i])
    // console.log(depth)
    // console.log(longitude)
    // console.log(latitude)
    
    // Conditional coloring of circles based on depth
    var color = "";
    if (depth > 25){ color = "red";}
    else if (depth > 15){ color = "yellow";}
    else { color = "green";}

    // console.log(color)

    // Create a marker for each earthquake
    earthquakeMarkers.push(      
      L.circle([latitude,longitude], {
        fillOpacity: 0.75,
        color: "black",
        fillColor: color,
        radius: magnitude * 9000
      }).bindPopup("<h3> Magnitude: " + magnitude + "</h3><hr><h3> Depth: " + depth + "</h3>")    

    ) 
  }
  // console.log(earthquakeMarkers)
  
  var earthquakes = L.layerGroup(earthquakeMarkers);

  // Create Light Map
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
      tileSize: 512,
      maxZoom: 18,
      zoomOffset: -1,
      id: "mapbox/light-v10",
      accessToken: API_KEY
  });
  
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
  
  var overlayMaps = {
    Earthquakes: earthquakes
  };
  // Create map objedt and set default layers
  var myMap = L.map("mapid", {
    center: [37.09, -95.71],
    zoom: 5.5,
    layers: [lightmap, earthquakes]  
  });
  
  // Create Layer Control
  
  L.control.layers(baseMaps,overlayMaps,{
    collapsed: false
  })    
  .addTo(myMap);






})// End of .then



// .bindPopup("<h3> Magnitude: " + magnitude + "</h3><hr><h3> Depth: " + depth + "</h3>")


// Add all earthquake markers to a new layer group



