"use strict";

$(document).ready( () => {
  	// setting focus to arrival date
  	$("#firstName").focus();
		
  // event handler for submit button
  $("#information_form").submit( event => {
	let isInputValid = true

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


	if (isInputValid == false) {
		event.preventDefault();
	}
}); 

}); // end ready