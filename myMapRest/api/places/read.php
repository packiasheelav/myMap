<?php
  // Headers
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');

  include_once '../../config/Database.php';
  include_once '../../models/Places.php';

  // Instantiate DB & connect
  $database = new Database();
  $db = $database->connect();

  // Instantiate blog post object
  $places = new Places($db);

  // fetch places
  $result = $places->readAll();

  // Get row count
  $num = $result->rowCount();

  // Check if any posts
  if($num > 0) {
    // places array
    $places_arr = array();
    // $places_arr['data'] = array();

    while($row = $result->fetch(PDO::FETCH_ASSOC)) {
      extract($row);

      $place_item = array(
        'id' => $id,
        'place_id' => $place_id,
        'title' => $title,
        'description' => $description,
        'latitude' => $latitude,
        'longitude' => $longitude,
        'opening_hrs' => $opening_hrs
      );

      // Push to "data"
      array_push($places_arr, $place_item);
      // array_push($places_arr['data'], $place_item);
    }

    // Turn to JSON & output
    echo json_encode($places_arr);

  } else {
    // No entry
    echo json_encode(
      array('message' => 'No entry Found')
    );
  }