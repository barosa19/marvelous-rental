var googleMapsAPI = 'AIzaSyAaJMDcgb5WJX0pY6sQMJdC4ZNVlyYzZkk'
var googleMapsURL = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+toronto+canadakey=AIzaSyAaJMDcgb5WJX0pY6sQMJdC4ZNVlyYzZkk&callback=initMap&libraries=places`
var testURL = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=furniture_store+toronto+canada&key=AIzaSyAaJMDcgb5WJX0pY6sQMJdC4ZNVlyYzZkk&libraries=places'

fetch(testURL)
.then(function (response) {

    return response.json()

})
.then(function (data) {
    console.log(data)
})

function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: -33.8688, lng: 151.2195 },
      zoom: 13,
    });
    const input = document.getElementById("pac-input");
    // Specify just the place data fields that you need.
    const autocomplete = new google.maps.places.Autocomplete(input, {
      fields: ["place_id", "geometry", "formatted_address", "name"],
    });
  
    autocomplete.bindTo("bounds", map);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  
    const infowindow = new google.maps.InfoWindow();
    const infowindowContent = document.getElementById("infowindow-content");
  
    infowindow.setContent(infowindowContent);
  
    const marker = new google.maps.Marker({ map: map });
  
    marker.addListener("click", () => {
      infowindow.open(map, marker);
    });
    autocomplete.addListener("place_changed", () => {
      infowindow.close();
  
      const place = autocomplete.getPlace();
  
      if (!place.geometry || !place.geometry.location) {
        return;
      }
  
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }
  
      // Set the position of the marker using the place ID and location.
      // @ts-ignore This should be in @typings/googlemaps.
      marker.setPlace({
        placeId: place.place_id,
        location: place.geometry.location,
      });
      marker.setVisible(true);
      infowindowContent.children.namedItem("place-name").textContent = place.name;
      infowindowContent.children.namedItem("place-id").textContent =
        place.place_id;
      infowindowContent.children.namedItem("place-address").textContent =
        place.formatted_address;
      infowindow.open(map, marker);
    });
  }
  
  window.initMap = initMap;