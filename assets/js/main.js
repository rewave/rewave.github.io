$(function() {
  
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

  ////////////////////
  Slide =   {
    position : function position () {
      var $slide = $('.slide');
      var $laptop = $('.laptop');

      if ($(window).width() > 977) {
        $slide.css({
          'margin-top':'-'+$slide.height()+'px'
        });
      } else {
        $slide.css({
          'margin-top':'-'+($slide.height()-8)+'px'
        });
      }

      $laptop.css({
        'margin-bottom':'-10px'
      });

      $slide.css({
        visibility : 'visible'
      });
    },

    change : function (imgSrc) {
      var $slide = $('.slide');
      var holder = $slide.find('img');

      holder.attr('src', imgSrc);
    },
  };

  Slide.position();

  $(window).resize(function () {
    Slide.position();
  });
  ////////////////////
  $hand = $('.hand');
  Hand = {
    ready : function ready () {
      $hand.transit({
        y : 40,
        rotateX : '-=30deg'
      }, 1000);
    },
    reset : function reset () {
      $hand.transit({
        y : '-=40',
        rotateX : '+=30deg'
      }, 1000);
    },
    move : {
      left : function left () {
        $hand.transit({
          x : -0.5*$(window).width(),
          y : 150,
          rotate : "-=30deg",
          rotateY : "+=15deg"
        }, 400);
      },
      right : function right () {
        $hand.transit({
          x : 0,
          y : 40,
          rotate : "+=30deg",
          rotateY : "0deg"
        }, 400);
      },
      back : function back () {
        $hand.transit({
          x : 0,
          y : 40,
          rotate : "+=30deg",
          rotateY : "0deg"
        }, 1200);
      }
    },
  };
  ////////////////////
  Presentation = {
    slides : [
      '0 index fix hack',
      'assets/img/slides/1.png',
      'assets/img/slides/2.png',
    ], 
    current : 1,
    next : function () {
      ++this.current < this.slides.length ? Slide.change(this.slides[this.current]) : --this.current ;

    }, 
    previous : function () {
      --this.current > 0 ? Slide.change(this.slides[this.current]) : ++this.current ;
    }
  };
  ////////////////////
  var present = function present (buttonElement) {
    var $cardinal = $('.cardinal');
    $cardinal.css({
      'background-color':'#333'
    });

    Hand.ready();
    
    Hand.move.left();
    Presentation.next();
    Hand.move.back();

    Hand.move.left();
    Presentation.next();
    Hand.move.back();

    Hand.reset();
    buttonElement.text('View Online Demo')

  };

  $('.cta .try').click(function (ev) {
    $(this).text('• • •');
    ev.preventDefault();
    present($(this));
  });
});