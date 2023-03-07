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

function printRentalArray () {
  // import {rentalArray} from './rentalArray.js'; 
    console.log(tmpRentalArray);

}
  printRentalArray();
