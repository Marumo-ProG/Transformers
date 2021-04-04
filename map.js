var map = document.getElementById("map");

map.style.with = document.width;
map.style.height = "400px";

// making the map to display in the map section and also display my location
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

// making a variable for holding this coordinates
var _location = {
    lat: '',
    long: ''
}

function showPosition(position) {
  _location.lat = position.coords.latitude;
  _location.long = position.coords.longitude;

  // rendering our here maps
//Step 1: initialize communication with the platform
// Replace variable YOUR_API_KEY with your own apikey
var platform = new H.service.Platform({
    apikey: '0PwFEE6Nu-zaXR2TYKNF-1KRD2ALuCS_oXXqglESp9o'
});
var defaultLayers = platform.createDefaultLayers();
//Step 2: initialize a map - this map is centered over Europe
var map = new H.Map(document.getElementById('map'),
    defaultLayers.vector.normal.map,
    {
        center: { lat: _location.lat, lng: _location.long },
        zoom: 10,
        pixelRatio: window.devicePixelRatio || 1
    }
);
// This adds a resize listener to make sure that the map occupies the whole container
window.addEventListener('resize', () => map.getViewPort().resize());
//Step 3: make the map interactive
// MapEvents enables the event system
// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// Create the default UI components
var ui = H.ui.UI.createDefault(map, defaultLayers);

var LocationOfMarker = { lat: _location.lat, lng: _location.long };
// Create a marker icon from an image URL:
var icon = new H.map.Icon('https://cdn0.iconfinder.com/data/icons/map-location-solid-style/91/Map_-_Location_Solid_Style_28-256.png', { size: { w: 56, h: 56 } });

// Create a marker using the previously instantiated icon:
var marker = new H.map.Marker(LocationOfMarker, { icon: icon });

// Add the marker to the map:
map.addObject(marker);
}

getLocation();