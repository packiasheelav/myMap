let host = "localhost";
/*load all places from Backend*/
function loadPlacesFromBackEnd() {
  fetchJSON("http://" + host + "/myMapRest/api/places/read.php", loadPlaces);

  //load already stored all places on the map
  function loadPlaces(placesList) {
    for (let i = 0; i < placesList.length; i++) {
      console.log(
        "lng, lat  " + placesList[i].latitude + "  " + placesList[i].longitude
      );
      createMarkeronMap(placesList[i]);
    }
  }
}

/*add new placess to backend*/
function addPlacesBackEnd(lat, lng, description, title) {
  var json = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      place_id: "ChIJXZFklC70kUYR57eAlK-GEu0",
      title: title,
      description: description,
      latitude: lat,
      longitude: lng,
      opening_hrs: "0000-00-00 00:00:00"
    })
  };

  postJSON(
    "http://" + host + "/myMapRest/api/places/create.php",
    json,
    addPlacesResponse
  );

  function addPlacesResponse(responseJson) {
    console.log(responseJson);
  }
}

/*Delete place*/
function deletePlacesBackEnd(id) {
  var json = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id: id
    })
  };

  postJSON(
    "http://" + host + "/myMapRest/api/places/delete.php",
    json,
    deletePlacesResponse
  );

  function deletePlacesResponse(responseJson) {
    console.log(responseJson);
  }
}

const getPlaceJson = (lat, lng) => {
  return {
    id: -1,
    title: "",
    description: "",
    latitude: lat,
    longitude: lng
  };
};
