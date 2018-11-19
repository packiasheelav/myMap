const searchPlaces = () => {
  let label_input = document.getElementById("lable-input");
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(label_input);

  let input = document.getElementsByName("search__location")[0];
  let autocomplete = new google.maps.places.Autocomplete(input);

  autocomplete.bindTo("bounds", map);
  autocomplete.setFields(["address_components", "geometry", "icon", "name"]);

  autocomplete.addListener("place_changed", function() {
    let place = autocomplete.getPlace();

    if (!place.geometry) {
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }

    createMarkeronMap(
      getPlaceJson(place.geometry.location.lat(), place.geometry.location.lng())
    );
  });
};
