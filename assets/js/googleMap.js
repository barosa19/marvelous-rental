var googleOBJ;
var googleMapsAPI = 'AIzaSyAaJMDcgb5WJX0pY6sQMJdC4ZNVlyYzZkk'
var locationsName = [];
var locationsArray = []
var iconURL = [];

function loadGoogle(googleRealtorZip) {
  if (googleTempOBJ) {
    googleOBJ = googleTempOBJ;
    return;
  }

  console.log("realtorZip is:", realtorZip);
  if (!googleRealtorZip) {
    console.log("googleRealtorZip undefined");
    return;
  }
  var googleZipcode = googleRealtorZip.split("=")[1]; // was 30318
  var googleURL = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=furniture_store+${googleZipcode}&key=${googleMapsAPI}&libraries=places`


  fetch(googleURL)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      googleOBJ = data
    })
}

function printGoogle() {
  var furnitureEl = document.querySelector('.furniture')
  var listings = googleOBJ //.results
  for (i = 0; i < 10; i++) {
    var furnitureList = listings[i]
    var storeName = furnitureList.name
    locationsName.push(storeName)
    var storeLoc = furnitureList.geometry.location
    locationsArray.push(storeLoc)
    var storeIcon = furnitureList.icon
    iconURL.push(storeIcon)
    furnitureEl.innerHTML += `<h1 class="has-text-weight-semibold  has-text-info-dark"> ${storeName} </h1>`
    var storeAddress = furnitureList.formatted_address
    furnitureEl.innerHTML += `<h3 class="has-text-weight-semibold  has-text-info-dark"> ${storeAddress} </h3>`
    if (furnitureList.photos !== undefined) {
      var storePhotoref = furnitureList.photos[0].photo_reference
      var storeImg = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${storePhotoref}&key=${googleMapsAPI}`
      console.log(storeImg)
      furnitureEl.innerHTML += `<img class="image is-96x96" src=${storeImg} />`
    }
    else {
      furnitureEl.innerHTML += `<img src="./assets/icons/new-store.png"/>`
    }
  }
  initMap(locationsArray[1]);
}

function initMap(loc) {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 3,
    center: loc, //TODO: need to decide what is center
  });
  const infoWindow = new google.maps.InfoWindow({
    content: "",
    disableAutoPan: true,
  });

  // Add some markers to the map.
  const markers = locationsArray.map((position, i) => {
    const marker = new google.maps.Marker({
      position,
      icon: iconURL[i],
    });

    // markers can only be keyboard focusable when they have click listeners
    // open info window when marker is clicked
    const label = locationsName[i]
    marker.addListener("click", () => {
      infoWindow.setContent(label);
      infoWindow.open(map, marker);
    });
    return marker;
  });

  // Add a marker clusterer to manage the markers.
  const markerCluster = new markerClusterer.MarkerClusterer({ map, markers });
}
