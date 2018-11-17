var map;
var infowindow;
var red_icon = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";

//initialize map
function initMap() {
  var vantaa = { lat: 60.29335239999999, lng: 25.037768599999936 };
  map = new google.maps.Map(document.getElementById("map"), {
    center: vantaa,
    zoom: 10,
    mapTypeControlOptions: {
      mapTypeIds: []
    }
  });

  //Associate the styled map with the MapTypeId and set it to display.
  changeMapStyle(map);

  //fetch places from backend
  loadPlacesFromBackEnd(map);

  searchPlaces(map);

  var markers = {};

  const getMarkerUniqueId = function(lat, lng) {
    return lat + "_" + lng;
  };

  var addMarker = google.maps.event.addListener(map, "click", function(e) {
    console.log(e);
    var lat = e.latLng.lat(); // lat of clicked point
    var lng = e.latLng.lng(); // lng of clicked point

    var markerId = getMarkerUniqueId(lat, lng); // an that will be used to cache this marker in markers object.
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(lat, lng),
      map: map,
      animation: google.maps.Animation.DROP,
      id: "marker_" + markerId,
      html:
        "    <div id='info_" +
        markerId +
        "'>\n" +
        '        <table class="map1">\n' +
        "            <tr>\n" +
        "                <td><a>Description:</a></td>\n" +
        "                <td><textarea  id='manual_description' placeholder='Description'></textarea></td></tr>\n" +
        "            <tr><td></td><td><input type='button' value='Save' onclick='saveData(" +
        lat +
        "," +
        lng +
        ")'/></td></tr>\n" +
        "        </table>\n" +
        "    </div>"
    });
    markers[markerId] = marker; // cache marker in markers object
    bindMarkerEvents(marker); // bind right click event to marker
    bindMarkerinfo(marker); // bind infowindow with click event to marker
  });

  var bindMarkerinfo = function(marker) {
    google.maps.event.addListener(marker, "click", function(point) {
      var markerId = getMarkerUniqueId(point.latLng.lat(), point.latLng.lng()); // get marker id by using clicked point's coordinate
      var marker = markers[markerId]; // find marker
      infowindow = new google.maps.InfoWindow();
      infowindow.setContent(marker.html);
      infowindow.open(map, marker);
      // removeMarker(marker, markerId); // remove it
    });
  };

  var bindMarkerEvents = function(marker) {
    google.maps.event.addListener(marker, "rightclick", function(point) {
      var markerId = getMarkerUniqueId(point.latLng.lat(), point.latLng.lng()); // get marker id by using clicked point's coordinate
      var marker = markers[markerId]; // find marker
      removeMarker(marker, markerId); // remove it
    });
  };

  /**
   * Removes given marker from map.
   * @param {!google.maps.Marker} marker A google.maps.Marker instance that will be removed.
   * @param {!string} markerId Id of marker.
   */
  var removeMarker = function(marker, markerId) {
    marker.setMap(null); // set markers setMap to null to remove it from map
    delete markers[markerId]; // delete marker instance from markers object
  };
}
