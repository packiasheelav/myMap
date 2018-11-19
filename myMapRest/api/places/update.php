<?php
  // Headers
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');
  header('Access-Control-Allow-Methods: PUT');
  header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization,X-Requested-With');
  include_once '../../config/Database.php';
  include_once '../../models/Places.php';

  // Instantiate DB & connect
  $database = new Database();
  $db = $database->connect();

  // Instantiate blog post object
  $places = new Places($db);

  // Get raw posted data
  $data = json_decode(file_get_contents("php://input"));
    
  // Set ID to UPDATE
  $places->id = $data->id ;

  $places->place_id = $data->place_id ;
  $places->title = $data->title ;
  $places->description = $data->description ;
  $places->latitude = $data->latitude ;
  $places->longitude = $data->longitude ;
  $places->opening_hrs = $data->opening_hrs ;

  // Update place
  if($places->update()) {
    echo json_encode(
      array('message' => 'Places Updated')
      //array('message' => $data )
    );
  } else {
    echo json_encode(
      array('message' => 'Places not updated')
    );
  }
