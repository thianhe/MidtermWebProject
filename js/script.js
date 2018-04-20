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

});