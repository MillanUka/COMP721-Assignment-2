<?php
/*
Millan Uka
17981567
jcn0852@autuni.ac.nz
*/
require_once('../../conf/sqlinfo.inc.php');

$conn = @mysqli_connect(
    $sql_host,
    $sql_user,
    $sql_pass,
    $sql_db
);

//Get the reference ID from the client
$referenceID = mysqli_escape_string($conn, $_POST["referenceID"]);

$sql_tble = "BOOKING";

if (!$conn) {
    // Displays an error message if connection to the db failed
    echo "Database connection failure";
} else {
    //query to update the record's status
    $query = "UPDATE $sql_tble SET STATUS = 'assigned' WHERE REFERENCE_ID='$referenceID'";
    // executes the query and store results into the result pointer
    $result = mysqli_query($conn, $query);

    // checks if any rows were updated. Display an error message if no booking was affected
    if (mysqli_affected_rows($conn) <= 0) {
        echo "Please enter a valid Reference ID. You can click on the booking to get the ID.";
        return;
    }

    //display a success message
    echo "The  booking request $referenceID has been properly assigned";
}
