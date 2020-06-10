<?php
require_once('../../conf/sqlinfo.inc.php');

$conn = @mysqli_connect(
    $sql_host,
    $sql_user,
    $sql_pass,
    $sql_db
);

$sql_tble = "BOOKING";

if (!$conn) {
    // Displays an error message
    echo "Database connection failure";
} else {
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
        //DIsplay there is no bookings as the table was just created
        echo "There is no bookings.";
        return;
    }

    $query = "SELECT * FROM BOOKING WHERE STATUS = 'unassigned' AND PICKUP_DATE = DATE_FORMAT(NOW(), '%d-%m-%Y') AND PICKUP_TIME BETWEEN CURRENT_TIME() AND DATE_ADD(CURRENT_TIME(), INTERVAL 2 HOUR)";
    // executes the query and store results into the result pointer
    $result = mysqli_query($conn, $query);
    // checks if the execuion was successful
    if (!$result) {
        echo "There was an error with the query. Please try again";
        return;
    }

    $numRows = mysqli_num_rows($result);
    if ($numRows == 0) {
        //Display no results found error message
        echo "No results";
    } else {
        echo "<table class=\"table-success table-striped table-bordered table-hover\">";
        echo "<thead class=\"thead-dark\">";
        echo "<th>REFERENCE ID</th>";
        echo "<th>NAME</th>";
        echo "<th>PHONE NUMBER</th>";
        echo "<th>UNIT</th>";
        echo "<th>ADDRESS</th>";
        echo "<th>DESTINATION SUBURB</th>";
        echo "<th>PICKUP DATE</th>";
        echo "<th>PICKUP TIME</th>";
        echo "<th>BOOKING DATE</th>";
        echo "<th>BOOKING TIME</th>";
        echo "<th>STATUS</th>";
        
        echo "</thead>";

        // Go through all the results of the statuses and display them
        while ($row = mysqli_fetch_assoc($result)) {
            $referenceID =$row["REFERENCE_ID"]; 
            echo "<tr onclick=\"getReferenceID('$referenceID')\">";
            echo "<td>", $referenceID;
            echo "<td>", $row["FIRST_NAME"] , " ", $row["LAST_NAME"];
            echo "<td>", $row["PHONE_NUMBER"];
            echo "<td>", $row["UNIT"];
            echo "<td>", $row["STREET_NUMBER"], ", ", $row["STREET_NAME"], ", ", $row["SUBURB"];
            echo "<td>", $row["DESTINATION_SUBURB"];
            echo "<td>", $row["PICKUP_DATE"];
            echo "<td>", $row["PICKUP_TIME"];
            echo "<td>", $row["BOOKING_DATE"];
            echo "<td>", $row["BOOKING_TIME"];
            echo "<td id=\"$referenceID\">", $row["STATUS"];
            echo "</tr>";
        }
        echo "</table>";
    }
    // Frees up the memory, after using the result pointer
    mysqli_free_result($result);
}
