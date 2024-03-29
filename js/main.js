(function($){
	'use strict';

    /*------------------------------------------------
     Magnificpopup for gallery section
    -------------------------------------------------- */     
    $('.portfolio-gallery-set').magnificPopup({
      type: 'image',
      mainClass: 'mfp-with-zoom', // this class is for CSS animation below
      gallery:{
        enabled:true
      }
    }); 

    /*------------------------------------------------
     Magnificpopup for related portfolio section
    -------------------------------------------------- */     
    $('.related-gallery').magnificPopup({
      type: 'image',
      mainClass: 'mfp-with-zoom', // this class is for CSS animation below
      gallery:{
        enabled:true
      }
    }); 
    
    /*------------------------------------------------
     Magnificpopup for video gallery section
    -------------------------------------------------- */ 
    $('.video-play-icon').magnificPopup({
        disableOn: 700,
        type: "iframe",
        mainClass: "mfp-fade",
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });

    /* -------------------------------------------------------
     PORTFOLIO FILTER SET ACTIVE CLASS FOR STYLE
    ----------------------------------------------------------*/
    $('.portfolio-filter li').on('click', function(event) {
        $(this).siblings('.active').removeClass('active');
        $(this).addClass('active');
        event.preventDefault();
    });

    /* ----------------------------------------------------
     PORTFOLIO MASONRY STYLE ISOTOPE
    ------------------------------------------------------*/
    var $varPortfolioMasonry = $('.portfolio-masonry');
    if (typeof imagesLoaded == 'function') {
        imagesLoaded($varPortfolioMasonry, function() {
            setTimeout(function() {
                $varPortfolioMasonry.isotope({
                    itemSelector: '.portfolio-item',
                    resizesContainer: false,
                    layoutMode: 'masonry',
                    filter: '*'
                });
            }, 500);

        });
    };

    /* ---------------------------------------------------
     PORTFOLIO FILTERING
     ---------------------------------------------------- */
    $('.portfolio-filter').on('click', 'a', function() {
        $(this).addClass('current');
        var filterValue = $(this).attr('data-filter');
        $(this).parents('.portfolio-filter-wrap').next().isotope({
            filter: filterValue
        });
    });

    /* ---------------------------------------------
     MASONRY STYLE BLOG.
    ------------------------------------------------ */
    var $blogContainer = $('.blog-masonry');
    if ($.fn.imagesLoaded && $blogContainer.length > 0) {
        imagesLoaded($blogContainer, function() {
            setTimeout(function() {
                $blogContainer.isotope({
                    itemSelector: '.post-grid-item',
                    layoutMode: 'masonry'
                });
            }, 500);

        });
    }

    /*-------------------------------------------
      SCROLL TO TOP BUTTON
    ---------------------------------------------*/
    $('body').append('<a id="back-to-top" class="to-top-btn" href="#"><i class="ti-arrow-up"></i></a>');
    if ($('#back-to-top').length) {
        var scrollTrigger = 100, // px
            backToTop = function () {
                var scrollTop = $(window).scrollTop();
                if (scrollTop > scrollTrigger) {
                    $('#back-to-top').addClass('to-top-show');
                } else {
                    $('#back-to-top').removeClass('to-top-show');
                }
            };
        backToTop();
        $(window).on('scroll', function () {
            backToTop();
        });
        $('#back-to-top').on('click', function (e) {
            e.preventDefault();
            $('html,body').animate({
                scrollTop: 0
            }, 500);
        });
    };

    /*--------------------------------
    MOBILE MENU ACTIVE
    -----------------------------------*/
    $('.mobile-menu').meanmenu();

    /* ---------------------------------------------
     MENU HAMBURGER FOR MENU
    --------------------------------------------- */
    $('.hamburger').on('click', function() {
        $(this).toggleClass('is-active');
        $(this).next().toggleClass('nav-show')
    });

    /* CONTACT FORM VALIDATIONS SETTINGS */
    var CTForm = $('#contact_form');
    CTForm.validate({
        onfocusout: false,
        onkeyup: false,
        rules: {
            name: "required",
            email: {
                required: true,
                email: true
            }
        },
        errorPlacement: function(error, element) {
            error.insertBefore(element);
        },
        messages: {
            name: "What's your name?",
            email: {
                required: "What's your email?",
                email: "Please, enter a valid email"
            }
        },
                    
        highlight: function(element) {
            $(element)
            .text('').addClass('error')
        },                    
                    
        success: function(element) {
            element
            .text('').addClass('valid')
        }
    });   


/* CONTACT FORM SCRIPT */
    var CTSubmit = $('#contact_submit');
    CTForm.submit(function() {
        // submit the form
        if($(this).valid()){
           CTSubmit.button('loading'); 
            var action = $(this).attr('action');
            $.ajax({
                url: action,
                type: 'POST',
                data: {
                    contactname: $('#contact_name').val(),
                    contactemail: $('#contact_email').val(),
                    contactmessage: $('#contact_message').val()
                },
                success: function() {
                   CTSubmit.button('reset');
                   CTSubmit.button('complete');
                },
                error: function() {
                    CTSubmit.button('reset');
                    CTSubmit.button('error');
                }
            });
        // return false to prevent normal browser submit and page navigation 
        } else {
            CTSubmit.button('reset')
        }
        return false; 
    }); 
    
    /*--------------------------------
    SLIDER PARTICLES.JS
    -----------------------------------*/
    if ( $('#particle-ground').length ) { 
        particlesJS("particle-ground", {
          "particles": {
            "number": {
              "value": 100,
              "density": {
                "enable": true,
                "value_area": 800
              }
            },
            "color": {
              "value": "#fff"
            },
            "shape": {
              "type": "circle",
              "stroke": {
                "width": 0,
                "color": "#fff"
              },
              "polygon": {
                "nb_sides": 5
              },
              "image": {
                "src": "img/github.svg",
                "width": 100,
                "height": 100
              }
            },
            "opacity": {
              "value": 0.5,
              "random": false,
              "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
              }
            },
            "size": {
              "value": 3,
              "random": true,
              "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
              }
            },
            "line_linked": {
              "enable": true,
              "distance": 150,
              "color": "#fff",
              "opacity": 0.4,
              "width": 1
            },
            "move": {
              "enable": true,
              "speed": 6,
              "direction": "none",
              "random": true,
              "straight": false,
              "out_mode": "out",
              "bounce": false,
              "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 600
              }
            }
          },
          "interactivity": {
            "detect_on": "canvas",
            "events": {
              "onhover": {
                "enable": true,
                "mode": "grab"
              },
              "onclick": {
                "enable": true,
                "mode": "push"
              },
              "resize": true
            },
            "modes": {
              "grab": {
                "distance": 250,
                "line_linked": {
                  "opacity": 1
                }
              },
              "bubble": {
                "distance": 600,
                "size": 80,
                "duration": 2,
                "opacity": 8,
                "speed": 3
              },
              "repulse": {
                "distance": 200,
                "duration": 0.4
              },
              "push": {
                "particles_nb": 4
              },
              "remove": {
                "particles_nb": 2
              }
            }
          },
          "retina_detect": true
        });
    }

    /* slider active  */
    $('.slider-active').owlCarousel({
        loop: true,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        items: 1,
        dots: false,
        nav: true,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    });

    /* slider active  */
    $('.slider-four').owlCarousel({
        loop: true,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        items: 4,
        dots: false,
        nav: true,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        responsive: {
            0: {
                items: 4
            },
            600: {
                items: 4
            },
            1000: {
                items: 4
            }
        }
    });

    /* slider active  */
    $('.slider-one').owlCarousel({
        loop: true,
        items: 1,
        dots: false,
        nav: true,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    });

    /* slider active  */
    $('.slider-portfolio').owlCarousel({
        loop: true,
        autoplay:true,
        items: 1,
        dots: false,
        nav: true,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    });

    /* slider blog  */
    $('.slider-blog').owlCarousel({
        loop: true,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        items: 3,
        dots: false,
        nav: true,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        responsive: {
            0: {
                items: 3
            },
            600: {
                items: 3
            },
            1000: {
                items: 3
            }
        }
    });

    /* slider tab  */
    $('.slider-tab').owlCarousel({
        loop: true,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        items: 4,
        dots: false,
        nav: true,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        responsive: {
            0: {
                items: 4
            },
            600: {
                items: 4
            },
            1000: {
                items: 4
            }
        }
    });


    /* ---------------------------------------------
     BRAND LOGO SLICK SLIDER.
    --------------------------------------------- */
    $('.client-logo-wrapper').slick({
        dots: false,
        arrows: false,
        slidesToShow: 5,
        infinite: true,
        speed: 300,
        adaptiveHeight: false,
        responsive: [
          { breakpoint: 991, settings: { slidesToShow: 3 } },
          { breakpoint: 767, settings: { slidesToShow: 3 } },
          { breakpoint: 481, settings: { slidesToShow: 2 } },
          { breakpoint: 321, settings: { slidesToShow: 1 } },
        ]
    });

    /* ---------------------------------------------
     RELATED PROJECT SLIDER
    --------------------------------------------- */
    $('.related-project-slider').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        adaptiveHeight: true,
        arrows: true,
        responsive: [
          { breakpoint: 991, settings: { slidesToShow: 3 } },
          { breakpoint: 769, settings: { slidesToShow: 2 } },
          { breakpoint: 481, settings: { slidesToShow: 1 } },
        ]
    });

    /* circlechart */   
    $('.demo-1').percentcircle();

    /* pricing Active */
    var singlepricing = $('.single-pricing')
    
    singlepricing
        .mouseover(function() {
            singlepricing.removeClass('active');
            $(this).addClass('active');
        });

    /*----------------------------
    youtube video
    ------------------------------ */
    $('.youtube-bg').YTPlayer({
        containment: '.youtube-bg',
        autoPlay: true,
        loop: true
    });

    /* ---------------------------------------------
     TESTIMONIAL SLICK SLIDER.
    --------------------------------------------- */
    $('.testimonial-slider').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true,
        arrows: false
    });
    
    /* ---------------------------------------------
     SINGLE PROJECT SLIDER
    --------------------------------------------- */
    $('.single-project-slider').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: false,
        arrows: false
    });  

    /* menu  sticky */
    var header = $('.scroll-sticky');
    var win = $(window);
    
    win.on('scroll', function() {
        var scroll = win.scrollTop();
        if (scroll < 245) {
            header.removeClass("sticky");
        } else {
            header.addClass("sticky");
        }
    }); 

    var header = $('.bottom-menu');
    var win = $(window);
    
    win.on('scroll', function() {
        var scroll = win.scrollTop();
        if (scroll < 650) {
            header.removeClass("sticky");
        } else {
            header.addClass("sticky");
        }
    }); 

    /*-------------------
     SMOTH SCROOL JS
    -------------------*/

        $('a.smoth-scroll').on("click", function (e) {
            var anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $(anchor.attr('href')).offset().top - 50
            }, 1000);
            e.preventDefault();
        });

    /*----------------------------
    kenburne
    ------------------------------ */   
    $(".slide-kenburne").kenburnsy({
      fullscreen: true
    });

    /* ---------------------------------------------
     shopno SLIDER ACTIVE 
    --------------------------------------------- */
    $('.shopno-slider-active').slick({
        dots: true,
        infinite: true,
        fade: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: false,
        arrows: false
    });

    /*----------------------------
    window on load
    ------------------------------ */  

    $(window).on('load', function() {
        $('#preloader').fadeOut(500, function() {
            $(this).remove();
        });
    });

})(jQuery);