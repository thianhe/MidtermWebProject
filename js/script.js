$(document).ready(function() {
    var previousScroll = 0, // previous scroll position
        menuOffset = 70, // height of menu (once scroll passed it, menu is hidden)
        detachPoint = 2900, // point of detach (after scroll passed it, menu is fixed)
        hideShowOffset = 1; // scrolling value after which triggers hide/show menu

    // on scroll hide/show menu
    $(window).scroll(function() {
        if ($('.navbar').hasClass('expanded')) {
            // do nothing; main navigation is being shown
        } else {
            var currentScroll = $(this).scrollTop(), // gets current scroll position
                scrollDifference = Math.abs(currentScroll - previousScroll); // calculates how fast user is scrolling

            // if scrolled past menu
            if (currentScroll > menuOffset) {
                // if scrolled past detach point add class to fix menu
                if (currentScroll > detachPoint) {
                    $('.navbar').addClass('detached');
                }

                // if scrolling faster than hideShowOffset hide/show menu
                if (scrollDifference >= hideShowOffset) {
                    if (currentScroll > previousScroll) {
                        // scrolling down; hide menu
                        $('.navbar').addClass('invisible');
                    } else {
                        // scrolling up; show menu
                        $('.navbar').removeClass('invisible');
                    }
                }
            } else {
                // only remove “detached” class if user is at the top of document (menu jump fix)
                if (currentScroll <= -1) {
                    $('.navbar').removeClass();
                }
            }

            // if user is at the bottom of document show menu
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                $('.navbar').removeClass('invisible');

            }

            // replace previous scroll position with new one
            previousScroll = currentScroll;
        }
    })
    $('.grid').masonry({
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        percentPosition: true
    });

    // Modal with transition
    $('.grid-item').click(function(event) {
        // Check if not already open
        if (!$(this).hasClass('item-opened')) {
            // Values
            var elWidth = $(this).outerWidth() / 2;
            var elPosition = this.getBoundingClientRect();

            // Store position
            $(this).attr('data-coord-left', $(this).css('left'));
            $(this).attr('data-coord-top', $(this).css('top'));

            // Transition effect
            $(this).css({
                top: elPosition.top,
                left: elPosition.left
            }).delay(400).css({
                top: '120px',
                left: '10%',
                zIndex: '99999',
                // marginLeft:	'-20%'
                // position: 'fixed'
            }).addClass('item-opened');

            $('.grid-alpha').fadeIn();

            // Scroll to the top
            $('html, body').animate({
                scrollTop: $('.grid').offset().top
            }, 650);
            $('.grid').css('overflow', 'visible');
        } else {
            $('.grid').css('overflow', 'hidden');
        }
    });


    // Close item Modal
    $(document).on('click', function(e) {
        if ($('.item-opened').length > 0) {
            if (!$(e.target).closest('.grid-item').length && !$(e.target).hasClass('item-opened')) {
                $('.grid-alpha').fadeOut(650);

                $('.item-opened').css({
                    top: $('.item-opened').data('coord-top'),
                    left: $('.item-opened').data('coord-left'),
                    marginLeft: ''
                });

                $('html, body').animate({
                    scrollTop: ($('.grid').offset().top + parseFloat($('.item-opened').data('coord-top'))) - 30
                }, 650);

                setTimeout(function() {
                    $('.grid-item').css('z-index', '').removeClass('item-opened');
                }, 350);
                $('.grid').css('overflow', 'hidden');
            }
        }
    });
    // Random Image loop

});