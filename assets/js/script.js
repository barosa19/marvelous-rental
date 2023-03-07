var googleMapsAPI = 'AIzaSyAaJMDcgb5WJX0pY6sQMJdC4ZNVlyYzZkk'
var googleMapsURL = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+toronto+canadakey=AIzaSyAaJMDcgb5WJX0pY6sQMJdC4ZNVlyYzZkk&callback=initMap&libraries=places`
var testURL = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=furniture_store+toronto+canada&key=AIzaSyAaJMDcgb5WJX0pY6sQMJdC4ZNVlyYzZkk&libraries=places'
var rentalArray;
var zipTextElem = document.querySelector("#zipEntryText");
// var zipSubmitElem = document.querySelector("#zipEntrySubmit");
var zipFormElem = document.querySelector("#zipForm");

// realtor API globals
var realtorSearchType = "rentalListings";
// note: I only have a limited number of uses of this API before I am charged.
// I have saved the data that results from this fetch in exampleRentalObject.txt
// var realtorAPIKey = 'rapidapi-key=cec45dc12fmsh23476bc30edaa01p1ecc27jsnce4ee09a148a';
var realtorCity = "";//"&city=Atlanta";
var realtorState = "";//"&state=GA";
var realtorZip = "&zipCode=30009";
var realtorNumResults = "&limit=10";

// fetch realtor API data
function getRentalData() {
  // temporarily use tmpRentalArray
  if (tmpRentalArray) {
    rentalArray = tmpRentalArray;
    return;
  }
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'cec45dc12fmsh23476bc30edaa01p1ecc27jsnce4ee09a148a',
      'X-RapidAPI-Host': 'realty-mole-property-api.p.rapidapi.com'
    }
  };
  //fetch data from API
  fetch(`https://realty-mole-property-api.p.rapidapi.com/${realtorSearchType}?${realtorAPIKey}${realtorCity}${realtorState}${realtorZip}&status=Active${realtorNumResults}`, options)
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
     rentalArray = data;
     console.log ("API successfully loaded into global rentalArray");
    })
    .catch(err => console.error(err));
}

//listen to submit button for zipcode search
zipFormElem.addEventListener('submit', function (event){
  event.preventDefault();
  var zipCodeText = zipTextElem.value;
  if (+zipCodeText) {
    console.log("zip code entered was:");
    console.log(zipCodeText);
    getRentalData();
    console.log(rentalArray);
  }
  else {
    console.log("not a number");
  }
});
