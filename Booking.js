/*
Millan Uka
17981567
jcn0852@autuni.ac.nz
*/
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
    //Seeding the randomness with time and time since pageload to get a more random number

    var d = new Date().getTime();//Timestamp
    var d2 = (performance && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupporte
    //Gets a random character
    function getRandomChar(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    }
    //Replaces all the xs and y with a random character
    return 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[x]/g, getRandomChar);
}