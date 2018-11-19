<?php
  // Headers
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');
  header('Access-Control-Allow-Methods: DELETE');
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
  $places->id = $data->id;
  // Delete post
  if($places->delete()) {
    echo json_encode(
      array('message' => 'Place deleted')
    );
  } else {
    echo json_encode(
      array('message' => 'Place not deleted')
    );
  }
