function checkDateTimeValid() {
    var currentDate = new Date();
    var date = new Date(document.getElementById("pickupDateInput").value);

    var formattedDate = formatDate(date, US_DATE_FORMAT);
    var formattedCurrentDate = formatDate(currentDate, US_DATE_FORMAT);
    if (formattedDate == formattedCurrentDate) {
        var time = document.getElementById("pickupTimeInput").value;
        var currentTime = formatTime(currentDate);
        
        return (time >= currentTime)
    } else if(formattedDate > formattedCurrentDate) {
        return true;
    }
    return false;
}

function validateForm() {
    if (checkDateTimeValid()) {
        post();
    } else {
        alert("invalid form.");
    }
}

function isDateValid() {
    var date = new Date(document.getElementById("pickupDateInput").value);
    var currentDate = new Date();

    console.log(formatDate(date, US_DATE_FORMAT));
    console.log(formatDate(currentDate, US_DATE_FORMAT));

    return (formatDate(date, US_DATE_FORMAT) >= formatDate(currentDate, US_DATE_FORMAT));
}

function alertIsDateValid() {
    if (!isDateValid()) {
        document.getElementById('errDate').innerHTML = "this is an invalid date";
    } else {
        document.getElementById('errDate').innerHTML = "";
    }
}

function alertIsTimeValid() {
    if (!checkDateTimeValid()) {
        document.getElementById('errTime').innerHTML = "this is an invalid time";
    } else {
        document.getElementById('errTime').innerHTML = "";
    }
}

function checkDateTimeInputCorrect() {
    alertIsDateValid();
    alertIsTimeValid();
}

function formatTime(date) {
    var time = "";
    var hours = date.getHours();
    var minutes = date.getMinutes();

    time += (hours < 10 ? "0" : "") + hours + ':';
    time += (minutes < 10 ? "0" : "") + minutes;
    return time;
}

function formatDate(date, flag) {
    var dateStr = "";
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    switch (flag) {
        case 1:
            dateStr += year + "-" + (month < 10 ? "0" : "") + month + "-" + (day < 10 ? "0" : "") + day;
            break;
        case 2:
            dateStr += (day < 10 ? "0" : "") + day + "-" + (month < 10 ? "0" : "") + month + "-" + year ;
            break;
    }
    return dateStr;
}