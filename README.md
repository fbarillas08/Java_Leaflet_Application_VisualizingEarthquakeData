# leaflet-challenge

This is Step-1 of the Leaflet Project.  It consists in rendering a geoJSON file containing the all earthquakes around the world in the past 7 days.
The rendering of the data is done with circular markers of various radii and colors.
  - The larger the radius of the circular marker, the more powerful was the magnitude of the earthquake.
  - The color of the circular marker depends on the depth of the earthquake.  The scale goes from Red, Yellow, to Green as the depth decreases.

The geoJSON is read and critical data including latitude, longitude, depth, and magnitude are extracted.

A popup message is attached to each feature to identify its magnitude and depth

A layer control is added to the map to switch between a light and a satellite version of the map

- Read the geoJSON file and assign it to a variable
- Extract the critical figures from the features data file
- Create the markers and its logical styling
- Save the markers into the earthquakes layer
- Create the base maps
- create the layer control for display
