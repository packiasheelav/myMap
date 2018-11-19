# My Map

Adding , Editing , Deleting and displaying places on map using Google maps api.

## Project Modules

It has two modules. They are myMapWeb and myMapRest.

### myMapWeb
It is a front end layer developed using javascript,google maps api .It connects the backend myMapRest api .

### myMapRest
It's a backend rest api layer.It receives and process the front end layer myMapWeb requests.Its developed using PHP it connects a mySql Database.

### Prerequisites

PHP, apache web server, mySql Database

### Deployment

copy the myMapWeb and myMapRest folder under apache deployment folder(under htdocs)

create mymap database in mySql server.
Run the sql scripts on mySql database.

### Usage
How to open myMapWeb page 

```
http://localhost/myMapWeb/index.html
```

myMapRest specification :

Create entry 

```
http://localhost/myMapRest/api/places/create.php

Request body

{
"title": helsinki
"description": "Capital",
"latitude": "60.291235075943",
"longitude": "25.055163647471",
"opening_hrs": "0000-00-00 00:00:00"
}

response :{message: "Places Created"}
```

Read entry 

```
http://localhost/myMapRest/api/places/read.php
response :
{
"id": "72",
"place_id": "ChIJXZFklC70kUYR57eAlK-GEu0",
"title": "sssss",
"description": "sss",
"latitude": "60.168498898502",
"longitude": "24.941180493174",
"opening_hrs": "0000-00-00 00:00:00"
}
```

Delete Entry
```
http://localhost/myMapRest/api/places/delete.php
Request body

{
"id": "72"
}

response :{message: "Place Deleted"}
```

Update Entry
```
http://localhost/myMapRest/api/places/update.php
Request body

{
"id": "72",
"place_id": "ChIJXZFklC70kUYR57eAlK-GEu0",
"title": "Espoo",
"description": "Nice Place",
"latitude": "60.168498898502",
"longitude": "24.941180493174",
"opening_hrs": "0000-00-00 00:00:00"
}

response :{message: "Places Updated"}
```

