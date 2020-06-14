<?php
/*
Millan Uka
17981567
jcn0852@autuni.ac.nz
*/
require_once('../../conf/sqlinfo.inc.php');

date_default_timezone_set("Pacific/Auckland");

$conn = @mysqli_connect(
    $sql_host,
    $sql_user,
    $sql_pass,
    $sql_db
);

// Get all the input from the user
$referenceNumber = $_POST["referenceNumber"];
$firstName = $_POST["firstName"];
$lastName = $_POST["lastName"];
$phoneNumber = $_POST["phoneNumber"];
$unit = $_POST["unit"];
$streetNumber = $_POST["streetNumber"];
$streetName = $_POST["streetName"];
$suburb = $_POST["suburb"];
$destSuburb = $_POST["destSuburb"];
$pickupDate = $_POST["pickupDate"];
$pickupTime = $_POST["pickupTime"];

//the default status is unassigned
$status = "unassigned";

//Get the current date and time
$bookingTime = date("H:i:s");
$bookingDate = date("d-m-Y", time());

$sql_tble = "BOOKING";

if (!$conn) {
    //Display error message if connection failed to db
    echo "Database connection failure";
} else {
    //CHeck if the table exists
    $checktable = mysqli_query($conn, "SHOW TABLES LIKE '$sql_tble'");
    $is_table_exists = mysqli_num_rows($checktable) > 0;
    if (!$is_table_exists) {
        //If it doesnt exist create the table
        $create_table = "CREATE TABLE $sql_tble (
            REFERENCE_ID VARCHAR(32) NOT NULL PRIMARY KEY,
            FIRST_NAME VARCHAR(255) NOT NULL,
            LAST_NAME VARCHAR(255) NOT NULL,
            PHONE_NUMBER VARCHAR(255) NOT NULL,
            UNIT INT,
            STREET_NUMBER INT NOT NULL,
            STREET_NAME VARCHAR(255) NOT NULL,
            SUBURB VARCHAR(255) NOT NULL,
            DESTINATION_SUBURB VARCHAR(255) NOT NULL,
            PICKUP_DATE VARCHAR(32) NOT NULL,
            PICKUP_TIME TIME NOT NULL,
            BOOKING_DATE VARCHAR(32) NOT NULL,
            BOOKING_TIME TIME NOT NULL,
            STATUS VARCHAR(40) NOT NULL)";

        mysqli_query($conn, $create_table)
            or die();
    }
    //If table exist make the query

    //Check if unit is empty. If it is make it 0
    $unit = empty($unit) ? 0 : $unit;

    $query = "INSERT INTO $sql_tble VALUES (
        '$referenceNumber',
        '$firstName',
        '$lastName',
        '$phoneNumber',
        $unit,
        $streetNumber,
        '$streetName',
        '$suburb',
        '$destSuburb',
        '$pickupDate',
        '$pickupTime:00',
        '$bookingDate',
        '$bookingTime',
        'unassigned'
    )";
    $result = mysqli_query($conn, $query);
    if ($result) {
        //Display the success message if the details of the bookings
        echo "Thank you! Your booking reference number is $referenceNumber. You will be picked up in front of your provided address at: $pickupTime on $pickupDate.";
    } else {
        //display an error message if there was an issue with the query
        echo "There was an error with the query. $query";
    }

    mysqli_close($conn);
}
