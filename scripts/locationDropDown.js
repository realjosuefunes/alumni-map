// when user interacts with map controls
options.addEventListener("change", (event) => {
  clickedCat = event.target.name;
  checked = event.target.checked; // true or false
  // show/hide layer with a matching name:
  if (clickedCat in categories) {
    if (checked && clickedCat === "ccpa_2026") {
      map.setLayoutProperty(clickedCat, "visibility", "visible");
      checked = true;
      console.log(clickedCat + " is " + checked);
      const bbox = [
        [-122.18882, 37.757372],
        [-122.196802, 37.76314],
      ];
      map.fitBounds(bbox, {
        padding: { top: 10, bottom: 25, left: 50, right: 5 },
      });
    } else if (checked) {
      map.setLayoutProperty(clickedCat, "visibility", "visible");
      checked = true;
      console.log(clickedCat + " is " + checked);
    } else {
      map.setLayoutProperty(clickedCat, "visibility", "none");
      checked = false;
      console.log(clickedCat + " is " + unchecked);
    }
  } else {
    // if not a category, do other stuff
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
      } else if (newLocation === "peralta") {
        map.setLayoutProperty("global", "visibility", "none");
        map.setLayoutProperty("canada", "visibility", "none");
        map.setLayoutProperty("mexico", "visibility", "none");
        map.setLayoutProperty(newLocation, "visibility", "visible");
        // fit map to united states
        const bbox = [
          [-122.329989, 37.89548],
          [-122.17103, 37.748219],
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
