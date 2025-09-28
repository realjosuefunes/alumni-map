// isochrone start
// Target the params form in the HTML
const params = document.getElementById("params");

// Create variables to use in getIso()
const urlBase = "https://api.mapbox.com/isochrone/v1/mapbox/";
const lon = -122.1928997670688;
const lat = 37.761674505667884;
let profile = "walking";
let minutes = 30;

// Create a LngLat object to use in the marker initialization
const lngLat = {
  lon: lon,
  lat: lat,
};

// Create a function that sets up the Isochrone API query then makes a fetch call
async function getIso() {
  const query = await fetch(`${urlBase}${profile}/${lon},${lat}?contours_minutes=${minutes}&denoise=1&polygons=true&access_token=${mapboxgl.accessToken}`, { method: "GET" });
  console.log("iso api request" + profile + minutes);
  const data = await query.json();
  // Set the 'iso' source's data to what's returned by the API query
  map.getSource("iso").setData(data);
}

// When a user changes the value of profile or duration by clicking a button,
// change the parameter's value and make the API query again
params.addEventListener("change", (event) => {
  if (event.target[event.target.selectedIndex].getAttribute("name") === "profile") {
    profile = event.target[event.target.selectedIndex].value;
    console.log("if - changed the profile");
  } else if (event.target[event.target.selectedIndex].getAttribute("name") === "duration") {
    minutes = event.target[event.target.selectedIndex].value;
    console.log("else - changed the duration");
  }
  const bbox = [
    [-122.05593, 37.684425],
    [-122.352671, 37.815849],
  ];
  map.fitBounds(bbox, {
    padding: { top: 10, bottom: 25, left: 50, right: 5 },
  });
  getIso();
});
// isochrone end
