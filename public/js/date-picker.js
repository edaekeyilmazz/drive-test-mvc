// Make your own here: http://eternicode.github.io/bootstrap-datepicker

var dateSelect     = $('#flight-datepicker');
var dateAppointment     = $('#appointmentDate');
var dateReturn     = $('#end-date');
var spanAppointment     = $('.date-appointment');
var spanReturn     = $('.date-return');
var spanDateFormat = 'ddd, MMMM D yyyy';

dateSelect.datepicker({
  autoclose: true,
  format: "mm-dd-yyyy",
  maxViewMode: 0,
  startDate: "now"
}).on('change', function() {
  var start = $.format.date(dateAppointment.datepicker('getDate'), spanDateFormat);
  var end = $.format.date(dateReturn.datepicker('getDate'), spanDateFormat);
  spanAppointment.text(start);
  spanReturn.text(end);
});