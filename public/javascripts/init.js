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

    var sTop = '';
    var sBot = '';
    $('.topcont').click(function(){
      $(this).addClass('selected');
      $(this).siblings().removeClass('selected');
      var appElement = document.querySelector('[ng-app=dress]');
      var $scope = angular.element(appElement).scope();
      sTop =  $(this).find('p').html();
      $scope.$apply(function () {
        $scope.formData.sTop = sTop;
      });

    });
    $('.btmcont').click(function(){
      $(this).addClass('selected');
      $(this).siblings().removeClass('selected');
      var appElement = document.querySelector('[ng-app=dress]');
      var $scope = angular.element(appElement).scope();
      sBot =  $(this).find('p').html();
      $scope.$apply(function () {
            $scope.formData.sBot = sBot;
      });
    });

    var url = '';
    $('.img_sel').click(function(){
      $(this).addClass('selected');
      $(this).siblings().removeClass('selected');
      var appElement = document.querySelector('[ng-app=event]');
      var $scope = angular.element(appElement).scope();

      //set the img_url property to chosen img
      url =  $(this).find('img').attr('src');

      //set scope formdata to url
      $scope.$apply(function () {
            $scope.formData.img_url = url;
      });
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
            message.innerHTML = "correct!";
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
