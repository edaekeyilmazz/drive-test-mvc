"use strict";

$(document).ready( () => {
  	// setting focus to username
  	$("#username").focus();

  // event handler for submit button
  $("#signup_form").submit( event => {
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

	
	// PASSWORD CONFIRM
	const confirm_password = $("#confirm_password").val().trim();
	if (confirm_password == "") {
		$(".error-confirmpassword").text("* This field is required.");
		isValid = false;
	}
	else {
		$(".error-confirmpassword").text("");
	}
	$("#confirm_password").val(confirm_password);


	// CHECK PASSWORD AND PASSWORD CONFIRM
	if(password != "" && confirm_password != "" ){
	if (password != confirm_password) {
		$(".error-confirmpassword").text("* Password must match.");
		isValid = false;
	}
	else {
		$(".error-confirmpassword").text("");
	}
	$("#confirm_password").val(confirm_password);
}

	// USER TYPE
	const userType = $("#userType").val();
	if (userType == -1) {
		$(".error-usertype").text("* This field is required.");
        isValid = false;
	}
	else {
		$(".error-usertype").text("");
	}
	$("#userType").val(userType);


	if (isValid == false) {
		event.preventDefault();
	}
}); 

}); // end ready