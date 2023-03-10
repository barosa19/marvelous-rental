var bingFurnObj; //an object to hold the fetch list of furniture stores
var bingAPIKey = 'AiG4EPc6Fx1YkYlJcKu0BI-b5jWafgdxk4pQkefyU5iNYFa2wn0x24qyz8v4BY1d';

var bingZipLat;
var bingZipLong;

function fetchBingData () {
    var bingState = ""; //&adminDistrict=
    var bingCity = ""; //&locality=
    var bingZip = ("&postalCode="+"30009");
    var bingAddress = "" //&addressLine=

    var bingCoordsObj; // an array to hold the coordinates for the searched zipcode

    // extra options: &userLocation={userLocation}&userIp={userIp}&usermapView={usermapView}&includeNeighborhood={includeNeighborhood}&maxResults={maxResults}
    
    //get point location coordinates based on zip code
    fetch(`http://dev.virtualearth.net/REST/v1/Locations?countryRegion=US${bingState}${bingCity}${bingZip}${bingAddress}&key=${bingAPIKey}`)
        .then(function (response) {
            if (!response.ok) {
                console.log("error");
                throw response.json();
            }
            var  respBingObj = response.json();
            console.log(respBingObj);
            return respBingObj;
        })
        .then (function(data) {
            bingCoordsObj = data;
            console.log(bingCoordsObj);
            console.log("lat is:", bingCoordsObj.resourceSets[0].resources[0].point.coordinates[0]);
            console.log("long is:", bingCoordsObj.resourceSets[0].resources[0].point.coordinates[1]);
            bingZipLat = bingCoordsObj.resourceSets[0].resources[0].point.coordinates[0];
            bingZipLong = bingCoordsObj.resourceSets[0].resources[0].point.coordinates[1];

            //create variables for data fetch
            var bingQuery = ("?query=" + "furniture");
            var bingTypeSearch = "" //("&type="+"furniture");
            var bingPoint = ("&userLocation="+bingZipLat+","+bingZipLong);


            //fetch furniture data from bing API
            fetch (`https://dev.virtualearth.net/REST/v1/LocalSearch/${bingQuery}${bingTypeSearch}${bingPoint}&key=${bingAPIKey}`)
                .then (function(response) {
                    if (!response.ok) {
                        console.log("error");
                        throw response.json();
                    }
                    var respBingObj = response.json();
                    console.log(respBingObj);
                    return respBingObj;
                })
                .then (function(data) {
                    bingFurnObj = data;
                    console.log(data);
                    console.log("bing API loaded into global bingFurnObj");

                    //saveBingData()
                    displayBingData();
                    console.log(bingFurnObj);
                })
                .catch(err => console.error(err));
    
        })
        .catch(err => console.error(err));


}


function displayBingData () {
    var bingFurnArray = bingFurnObj.resourceSets[0].resources;
    var bingMapString = "https://dev.virtualearth.net/REST/v1/Imagery/Map/imagerySet";
    
    console.log("bingfurnarray is:", bingFurnArray);

    for (var i=0;i<bingFurnArray.length; i++){
        var pushPin;
        if (i==0){
            pushPin = "?pushpin=";
        } else {
            pushPin = "&pushpin=";
        }
        var coords = bingFurnArray[i].point.coordinates;
        // console.log(coords);
        var stringToAdd = `${pushPin}${coords[0]},${coords[1]}`;
        //`${pushPin}${coords[0]},${coords[1]};1;F${i+1}`;
        // console.log(`${pushPin}${coords[0]},${coords[1]};1;${i+1}`);
        bingMapString = bingMapString.concat(stringToAdd);
        console.log(bingMapString);
    }  
    //removed string &mapLayer={mapLayer}&format={format}&mapMetadata={mapMetadata}
    fetch(`${bingMapString}&key=${bingAPIKey}`)
    .then (function(response) {
        if (!response.ok) {
            console.log("error");
            throw response.json();
        }
        console.log(response);
    })
    .then (function (data){
        console.log("finishing map fetch");
    })
    .catch(err => console.error(err));
}

function getStreetView (streetAddress){
    var formattedAddress = "";
    var tmpAddress = streetAddress.split(" ");
    for (var i=0;i<tmpAddress.length; i++) {
        if (i==0){
            formattedAddress = tmpAddress[i]
        } else {
            formattedAddress = formattedAddress.concat("%20", tmpAddress[i]);
        }
        console.log(formattedAddress);
    }
    // fetch(`https://dev.virtualearth.net/REST/v1/Imagery/Map/Streetside/${streetAddress}?zoomlevel=0&key=${bingAPIKey}`)
}


function loadBingData (){
    bingFurnObj = localStorage.getItem('bing-array');
    if (bingFurnObj) {
        console.log("loading stored data for bind array");
        bingFurnObj = JSON.parse(bingFurnObj);
        displayBingData();
    }
    else {
        console.log("no data in localStorage for bing-array");
    }
}

loadBingData();