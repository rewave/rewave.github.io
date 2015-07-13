$(function() {
  
  var track = {
    viewDemoClicked: function () {
      // console.log("view demo");
      if (typeof(ga) !== "undefined") {
        ga('send', 'event', 'button', 'click', 'viewed demo');
      }
    },
    demandAccessClicked: function () {
      // console.log("demand access");
      if (typeof(ga) !== "undefined") {
        ga('send', 'event', 'button', 'click', 'clicked demand access');
      }
    },
    demandFormSubmitted: function () {
      // console.log("demand submit");
      if (typeof(ga) !== "undefined") {
        ga('send', 'event', 'button', 'click', 'demanded access');
      }
    },
  };
  
  ////////////////////
  $('#demand-form').submit(function (ev) {
    var $demandForm = $('#demand-form');
    ev.preventDefault();

    $demandForm.find('input[type="submit"]').attr('value', '• • •');
    var data = {
      MERGE0 : $demandForm.find('input#email').val(),
      MERGE1 : $demandForm.find('input#full-name').val(),
    };

    $.ajax({
        url : 'http://rewaveapp.us3.list-manage.com/subscribe/post-json?u=5129d99ac0d9847744bc03d5c&id=e60d3753e2&c=?',
        data : data, 
        dataType : 'jsonp'
      })
      .done(function(resp) {
        if (resp.result == 'success') {  
          $demandForm.slideUp('fast', function () {
            track.demandFormSubmitted();
            $(this)
              .parent()
              .hide()
              .html(
                '<div class="text-success">'+resp.msg+'</div>'
              )
              .slideDown()
            ;
          });  
        }
        else if (resp.result == 'error') {
          $('#demand-feedback > .text-danger').text(resp.msg.split(' - ')[1]).removeClass('hidden');  
        }
      })
      .fail(function(resp) {
        $('#demand-feedback > .text-danger').text('No Connection. Please refresh the page.').removeClass('hidden');  
      })
      .always(function(resp) {
        $demandForm.find('input[type="submit"]').attr('value','Submit');
      })
    ;
  });

  
  $('.demand').click(function() {
    track.demandAccessClicked();
  });

  var pages = {
    'home': '/',
    'about': '/about.html',
    'faq': '/faq.html',
    'contact': '/contact.html',
    'engineering': '/engineering.html'
  }

  Object.keys(pages).map(function(page) {
    var path = window.location.pathname;
    if (pages[page] == path) {
        $('head').load('header.html');
        $('.nav_bar').load('nav_bar.html', function() {
          var $link = $('a[href^="' + page + '"]');
          $link.addClass('active');
          $link.click(function(e) {
            e.preventDefault();
          });
          $('#content').css('visibility', 'visible');
        });
        $('footer').load('footer.html');
    }
  })
});