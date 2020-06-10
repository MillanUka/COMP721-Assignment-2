function post() {
    var xhr = new XMLHttpRequest();

    var url = "BookingProcess.php";

    var firstName = document.getElementById("firstNameInput").value;
    var lastName = document.getElementById("lastNameInput").value;
    var phoneNumber = document.getElementById("phoneNumberInput").value;
    var unit = document.getElementById("unitInput").value;
    var streetNumber = document.getElementById("streetNumberInput").value;
    var streetName = document.getElementById("streetNameInput").value;
    var suburb = document.getElementById("suburbInput").value;
    var destSuburb = document.getElementById("destSuburbInput").value;
    var pickupDate = formatDate(new Date(document.getElementById("pickupDateInput").value), NZ_DATE_FORMAT);
    var pickupTime = document.getElementById("pickupTimeInput").value;
    var referenceNumber = generateUUID();

    var attributes = "referenceNumber=" + referenceNumber + "&firstName=" + firstName
        + "&lastName=" + lastName + "&phoneNumber=" + phoneNumber
        + "&unit=" + unit + "&streetNumber=" + streetNumber + "&streetName=" + streetName
        + "&suburb=" + suburb + "&destSuburb=" + destSuburb
        + "&pickupDate=" + pickupDate + "&pickupTime=" + pickupTime;

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    function onReadyStateChange(ev) {
        if (xhr.readyState == 4 && xhr.status == 200) {
            alert(xhr.responseText);
        }
    };

    xhr.onreadystatechange = onReadyStateChange;
    xhr.send(attributes);
}

/*
Creates an unique user id. 
*/
function generateUUID() {
    //Gets a random character
    function getRandomChar(c) {
        // Get a random number
        var r = Math.random() * 16;
        // DO some bitwise operations to the bits and convert them to a string
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    }
    //Replaces all the xs and y with a random character
    return 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[x]/g, getRandomChar);
}