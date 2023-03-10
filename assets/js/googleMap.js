var googleOBJ;
var googleMapsAPI = 'AIzaSyAaJMDcgb5WJX0pY6sQMJdC4ZNVlyYzZkk'

function loadGoogle(googleRealtorZip) {
  if (googleTempOBJ){
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

function printGoogle(){
var furnitureEl = document.querySelector('.furniture')
var listings = googleOBJ //.results
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
}
// Initialize and add the map
function initMap() {
  // The location of Uluru
  const uluru = { lat: -25.344, lng: 131.031 };
  // The map, centered at Uluru
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: uluru,
  });
  // The marker, positioned at Uluru
  const marker = new google.maps.Marker({
    position: uluru,
    map: map,
  });
}

window.initMap = initMap;