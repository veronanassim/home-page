// nav fixed in page when scroll
$(document).ready(function () {
  const $track = $('.slider-track');
  const $items = $('.slider-item');
  const $prevBtn = $('.prev-btn');
  const $nextBtn = $('.next-btn');

  let currentIndex = 0;
  // Changed from 3 to 4 items per view
  const itemsPerView = window.innerWidth > 768 ? 4 : 1;
  const maxIndex = $items.length - itemsPerView;
  function updateButtons() {
    $prevBtn.prop('disabled', currentIndex === 0);
    $nextBtn.prop('disabled', currentIndex >= maxIndex);
  }
  function slideToIndex(index) {
    currentIndex = Math.max(0, Math.min(index, maxIndex));
    const translateX = -currentIndex * (100 / itemsPerView);
    $track.css('transform', `translateX(${translateX}%)`);
    updateButtons();
  }
  $prevBtn.on('click', () => slideToIndex(currentIndex - 1));
  $nextBtn.on('click', () => slideToIndex(currentIndex + 1));
  // Initial button state
  updateButtons();
  // Handle window resize
  $(window).on('resize', function () {
    // Changed from 3 to 4 items per view
    const newItemsPerView = window.innerWidth > 768 ? 4 : 1;
    if (newItemsPerView !== itemsPerView) {
      location.reload();
    }
  });
});
// ////////////////////////////////////////////////////////


// scroll to menue in section explore
$(document).ready(function () {
  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
      // When scrolling down
      $('.mnue-fixed').css({ 'top': '0' });
      $('.mnue-fixed nav').addClass('scrolled');
      $('.mnue-fixed .nav-link').addClass('scrolled');
      // Change logo source
      $('.mnue-fixed img').attr('src', 'assets/imgs/logo-dark.png');
    } else {
      // When back to top
      $('.mnue-fixed').css({ 'top': 'auto' });
      $('.mnue-fixed nav').removeClass('scrolled');
      $('.mnue-fixed .nav-link').removeClass('scrolled');
      // Restore original logo
      $('.mnue-fixed img').attr('src', 'assets/imgs/Logo-2.png');
    }
  });
});
// /////////////////////////////////////////


// button about go to section about us 
$(document).ready(function () {
  $(".scroll-btn").click(function (e) {
    e.preventDefault();
    const target = $($(this).attr("href"));
    if (target.length) {
      $("html, body").animate(
        {
          scrollTop: target.offset().top,
        },
      );
    }
  });
});
/////////////////////////////////////////////////


// ////arrow fixed go to top page 
$(document).ready(function () {
  // Show/hide button based on scroll position
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $('.fixed-arrow').css('opacity', '1');
    } else {
      $('.fixed-arrow').css('opacity', '0');
    }
  });
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $('.right-fixed').css('opacity', '1');
    } else {
      $('.right-fixed').css('opacity', '0');
    }
  });

  // Smooth scroll to top when clicking the arrow
  $('.fixed-arrow').click(function () {
    $('html, body').animate({
      scrollTop: 0
    }, 200);
    return false;
  });
});