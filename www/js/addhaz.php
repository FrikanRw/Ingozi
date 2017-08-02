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

//NEEDS coordinates


//SQL query for commit ****NEEDS ST_FUNCTION TO CONVERT COORDINATES TO RIGHT FORMAT
$query = "INSERT INTO hazards(id, h_type, user_name, capture_t) VALUES('" . $id . "', '" . $hazardType . "','".$hazardType."', CURRENT_TIMESTAMP, )";

//Check if query works
$result = pg_query($query);
        if (!$result) {
            $errormessage = pg_last_error();
            echo "Error with query: " . $errormessage;
            exit();
        }
        printf ("This Hazard has been recorded, Thank you!");
        pg_close();
        ?>
