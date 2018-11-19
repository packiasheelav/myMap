let bindAddMarker = () => {
  let addMarker = google.maps.event.addListener(map, "click", function(e) {
    if (infowindow) infowindow.close(map);
    createMarkeronMap(getPlaceJson(e.latLng.lat(), e.latLng.lng()));
  });
};

let createMarkeronMap = place => {
  console.log(place);
  let id = place.id;
  let lat = place.latitude;
  let lng = place.longitude;
  let title = place.title;
  let description = place.description;

  let markerId = getMarkerUniqueId(lat, lng);
  let uniqueId = ("marker_" + markerId).split(".").join("");

  var html = getInfoWindowHtmlContent(
    lat,
    lng,
    uniqueId,
    title,
    description,
    id
  );

  //creating a marker for the selected location
  let marker = new google.maps.Marker({
    position: new google.maps.LatLng(lat, lng),
    map: map,
    animation: google.maps.Animation.DROP,
    id: uniqueId,
    html: html,
    pid: id
  });

  //store the marker in the array with unique id
  markers[markerId] = marker;
  bindMarkerinfo(marker);

  //add places to backend
  save = (uid, lat, lng) => {
    console.log(uid + "-title");
    let title = document.getElementById(uid + "-title").value;
    let description = document.getElementById(uid + "-description").value;
    addPlacesBackEnd(lat, lng, description, title, uid);
    marker = getMarkerObject(lat, lng);
    html = getInfoWindowHtmlContent(
      lat,
      lng,
      marker.id,
      title,
      description,
      marker.pid
    );
    marker.html = html;
    infowindow.close(map, marker);
  };

  removeMarker = (lat, lng, id) => {
    console.log(id);
    marker = getMarkerObject(lat, lng);
    marker.setMap(null);
    if (id !== -1) {
      deletePlacesBackEnd(id);
    }
    delete markers[getMarkerUniqueId(lat, lng)];
  };
};

//creating a event listener for marker object
let bindMarkerinfo = marker => {
  google.maps.event.addListener(marker, "click", function(mark) {
    let marker = getMarkerObject(mark.latLng.lat(), mark.latLng.lng());
    infowindow = new google.maps.InfoWindow();
    infowindow.setContent(marker.html);
    infowindow.open(map, marker);
  });
};

const getInfoWindowHtmlContent = (
  lat,
  lng,
  uniqueId,
  title,
  description,
  id
) => {
  return (
    "<div class='infowindow-content' id='" +
    uniqueId +
    "'>\n" +
    "      <h3 class='infowindow__heading''/>Info Window </h3>\n" +
    "      <table>\n" +
    "      <tr><td>lat:</td> <td><input class='infowindow__latitude' type='text' id='" +
    uniqueId +
    "-lat' value='" +
    lat +
    "'/> </td> </tr>\n" +
    "      <tr><td>lng:</td> <td><input class='infowindow__longitude' type='text' id='" +
    uniqueId +
    "-lng' value='" +
    lng +
    "'/> </td> </tr>\n" +
    "      <tr><td>Title:</td> <td><input class='infowindow__title' type='text' id='" +
    uniqueId +
    "-title' value='" +
    title +
    "' /> </td> </tr>\n" +
    "      <tr><td>Description :</td> <td><input class='infowindow__description' type='text' id='" +
    uniqueId +
    "-description' value='" +
    description +
    "'/> </td> </tr>\n" +
    "      <tr><td></td><td><input type='button' class='infowindow__save--button' value='Save' onclick='save(\"" +
    uniqueId +
    '",' +
    lat +
    "," +
    lng +
    ")'/><input class='infowindow__delete--button' type='button' value='Delete' onclick='removeMarker(" +
    lat +
    "," +
    lng +
    "," +
    id +
    ")'/></td></tr>" +
    "      </table>\n" +
    "    </div>"
  );
};

const getMarkerUniqueId = (lat, lng) => {
  return lat + "_";
};

const getMarkerObject = (lat, lng) => {
  markerId = getMarkerUniqueId(lat, lng);
  marker = markers[markerId];
  return marker;
};
