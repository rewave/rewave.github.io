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

  HandTransforms = {
    
    set : {
      y : 40,
      rotateX : '-=30deg'
    },

    reset : {
      y : '-=40',
      rotateX : '+=30deg'
    },


    move : {
      left : {
        x : -0.5*$(window).width(),
        y : 150,
        rotate : "-=30deg",
        rotateY : "+=15deg"
      },

      back : {
        x : 0,
        y : 40,
        rotate : "+=30deg",
        rotateY : "0deg"
      },

      right : {
        x : 0,
        y : 40,
        rotate : "+=30deg",
        rotateY : "0deg"
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
  var present = function present ($el) {

    $("html, body").animate({ scrollTop: 0 }, "slow").delay(500);
    $hand.css({
      visibility:'visible'
    });

    var $cardinal = $('.cardinal');
    $cardinal.css({
      'background-color':'#333'
    }, 800);

    var ht = HandTransforms;

    $hand
        .transition(ht.set, 1000)
        .transition(ht.move.left, 400, function () {
          Presentation.next();
        })
        .delay(2000)
        .transition(ht.move.back, 1000, 'ease')
        .delay(2000)
        .transition(ht.move.left, 400, function () {
          Presentation.next();
        })
        .delay(2000)
        .transition(ht.move.right, 200, function () {
          Presentation.next();
        })
    ;
    $el.text('View Online Demo')

  };

  $('.cta .try').click(function (ev) {
    $(this).text('• • •');
    ev.preventDefault();
    present($(this));
  });
});