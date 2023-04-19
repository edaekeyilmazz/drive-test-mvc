"use strict";

$(document).ready( () => {

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
