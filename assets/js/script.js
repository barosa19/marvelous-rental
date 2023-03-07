var googleMapsAPI = 'AIzaSyAaJMDcgb5WJX0pY6sQMJdC4ZNVlyYzZkk'
var googleMapsURL = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+toronto+canadakey=AIzaSyAaJMDcgb5WJX0pY6sQMJdC4ZNVlyYzZkk&callback=initMap&libraries=places`
var testURL = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=furniture_store+toronto+canada&key=AIzaSyAaJMDcgb5WJX0pY6sQMJdC4ZNVlyYzZkk&libraries=places'
var rentalArray;


// realtor API globals
var realtorSearchType = "rentalListings";
// note: I only have a limited number of uses of this API before I am charged.
// I have saved the data that results from this fetch in exampleRentalObject.txt
// var realtorAPIKey = 'rapidapi-key=cec45dc12fmsh23476bc30edaa01p1ecc27jsnce4ee09a148a';
var realtorCity = "";//"&city=Atlanta";
var realtorState = "";//"&state=GA";
var realtorZip = "&zipCode=30009";
var realtorNumResults = "&limit=10";

// realtor API fetch data
function getRentalData() {

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'cec45dc12fmsh23476bc30edaa01p1ecc27jsnce4ee09a148a',
      'X-RapidAPI-Host': 'realty-mole-property-api.p.rapidapi.com'
    }
  };

  var realtorAPIUrl = "https://realty-mole-property-api.p.rapidapi.com/rentalListings?rapidapi-key=cec45dc12fmsh23476bc30edaa01p1ecc27jsnce4ee09a148a&zipCode=30009&status=Active&limit=10"

  fetch(`https://realty-mole-property-api.p.rapidapi.com/${realtorSearchType}?${realtorAPIKey}${realtorCity}${realtorState}${realtorZip}&status=Active${realtorNumResults}`, options)
    // .then(response => response.json())
    .then(function(response) {
      if (!response.ok) {
          console.log("error");
          throw response.json();
        }
      var respObj = response.json();
      console.log(respObj);
      return respObj;
      })
    .then(function (data) {
     //do stuff 
     console.log ("can do stuff with data");
    })
    .catch(err => console.error(err));

}


fetch(testURL)
.then(function (response) {

    return response.json()

})
.then(function (data) {
    console.log(data)
    var listings = data.results
    var firstBusiness = listings[5]
    console.log(firstBusiness)
    var firstName = firstBusiness.name
    bodyEl.innerHTML += `<h1> ${firstName} </h1>`
    console.log(firstBusiness)
    var firstAddress = firstBusiness.formatted_address
    bodyEl.innerHTML += `<h3> ${firstAddress} </h3>`
    var firstImage = firstBusiness.photos[0].photo_reference
    var testPhoto = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${firstImage}&key=${googleMapsAPI}`
    console.log(firstImage)
    bodyEl.innerHTML += `<img src=${testPhoto} />`
    
// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.
// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

results[9].photos[0].html_attributions[0]
'<a href="https://maps.google.com/maps/contrib/103363594491153903843">Todd Macchi</a>'

})
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
  }
  
  window.initMap = initMap;

function printRentalArray () {
  // import {rentalArray} from './rentalArray.js'; 
    console.log(tmpRentalArray);

}
  printRentalArray();
