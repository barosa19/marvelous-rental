var googleOBJ;
var googleMapsAPI = 'AIzaSyAaJMDcgb5WJX0pY6sQMJdC4ZNVlyYzZkk'
var locationsName = [];
var locationsArray = []
var iconURL = [];
var rentalCords = getRentalCoordsArray();
var rentalAddress = getRentalAddressArray();

//creates Google Maps
function initMap(loc) {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: loc, //TODO: need to decide what is center
  });
  const infoWindow = new google.maps.InfoWindow({
    content: "",
    disableAutoPan: true,
  });

  // Add some furniture markers to the map.
  const furnitureMarkers = locationsArray.map((position, i) => {
    const marker = new google.maps.Marker({
      position,
      icon: iconURL[i],
    });
    // open info window when marker is clicked
    const label = locationsName[i]
    marker.addListener("click", () => {
      infoWindow.setContent(label);
      infoWindow.open(map, marker);
    });
    return marker;
  });

  const image = {
    url: 'https://cdn-icons-png.flaticon.com/64/188/188473.png',
  }
  // Add some rental markers to the map.
  const rentalMarkers = rentalCords.map((position, i) => {
    const marker = new google.maps.Marker({
      position,
      icon: image
    });
    // open info window when marker is clicked
    const label = rentalAddress[i]
    marker.addListener("click", () => {
      infoWindow.setContent(label);
      infoWindow.open(map, marker);
    });
    return marker;
  });

  // Add a marker clusterer to manage the markers.
  const markerClusterFurniture = new markerClusterer.MarkerClusterer({ map, markers: furnitureMarkers });
  const markerClusterRental = new markerClusterer.MarkerClusterer({ map, markers: rentalMarkers });
}

//fetches data and saves object to local storage
function loadGoogle(googleRealtorZip) {
  // SAVE API calls
  /*   if (googleTempOBJ) {
      googleOBJ = googleTempOBJ;
      return;
    } */

  console.log("realtorZip is:", realtorZip);
  if (!googleRealtorZip) {
    return;
  }
  var googleZipcode = googleRealtorZip.split("=")[1];
  var googleURL = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=furniture_store+${googleZipcode}&key=${googleMapsAPI}&libraries=places`
  console.log(googleURL)

  fetch(googleURL)
    .then(function (response) {
      if (!response.ok) {
        console.log("error")
      }
      return response.json()
    })
    .then(function (data) {
      googleOBJ = data
      console.log(googleOBJ)
      printGoogle(googleOBJ)
      localStorage.setItem("googleOBJ", JSON.stringify(googleOBJ))
    })
}

//prints list of furniture stores near submitted zip code
function printGoogle(obj) {
  var furnitureEl = document.querySelector('.furniture')
  furnitureEl.textContent = ""
  locationsArray = []
  var listings = obj.results
  for (i = 0; i < 10; i++) {
    var furnitureList = listings[i];
    var storeName = furnitureList.name;
    locationsName.push(storeName);
    var storeLoc = furnitureList.geometry.location;
    locationsArray.push(storeLoc);
    var storeIcon = furnitureList.icon;
    iconURL.push(storeIcon);

    //create card
    var cardDiv = document.createElement("div");
    cardDiv.setAttribute("class", "card is-family-code is-flex-direction-column m-3 has-background-info-light is-size-7");

    //create card-section
    var cardSection = document.createElement("div");
    cardSection.setAttribute("class", "card-section has-text-weight-semibold  has-text-info-dark is-size-6");
    cardSection.setAttribute("id", `addressG${i}`);
    //set store address to cardSection's innerHTML
    var storeName = furnitureList.name;
    var storeAddress = furnitureList.formatted_address;
    cardSection.innerHTML = `${storeName}<br>${storeAddress}`; //

    //create card-stats
    var cardStats = document.createElement("div");
    cardStats.setAttribute("class", "card-stats");
    //create card-img
    var cardImg = document.createElement("img");
    cardImg.setAttribute("class", "card-img image-is-96x96");

    //set image if exist, otherwise icon
    if (furnitureList.photos !== undefined) {
      var storePhotoref = furnitureList.photos[0].photo_reference;
      var storeImg = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${storePhotoref}&key=${googleMapsAPI}`;
      cardImg.setAttribute("src", storeImg);
    }
    else {
      cardImg.setAttribute("src", "./assets/icons/new-store.png");
    }
    cardImg.setAttribute("alt", "rental property");

    //create card-info placeholder for formating purposes
    var cardInfo = document.createElement("div");
    cardInfo.setAttribute("class", "card-info");
    //add card-img and card-ingo to card-stats
    cardStats.appendChild(cardImg);
    cardStats.appendChild(cardInfo);
    //add card-stats to card-section
    cardSection.appendChild(cardStats);
    //add card-section to card
    cardDiv.appendChild(cardSection);
    //add card to furniture class
    furnitureEl.appendChild(cardDiv);
  }
  initMap(locationsArray[1]);
}

//loads list of furniture stores for previous zipcode from local storage
function loadFurnitureData() {
  //load previous fetch objects from localStorage
  googleOBJ = localStorage.getItem('googleOBJ');

  //if we have stored content, load it
  if (googleOBJ) {
    console.log("loading stored furniture data");
    googleOBJ = JSON.parse(googleOBJ);
    printGoogle(googleOBJ);


  } else {
    console.log("no data in localStorage for furniture");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadFurnitureData();
});