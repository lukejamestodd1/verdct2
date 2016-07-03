$(document).ready(function(){
    $(".button-collapse").sideNav();
    $('#textarea1').val('');
  	$('#textarea1').trigger('autoresize');
  	$('select').material_select();
  	$('.collapsible').collapsible();
  	$('.carousel').carousel({ padding: 10});
  	$('.datepicker').pickadate({
    	selectMonths: true, // Creates a dropdown to control month
    	selectYears: 15 // Creates a dropdown of 15 years to control year
  	});
});