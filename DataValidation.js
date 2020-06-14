/*
Millan Uka
17981567
jcn0852@autuni.ac.nz
*/

//Check if the date and time of that the user entered was correct
function checkDateTimeValid() {
    //Get the current date and the entered date
    var currentDate = new Date();
    var date = new Date(document.getElementById("pickupDateInput").value);

    //format the dates into US time
    var formattedDate = formatDate(date, US_DATE_FORMAT);
    var formattedCurrentDate = formatDate(currentDate, US_DATE_FORMAT);
    
    //Check if the date is the current date 
    if (formattedDate == formattedCurrentDate) {

        var time = document.getElementById("pickupTimeInput").value;
        var currentTime = formatTime(currentDate);

        //Check if the time is equal or larger to the current time
        return (time >= currentTime)
    } else if(formattedDate > formattedCurrentDate) {
        //If the date is greater this means that the time will always be right so return true
        return true;
    }

    //all checks have failed
    return false;
}

//Checks if the form is valid when the user submits their booking 
function validateForm() {
    if (checkDateTimeValid()) {
        //If form date abd time are valid then make the post request 
        post();
    } else {
        //Display an error message if the form is not valid
        alert("invalid form.");
    }
}

//Checks if the date is valid and follow the right format
function isDateValid() {
    var date = new Date(document.getElementById("pickupDateInput").value);
    var currentDate = new Date();

    return (formatDate(date, US_DATE_FORMAT) >= formatDate(currentDate, US_DATE_FORMAT));
}

//Display the error message when the user enters an invalid date 
function alertIsDateValid() {
    if (!isDateValid()) {
        document.getElementById('errDate').innerHTML = "this is an invalid date";
    } else {
        document.getElementById('errDate').innerHTML = "";
    }
}

//Displays the error message when the user enters an invalid time 
function alertIsTimeValid() {
    if (!checkDateTimeValid()) {
        document.getElementById('errTime').innerHTML = "this is an invalid time";
    } else {
        document.getElementById('errTime').innerHTML = "";
    }
}

//Show the error message if they are applicabile
function checkDateTimeInputCorrect() {
    alertIsDateValid();
    alertIsTimeValid();
}


//Utility function that formats tbe time
function formatTime(date) {
    var time = "";
    var hours = date.getHours();
    var minutes = date.getMinutes();

    time += (hours < 10 ? "0" : "") + hours + ':';
    time += (minutes < 10 ? "0" : "") + minutes;
    return time;
}

//Utility function that formats the date. Can format to US and NZ dates
function formatDate(date, flag) {
    var dateStr = "";
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    switch (flag) {
        case 1:
            //US date format
            dateStr += year + "-" + (month < 10 ? "0" : "") + month + "-" + (day < 10 ? "0" : "") + day;
            break;
        case 2:
            //NZ date format
            dateStr += (day < 10 ? "0" : "") + day + "-" + (month < 10 ? "0" : "") + month + "-" + year ;
            break;
    }
    return dateStr;
}