let map;
let infowindow;
let red_icon = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
let markers = {};

//initialize map
initMap = () => {
  let vantaa = { lat: 60.29335239999999, lng: 25.037768599999936 };
  map = new google.maps.Map(document.getElementById("map"), {
    center: vantaa,
    zoom: 10,
    mapTypeControlOptions: {
      mapTypeIds: []
    }
  });

  setNewMapStyle();
  loadPlacesFromBackEnd();
  searchPlaces();
  bindAddMarker();
};
