<?php
session_start();
//database login info
	$host = '41.185.27.219';
	$port = '5432';
	$dbname = 'Devgroup2';
	$user = 'devgroup2';
	$password = 'hdU7eqKxW9kCdsG9';
	$credentials "user=devgroup2 password=hdU7eqKxW9kCdsG9";
//connect to postgresDB
  $conn = pg_connect("$host $port $dbname $credentials");
	if ($conn) {
	  echo "connected "
	}else {
		echo 'not connected'}


// Set variables for sql query
$id = "TEST"
$hazardType = $_POST['hazard_type']);
$userName = $_POST['username']);
$longitude =$_POST['long'];
$latitude =$_POST['long'];

//SQL INSERT INTO hazards(id, h_type, user_name, capture_t,geom) VALUES (1, 'Slope', 'Frikan', CURRENT_TIMESTAMP, ST_SetSRID(ST_MakePoint(-25.7670,28.2657),4326));
$query = "INSERT INTO hazards(id, h_type, user_name, capture_t,geom) VALUES('$id', '$hazardType', 'Frikan', CURRENT_TIMESTAMP, ST_SetSRID(ST_MakePoint($longitude,$latitude),4326));"

$result = pg_query($query);
        if (!$result) {
            $errormessage = pg_last_error();
            echo "Error with query: " . $errormessage;
            exit();
        }
        printf ("This Hazard has been recorded, Thank you!");
        pg_close();

?>
