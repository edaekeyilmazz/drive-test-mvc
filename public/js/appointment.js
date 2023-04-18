"use strict";

$(document).ready(function(){

  // event handler for submit button
  $("#appointment_form").submit( event => {
	let isInputValid = true;

	 // APPOINTMENT DATE
	 const appointmentDate = $("#appointmentDate").val().trim();
	 if (appointmentDate == "") {
		 $(".error-appointmentdate").text("* This field is required.");
		 isInputValid = false;
	 }
	 else {
		 $(".error-appointmentdate").text("");
		 }
	 $("#appointmentDate").val(appointmentDate);


    // TIME SLOT
    const timeSlotButtons = document.querySelectorAll(".btn-primary");
    if (timeSlotButtons.length <= 0) {
      $(".error-appointmenttime").text("* This field is required.");
          isInputValid = false;
    }
    else {
      $(".error-appointmenttime").text("");
    }
    // $("#appointmentTime").val(appointmenttime);


    if (isInputValid == false) {
      event.preventDefault();
    }
  }); 


    var date_input=$('input[name="appointmentDate"]'); //our date input has the name "appointmentDate"
    var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
    date_input.datepicker({
      format: 'mm/dd/yyyy',
      container: container,
      todayHighlight: true,
      autoclose: true,
    });

    $(".time-slot").on("click", function() {
          var selectedTimeSlot = $(this).val();
        // Update the value of the hidden input field
        $("#selected-time-slot").val(selectedTimeSlot);

        $(".time-slot:not(.btn-dark)").removeClass("btn-primary").addClass("btn-outline-primary");
        $(this).removeClass("btn-outline-primary").addClass("btn-primary");
    });
// });


  var dateSelect     = $('#flight-datepicker');
  dateSelect.datepicker()
  .on('change', function() {
      getUnavailableTimeSlots();
    });

  const getUnavailableTimeSlots = async () => {
    const selectedDate = document.getElementById("appointmentDate").value;
    console.log("selectedDate", selectedDate);
    try {
      const responseUnvailable = await fetch(`/get-available-time-slots/${selectedDate}/false`);
      const responseAvailable = await fetch(`/get-available-time-slots/${selectedDate}/true`);

      const dataAvailable = await responseAvailable.json();
      const dataUnavailable = await responseUnvailable.json();
      const dataCombined = Object.assign({}, dataAvailable, dataUnavailable);
      console.log("dataCombined", dataCombined);
    
      $(".time-slot").removeClass("btn-dark").removeClass("btn-primary").addClass("btn-outline-primary");

      const timeSlotButtons = document.querySelectorAll('.time-slot');
      timeSlotButtons.forEach(slot => {
        slot.style.cursor = 'pointer';
        slot.disabled = false;
      });

      if (dataCombined.available_time_slots && dataCombined.available_time_slots.length > 0) {
        dataCombined.available_time_slots.forEach((timeSlot) => {
          const buttonId = "time_slot" + timeSlot.appointmentTime.replace(':','');
          const btnTimeSlot = document.getElementById(buttonId);
          
          btnTimeSlot.classList.remove("btn-outline-primary");
          btnTimeSlot.classList.add("btn-dark");
          btnTimeSlot.style.cursor = "no-drop";
          btnTimeSlot.disabled = true;
        });
      } 
    } catch (error) {
      console.error(error);
    }
    };
    
  }); // end ready