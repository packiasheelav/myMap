<?php
  class Places {
    // Database
    private $conn;
    //DB Table
    private $table = 'places';

    //Properties
    public $id;
    public $place_id;
    public $title;
    public $description;
    public $latitude;
    public $longitude;
    public $opening_hrs;

    public function __construct($db) {
      $this->conn = $db;
    }

    // Read all
    public function readAll() {

      // query
      $query = 'SELECT id,place_id,title,description, latitude,longitude,opening_hrs from places ';

      // Prepare statement
      $stmt = $this->conn->prepare($query);

      // Execute query
      $stmt->execute();

      return $stmt;
    }
        // Create Post
        public function create() {
          // Create query
          $query = 'INSERT INTO ' . $this->table . ' 
          SET 
            place_id=:place_id, 
            title = :title, 
            description = :description, 
            latitude = :latitude, 
            longitude = :longitude, 
            opening_hrs = :opening_hrs';

          // Prepare statement
          $stmt = $this->conn->prepare($query);

          // Clean data
          $this->place_id = htmlspecialchars(strip_tags($this->place_id));
          $this->title = htmlspecialchars(strip_tags($this->title));
          $this->description = htmlspecialchars(strip_tags($this->description));
          $this->latitude = htmlspecialchars(strip_tags($this->latitude));
          $this->longitude = htmlspecialchars(strip_tags($this->longitude));
          $this->opening_hrs = htmlspecialchars(strip_tags($this->opening_hrs));

          // Bind data
          $stmt->bindParam(':place_id', $this->place_id);
          $stmt->bindParam(':title', $this->title);
          $stmt->bindParam(':description', $this->description);
          $stmt->bindParam(':latitude', $this->latitude);
          $stmt->bindParam(':longitude', $this->longitude);
          $stmt->bindParam(':opening_hrs', $this->opening_hrs);
          

          // Execute query
          if($stmt->execute()) {
            return true;
      }
      // Print error if something goes wrong
      printf("Error: %s.\n", $stmt->error);
      return false;
    }
    // Update Place
    public function update() {
      // Create query
      $query = 'UPDATE ' . $this->table . '
                            SET 
                              place_id = :place_id, 
                              title = :title, 
                              description = :description, 
                              latitude = :latitude,
                              longitude = :longitude, 
                              opening_hrs = :opening_hrs
                            WHERE id = :id';
      // Prepare statement
      $stmt = $this->conn->prepare($query);
      // Clean data
      $this->id = htmlspecialchars(strip_tags($this->id));
      $this->place_id = htmlspecialchars(strip_tags($this->place_id));
      $this->title = htmlspecialchars(strip_tags($this->title));
      $this->description = htmlspecialchars(strip_tags($this->description));
      $this->latitude = htmlspecialchars(strip_tags($this->latitude));
      $this->longitude = htmlspecialchars(strip_tags($this->longitude));
      $this->opening_hrs = htmlspecialchars(strip_tags($this->opening_hrs));
      $this->id = htmlspecialchars(strip_tags($this->id));

      // Bind data
      $stmt->bindParam(':place_id', $this->place_id);
      $stmt->bindParam(':title', $this->title);
      $stmt->bindParam(':description', $this->description);
      $stmt->bindParam(':latitude', $this->latitude);
      $stmt->bindParam(':longitude', $this->longitude);
      $stmt->bindParam(':opening_hrs', $this->opening_hrs);
      $stmt->bindParam(':id', $this->id);

      
      // Execute query
      if($stmt->execute()) {
        return true;
      }
      // Print error if something goes wrong
      printf("Error: %s.\n", $stmt->error);
      return false;
}
// Delete Post
    public function delete() {
          // Create query
          $query = 'DELETE FROM ' . $this->table . ' WHERE id = :id';
          // Prepare statement
          $stmt = $this->conn->prepare($query);
          // Clean data
          $this->id = htmlspecialchars(strip_tags($this->id));
          // Bind data
          $stmt->bindParam(':id', $this->id);
          // Execute query
          if($stmt->execute()) {
            return true;
          }
          // Print error if something goes wrong
          printf("Error: %s.\n", $stmt->error);
          return false;
    }


  }