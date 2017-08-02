<?php
header("Access-Control-Allow-Origin: *");
//database login info
	$host = '41.185.27.219';
	$port = '5432';
	$dbname = 'Devgroup2';
	$user = 'devgroup2';
	$password = 'hdU7eqKxW9kCdsG9';

//connect to postgresDB
  $conn = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$password");
	if (!$conn) {
	  echo "Not connected : " . pg_error();
	  exit;
	}

// Set variables for sql query
$id = pg_escape_string($_POST['Id']);
$hazardType = pg_escape_string($_POST['hazard_type']);
$userName = pg_escape_string($_POST['username']);
$longitude =
$latitude =

//SQL INSERT INTO hazards(id, h_type, user_name, capture_t,geom) VALUES (1, 'Slope', 'Frikan', CURRENT_TIMESTAMP, ST_SetSRID(ST_MakePoint(-25.7670,28.2657),4326));
$query = "INSERT INTO hazards(id, h_type, user_name, capture_t,geom) VALUES(2, 'Garbage', 'Frikan', CURRENT_TIMESTAMP, ST_SetSRID(ST_MakePoint(-25.7670,28.2657),4326));"

$result = pg_query($query);
        if (!$result) {
            $errormessage = pg_last_error();
            echo "Error with query: " . $errormessage;
            exit();
        }
        printf ("This Hazard has been recorded, Thank you!");
        pg_close();

?>
