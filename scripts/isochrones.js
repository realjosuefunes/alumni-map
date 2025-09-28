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
options.addEventListener("change", (event) => {
  clickedCat = event.target.name;
  checked = event.target.checked; // true or false
  // find a layer with a matching name:
  if (clickedCat in categories) {
    if (checked) {
      map.setLayoutProperty(clickedCat, "visibility", "visible");
      checked = true;
      console.log(clickedCat + " is " + checked);
    } else {
      map.setLayoutProperty(clickedCat, "visibility", "none");
      checked = false;
      console.log(clickedCat + " is " + checked);
    }
  } else {
    if (event.target[event.target.selectedIndex].getAttribute("name") === "location") {
      newLocation = event.target[event.target.selectedIndex].value;
      console.log("if - changed the newLocation to " + newLocation);
      if (newLocation === "california") {
        map.setLayoutProperty("global", "visibility", "none");
        map.setLayoutProperty("canada", "visibility", "none");
        map.setLayoutProperty("mexico", "visibility", "none");
        map.setLayoutProperty("us", "visibility", "none");
        map.setLayoutProperty(newLocation, "visibility", "visible");
        // fit map to california
        const bbox = [
          [-125.467429, 42.421704],
          [-111.75819, 31.887826],
        ];
        map.fitBounds(bbox, {
          padding: { top: 10, bottom: 25, left: 50, right: 5 },
        });
      } else if (newLocation === "us") {
        map.setLayoutProperty("global", "visibility", "none");
        map.setLayoutProperty("canada", "visibility", "none");
        map.setLayoutProperty("mexico", "visibility", "none");
        map.setLayoutProperty(newLocation, "visibility", "visible");
        // fit map to united states
        const bbox = [
          [-134.883194, 47.27223],
          [-73.310976, 21.686577],
        ];
        map.fitBounds(bbox, {
          padding: { top: 10, bottom: 25, left: 50, right: 5 },
        });
      } else if (newLocation === "north_america") {
        map.setLayoutProperty("global", "visibility", "none");
        map.setLayoutProperty("canada", "visibility", "visible");
        map.setLayoutProperty("mexico", "visibility", "visible");
        map.setLayoutProperty("us", "visibility", "visible");
        // fit map to north_america
        const bbox = [
          [-169.089758, 72.076309],
          [-56.576899, 13.783553],
        ];
        map.fitBounds(bbox, {
          padding: { top: 10, bottom: 25, left: 50, right: 5 },
        });
      } else if (newLocation === "global") {
        map.setLayoutProperty("canada", "visibility", "visible");
        map.setLayoutProperty("mexico", "visibility", "visible");
        map.setLayoutProperty("us", "visibility", "visible");
        map.setLayoutProperty("global", "visibility", "visible");
        // fit map to globe
        const bbox = [
          [-162.080036, -55],
          [176.16456799665184, -51.862338726085824],
        ];
        map.fitBounds(bbox, {
          padding: { top: 10, bottom: 25, left: 50, right: 5 },
        });
      }
    } else {
      // if the event is a new transit selection...
      if (event.target[event.target.selectedIndex].getAttribute("name") === "transit") {
        newTransit = event.target[event.target.selectedIndex].value;
        console.log(newTransit);
        // check if the transit source has been added
        // if no, add the geojson source; iterate to create a list of agencies; and add individual layers for each agency
        // if yes, change the selected layer to visible (and others invisible)
      }
    }
  }
});

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
