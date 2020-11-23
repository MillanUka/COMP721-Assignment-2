# COMP721-Assignment-2

Files
File Name	Description
admin.html	- This is the HTML document with the visual frontend of the admin page

Admin.js	 - Contains the frontend code for the html page. Contains code for sending requests to the server.

AssignTaxiProcess.php -	Controls the assigning of a taxi. It sets the status of a record to “assigned” if the reference id exists. If there is no such record it will return an error.

booking.html - This is the HTML document with the visual frontend of the booking page

Booking.js	- Contains the frontend code for the booking. It contains code that sends request to the server to make a booking. It also has code to create 32 characters Unique user ID
BookingProcess.php - Contains code that controls the booking process. It handles inserting a record into the database

create_table.txt - Has the SQL command that was used to create the database

DataValidation.js - Contains the code, which handles validating the date and time of the booking and will control the error messages below the input boxes in the booking page. It also has some utility functions which format the date and time in NZST times.

ShowBookingsProcess.php - Contains the code which shows the bookings that are within two hours from the current time. 


Instructions:

Booking.html  
The booking page will have several input boxes.
First Name – Can input any string. 
Last Name - Can input any string.
Phone Number - Can input any string. 
Unit – Can only input positive whole numbers
Street Number - Can only input positive whole numbers
Street Name – Can input any string
Suburb - Can input any string
Destination Suburb  - Can input any string
Pickup Date – Can only enter a valid date. A valid date is a date is the current date or any future dates
Pickup Time – Can only enter a valid time. A valid time is a time that is either the current time or is pass the current time. 

You can reset the input by clicking reset. 

The user can click submit which submit and validate the user’s input and create a booking request with a unique 32 character reference ID. If the input is invalid it will return “invalid form”. If the booking was successful it will return “Thank you! Your booking reference number is <reference>. You will be picked up in front of your provided address at: <time> on <date>.”

Admin.html
The admin page will have two buttons and a text box. The first button is the “View All” button. Clicking this button will make the page display all unassigned bookings that have a pickup date and time within the next two hours. It will display them within a table. If there is no records that are within two hours of the current date, “No results” will be displayed.

There is a text box and another button. The text box is where the user can input the reference ID. Clicking on results in the table will fill the text box with the corresponding record’s reference id. Clicking “Assign Taxi” button will send an request to the server to update the status of the record with the reference id that you entered, to “assigned”. This will also update the table. If no record with that reference id was found or you have tried entering a reference Id of record that already has been assigned, it will return an error.
