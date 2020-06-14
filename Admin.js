/*
Millan Uka
17981567
jcn0852@autuni.ac.nz
*/
function createShowBookingsRequest() {
    var xhr = new XMLHttpRequest();

    var url = "ShowBookingsProcess.php";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    function onReadyStateChange(ev) {
        if (xhr.readyState == 4 && xhr.status == 200) {
            document.getElementById("results").innerHTML = xhr.responseText;
        }
    };

    xhr.onreadystatechange = onReadyStateChange;
    xhr.send(null);
}

function assignTaxiToBooking() {
    var xhr = new XMLHttpRequest();

    var url = "AssignTaxiProcess.php";
    var attributes = "referenceID=" + document.getElementById("assignTaxi").value;

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    function onReadyStateChange(ev) {
        if (xhr.readyState == 4 && xhr.status == 200) {
            alert(xhr.responseText);
            //Update the booking in the table with the new status
            if (document.getElementById(document.getElementById("assignTaxi").value)!= null)
                document.getElementById(document.getElementById("assignTaxi").value).innerHTML = "assigned";
        }
    };

    xhr.onreadystatechange = onReadyStateChange;
    xhr.send(attributes);
}

function getReferenceID(id) {
    document.getElementById("assignTaxi").value = id;
}