

function loadGoogle(googleRealtorZip) {

  var googleMapsAPI = 'AIzaSyAaJMDcgb5WJX0pY6sQMJdC4ZNVlyYzZkk'
  console.log("realtorZip is:", realtorZip);
  if (!googleRealtorZip) {
    console.log("googleRealtorZip undefined");
    return;
  }
  var googleZipcode = googleRealtorZip.split("=")[1]; // was 30318
  var googleURL = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=furniture_store+${googleZipcode}&key=${googleMapsAPI}&libraries=places`
  var furnitureEl = document.querySelector('.furniture')

  fetch(googleURL)
  .then(function (response) {
      return response.json()
  })
  .then(function (data) {
    
      var listings = data.results
      for (i = 0; i < 10 ; i++){
      var furnitureList = listings[i]
      console.log(furnitureList)
      var storeName = furnitureList.name
      furnitureEl.innerHTML += `<h1> ${storeName} </h1>`
      var storeAddress = furnitureList.formatted_address
      furnitureEl.innerHTML += `<h3> ${storeAddress} </h3>`
      if (furnitureList.photos !== undefined){
        var storePhotoref = furnitureList.photos[0].photo_reference
        var storeImg = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${storePhotoref}&key=${googleMapsAPI}`
        console.log(storeImg)
        furnitureEl.innerHTML += `<img src=${storeImg} />`  
      }
      else{
        furnitureEl.innerHTML += `<img src="./assets/icons/new-store.png"/>`
      } 
      }
  })
}

function initAutocomplete() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -33.8688, lng: 151.2195 },
    zoom: 13,
    mapTypeId: "roadmap",
  });
  // Create the search box and link it to the UI element.
  const input = document.getElementById("pac-input");
  const searchBox = new google.maps.places.SearchBox(input);

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  // Bias the SearchBox results towards current map's viewport.
  map.addListener("bounds_changed", () => {
    searchBox.setBounds(map.getBounds());
  });

  let markers = [];

  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    const bounds = new google.maps.LatLngBounds();

    places.forEach((place) => {
      if (!place.geometry || !place.geometry.location) {
        console.log("Returned place contains no geometry");
        return;
      }

      const icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25),
      };

      // Create a marker for each place.
      markers.push(
        new google.maps.Marker({
          map,
          icon,
          title: place.name,
          position: place.geometry.location,
        })
      );
      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}
window.initAutocomplete = initAutocomplete;

// loadGoogle();