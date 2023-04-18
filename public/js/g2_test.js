"use strict";

$(document).ready( () => {
  	// setting focus to arrival date
  	$("#firstName").focus();
		
  // event handler for submit button
  $("#information_form").submit( event => {
	let isInputValid = true

	// CHECKING FIRST NAME
	const firstName = $("#firstName").val().trim();
	if (firstName == "") {
		$(".error-firstname").text("* This field is required.");
		isInputValid = false;
	}
	else {
		$(".error-firstname").text("");
		}
	$("#firstName").val(firstName);


    // CHECKING LAST NAME
	const lastName = $("#lastName").val().trim();
	if (lastName == "") {
		$(".error-lastname").text("* This field is required.");
		isInputValid = false;
	}
	else {
		$(".error-lastname").text("");
		}
	$("#lastName").val(lastName);


    // CHECKING LICENSE NUMBER
    const licenseNo = $("#licenseNo").val().trim();
    if (licenseNo == "") {
		$(".error-licenseno").text("* This field is required.");
        isInputValid = false;
    }
	else if(!licenseNo.includes("$2") && licenseNo.length != 8) {
		$(".error-licenseno").text("* License number must be 8 characters.");
        isInputValid = false;
    }
    else {
		$(".error-licenseno").text("");
        }
    $("#licenseNo").val(licenseNo);


    // CHECKING AGE 
    const age = $("#age").val().trim();
    if (age == "") {
		$(".error-age").text("* This field is required.");
        isInputValid = false;
    }
    else if (isNaN(age)) {
		$(".error-age").text("* Age must be numeric.");
		isInputValid = false;
	}
    else {
		$(".error-age").text("");
        }

    $("#age").val(age);


    // CHECKING DATE OF BIRTH
	const dob = $("#dob").val().trim();
	if (dob == "") {
		$(".error-dob").text("* This field is required.");
		isInputValid = false;
	}
	else {
		$(".error-dob").text("");
		}
	$("#dob").val(dob);


	// CHECKING MAKE
	const make = $("#make").val().trim();
	if (make == "") {
		$(".error-make").text("* This field is required.");
		isInputValid = false;
	}
	else {
		$(".error-make").text("");
		}
	$("#make").val(make);

	// CHECKING MODEL
	const model = $("#model").val().trim();
	if (model == "") {
		$(".error-model").text("* This field is required.");
		isInputValid = false;
	}
	else {
		$(".error-model").text("");
		}
	$("#model").val(model);


	// CHECKING YEAR
	const year = $("#year").val().trim();
	if (year == "") {
		$(".error-year").text("* This field is required.");
		isInputValid = false;
	}
	else {
		$(".error-year").text("");
		}
	$("#year").val(year);


	// CHECKING PLATE NUMBER
	const plateNo = $("#plateNo").val().trim();
	if (plateNo == "") {
		$(".error-plateno").text("* This field is required.");
		isInputValid = false;
	}
	else {
		$(".error-plateno").text("");
		}
	$("#plateNo").val(plateNo);

	 // TIME SLOT
	 const appointmentDate = $("#appointmentDate").val().trim();
     const appointmentTime = $("#appointmentTime").val();

	 if (appointmentDate != '' && appointmentTime == -1) {
	   $(".error-appointmenttime").text("* This field is required.");
		   isInputValid = false;
	 }
	 else {
	   $(".error-appointmenttime").text("");
	 }


	if (isInputValid == false) {
		event.preventDefault();
	}
}); 


var dateSelect     = $('#flight-datepicker');
dateSelect.datepicker()
.on('change', function() {
		getAvailableTimeSlots();
  });

const getAvailableTimeSlots = async () => {
	const selectedDate = document.getElementById("appointmentDate").value;
	console.log("selectedDate", selectedDate);
	const timeSlotsSelect = document.getElementById("appointmentTime");
	try {
	  const isTimeSlotAvailable = true;
	  const response = await fetch(`/get-available-time-slots/${selectedDate}/${isTimeSlotAvailable}`);
	  const data = await response.json();
	  console.log("data", data);
  
	  timeSlotsSelect.innerHTML = "";
	  if (data.available_time_slots && data.available_time_slots.length > 0) {
		timeSlotsSelect.disabled = false;
		
		const option = document.createElement("option");
		option.value = "-1";
		option.text = "Select a time slot";
		timeSlotsSelect.appendChild(option);

		data.available_time_slots.forEach((timeSlot) => {
		  const option = document.createElement("option");
		  option.value = timeSlot._id;
		  option.text = timeSlot.appointmentTime;
		  timeSlotsSelect.appendChild(option);
		});
	  } else {
		timeSlotsSelect.options.length = 0;
		const option = document.createElement("option");
		option.value = "-1";
		option.text = "No available time slot";
		timeSlotsSelect.appendChild(option);
		timeSlotsSelect.disabled = true;
	  }
	} catch (error) {
	  console.error(error);
	}
  };
  
}); // end ready
