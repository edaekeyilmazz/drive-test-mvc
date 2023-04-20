"use strict";

$(document).ready(() => { // event handler for submit button
    $("#information_form").submit(event => {
        let isInputValid = true;

        // CHECKING EXAMINER COMMENT
        const examinerComment = $("#examiner-comment").val().trim();
        if (examinerComment == "") {
            $(".error-examiner-comment").text("* This field is required.");
            isInputValid = false;
        } else {
            $(".error-examiner-comment").text("");
        }
        $("#examiner-comment").val(examinerComment);

        if (isInputValid == false) {
            event.preventDefault();
        }
    });
});

$("#exampleModal").on("show.bs.modal", function (event) {
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this);

    // modal.find('#rbPass').removeClass('text-success');
    // modal.find('#rbFail').removeClass('text-danger');

    var button = $(event.relatedTarget); // Button that triggered the modal
    var userid = button.data("userid"); // Extract user ID from data-* attribute
    var testType = button.data("test-type"); // Extract user ID from data-* attribute
    var fullName = button.data("full-name");
    var carMake = button.data("car-make");
    var carModel = button.data("car-model");
    var carYear = button.data("car-year");
    var carPlateNo = button.data("car-plate-no");
    var appointmentDate = button.data("appointment-date");
    var appointmentTime = button.data("appointment-time");
    var testResult = button.data("test-result");
    var examinerComment = button.data("examiner-comment");

    var modal = $(this);
    modal.find(".modal-title").text("Driver Information");
    modal.find("#exam-date").text(appointmentDate);
    modal.find("#exam-time").text(appointmentTime);
    modal.find("#test-type").text(testType);
    modal.find("#full-name").text(fullName);
    modal.find("#car-make").text(carMake);
    modal.find("#car-model").text(carModel);
    modal.find("#car-plateNo").text(carPlateNo);
    modal.find("#car-year").text(carYear);
    modal.find("#appointment-date").text(appointmentDate);
    modal.find("#appointment-time").text(appointmentTime);
    modal.find("#examiner-comment").text(examinerComment);
    modal.find("#test-result").text(testResult);


    // check if the input field has a value
    if (examinerComment != '') { // disable the input field
        modal.find("#examiner-comment").prop("disabled", true);
    } else {
        modal.find("#examiner-comment").prop("disabled", false);
    }

    // Set the selected radio button based on the value of testResult
    if (testResult != null && testResult == true) {
        modal.find('#rbPass').prop('checked', true);
        modal.find('#rbPass').addClass('text-success');
        modal.find('#rbPassLabel').addClass('text-success');
        modal.find('#rbFail').removeClass('text-danger');
        modal.find('#rbFailLabel').removeClass('text-danger');
        modal.find('#rbPass').prop('disabled', true);
        modal.find('#rbFail').prop('disabled', true);
        modal.find('#submit-popup').prop('disabled', true);
    } else if (testResult != null && testResult == true) {
        modal.find('#rbFail').prop('checked', true);
        modal.find('#rbFail').addClass('text-danger');
        modal.find('#rbFailLabel').addClass('text-danger');
        modal.find('#rbPass').removeClass('text-success');
        modal.find('#rbPassLabel').removeClass('text-success');
        modal.find('#rbFail').prop('disabled', true);
        modal.find('#rbPass').prop('disabled', true);
        modal.find('#submit-popup').prop('disabled', true);
    } else {
        modal.find('#rbPass').prop('checked', false);
        modal.find('#rbPass').removeClass('text-success');
        modal.find('#rbPass').prop('disabled', false);
        modal.find('#rbPassLabel').removeClass('text-success');

        modal.find('#rbFail').prop('checked', false);
        modal.find('#rbFail').prop('disabled', false);
        modal.find('#rbFail').removeClass('text-danger');
        modal.find('#rbFailLabel').removeClass('text-success');

        modal.find('#submit-popup').prop('disabled', false);
    }

});
