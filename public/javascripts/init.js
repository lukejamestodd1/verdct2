$(document).ready(function(){
    $(".button-collapse").sideNav();
    $('#textarea1').val('');
  	$('#textarea1').trigger('autoresize');
  	$('select').material_select();
  	$('.collapsible').collapsible();
  	$('.carousel').carousel();
    $('.parallax').parallax();
    $('ul.tabs').tabs({});
    $('.modal-trigger1').leanModal({
        opacity: .7,
        dismissible: false
    });
  	$('.datepicker').pickadate({
    	selectMonths: true, // Creates a dropdown to control month
    	selectYears: 15 // Creates a dropdown of 15 years to control year
  	});
    $('.bxslider').bxSlider({
        minSlides: 3,
        maxSlides: 10,
        slideWidth: 75,
        slideMargin: 5,
        infiniteLoop: true,
        moveSlides: 1,
        startSlide: 1,
    });
    $('.bxslider2').bxSlider({
        minSlides: 3,
        maxSlides: 10,
        slideWidth: 75,
        slideMargin: 5,
        infiniteLoop: true,
        moveSlides: 1,
        startSlide: 1,
    });
    $('.bxslider3').bxSlider({
        minSlides: 1,
        maxSlides: 5,
        slideWidth: 300,
        slideMargin: 50,
        infiniteLoop: true,
        moveSlides: 1,
        startSlide: 1,
    });
    // $('.slick').slick({
    //   centerMode: true,
    //   centerPadding: '100px',
    //   slidesToShow: 9,
    //   infinite: true,
    //   slidesToScroll: 1,
    //   focusOnSelect: true,
    //   responsive: [
    //     {
    //       breakpoint: 768,
    //       settings: {
    //         arrows: true,
    //         centerMode: true,
    //         centerPadding: '40px',
    //         slidesToShow: 3
    //       }
    //     },
    //     {
    //       breakpoint: 480,
    //       settings: {
    //         arrows: true,
    //         centerMode: true,
    //         centerPadding: '40px',
    //         slidesToShow: 1
    //       }
    //     }
    //   ]
    // });
    $('.topcont').click(function(){
      $(this).addClass('selected');
      $(this).siblings().removeClass('selected');
    });
    $('.btmcont').click(function(){
      $(this).addClass('selected');
      $(this).siblings().removeClass('selected');
    });
    // if(event){
    //     if(event.password != undefined){
    //         $('#eventpass').openModal({
    //             opacity: .7,
                
    //         });
    //     }
    // }

});

function checkPass() {
        var password = document.getElementById('password').value;
        var message = document.getElementById('confirmMessage');
        var eventpass = document.getElementById('eventpass').innerHTML;
        var goodColor = "#66cc66";
        var badColor = "#ff6666";
        if (password.toUpperCase() === eventpass.toUpperCase()){ 
            message.style.color = goodColor;
            message.innerHTML = "correct!"
            $('#dummy').addClass('hidden');
            $('#enter').removeClass('hidden');
            // $('#pbtn').addClass('hidden');  
        } else {
            message.style.color = badColor;
            message.innerHTML = "incorrect";
            $('#dummy').removeClass('hidden');
            $('#enter').addClass('hidden');
        }
    }