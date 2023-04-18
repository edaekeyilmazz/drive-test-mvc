"use strict";

$(document).ready( () => {
  	// setting focus to username
  	$("#username").focus();

  // event handler for submit button
  $("#login_form").submit( event => {
	let isValid = true

    // USERNAME
	const username = $("#username").val().trim();
	if (username == "") {
		$(".error-username").text("* This field is required.");
        isValid = false;
	}
	else {
		$(".error-username").text("");
		}
	$("#username").val(username);


	// PASSWORD
	const password = $("#password").val().trim();
	if (password == "") {
		$(".error-password").text("* This field is required.");
        isValid = false;
	}
	else {
		$(".error-password").text("");
	}
	$("#password").val(password);


	if (isValid == false) {
		event.preventDefault();
	}
}); 

}); // end ready