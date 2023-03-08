var rentalArray;
var zipTextElem = document.querySelector("#zipEntryText");
var zipFormElem = document.querySelector("#zipForm");

// realtor API globals
var realtorSearchType = "rentalListings";
// note: I only have a limited number of uses of this API before I am charged.
// I have saved the data that results from this fetch in rentalArray.js
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

//save rental data to local storage
function saveRentalData() {
  if (rentalArray) {
    localStorage.setItem("rental-array", JSON.stringify(rentalArray));
    console.log("rentalArray stored in rental-array");
  } else {
    console.log("error in rentalArray");
  }
  
}

function getZip () {
  return realtorZip;
}

//load rental data from rentalArray into side bar
function displayRentalData() {
  //load rental 
}


//listen to submit button for zipcode search
zipFormElem.addEventListener('submit', function (event){
  event.preventDefault();
  var zipCodeText = zipTextElem.value;
  if (+zipCodeText) {
    console.log("zip code entered was:");
    console.log(zipCodeText);
    realtorZip = `&zipCode=${zipCodeText}`;
    console.log("going to fetch with zip:", realtorZip);
    getRentalData();
    saveRentalData();
    displayRentalData();
    console.log(rentalArray);
    
  }
  else {
    console.log("not a number");
  }
});

