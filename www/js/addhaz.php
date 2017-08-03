<?php
session_start();
//database login info
	$host        = "host=41.185.27.219";
	$port        = "port=5432";
	$dbname      = "dbname=devgroup2";
	$credentials = "user=devgroup2 password=hdU7eqKxW9kCdsG9";
	$db = pg_connect("$host $port $dbname $credentials");
echo "connected";
//sets json to db variables
$dbrecieve=$_POST['json'];
//decodes json recieved
$parsedjson=json_decode($dbrecieve);
echo"json read";
// Set variables for sql query
$id = "1";
$userName = $parsedjson->{"userName"};
$hazardType = $parsedjson->{"type"};
$longitude = $parsedjson->{"long"};
$latitude = $parsedjson->{"lat"};
$des= $parsedjson->{"desc"};
echo "variables loaded";
//SQL INSERT INTO hazards(id, h_type, user_name, capture_t,geom) VALUES (1, 'Slope', 'Frikan', CURRENT_TIMESTAMP, ST_SetSRID(ST_MakePoint(-25.7670,28.2657),4326));
$query = "INSERT INTO hazards(id, h_type, user_name, capture_t,geom,des)VALUES('".$id."', '".$hazardType."','".$userName."', CURRENT_TIMESTAMP, ST_SetSRID(ST_MakePoint('".$longitude."','".$latitude."'),4326),'".$des."');";
echo $query;
$result = pg_query($query);
        if (!$result) {
            $errormessage = pg_last_error();
            echo "Error with query: " . $errormessage;
            exit();
        }
        printf ("This Hazard has been recorded, Thank you!");
        pg_close();

?>
