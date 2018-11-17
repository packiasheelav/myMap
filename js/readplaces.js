function loadPlacesFromBackEnd(map) {
  fetchJSON("http://localhost/myMap/api/places/read.php", loadPlaces);

  //load already stored all places on the map
  function loadPlaces(placesList) {
    let service = new google.maps.places.PlacesService(map);
    // Loop through details
    for (let i = 0; i < placesList.length; i++) {
      service.getDetails({ placeId: placesList[i].place_id }, callback);
    }
  }

  function callback(result, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      createMarker(result);
    }
  }

   createMarker=(result)=> {
    let lat = result.geometry.location.lat();
    let lng = result.geometry.location.lng();
    let marker = new google.maps.Marker({
      map: map,
      position: result.geometry.location
    });

    let infoWindow = new google.maps.InfoWindow({
      content:
        '<div id="iw-container">' +
        '<div class="iw-title">Info</div>' +
        result.name +
        "<br>" +
        " Lat : " +
        lat +
        "<br>" +
        " Lng :" +
        lng +
        "            <input type='button' id='addPlace' value='Save' onClick=saveData(" +
        lat +
        "," +
        lng +
        ")'/>" +
        "            <input type='button' value='Delete' onclick='deleteData(" +
        lat +
        "," +
        lng +
        ")'/>" +
        "            <input type='button' value='edit' onclick='editData(" +
        lat +
        "," +
        lng +
        ")'/>" +
        "</div>" +
        "</div>"
    });

    google.maps.event.addListener(marker, "click", function() {
      infoWindow.open(map, this);
    });
  }
}
