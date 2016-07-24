$(function () {
  var sourceArr = [
    'images/logo.png',
    'images/bg.png',
    'images/pokemon.png',
    'images/screen.png',
    'images/title.png',
    'images/girl1.png',
    'images/handle.png',
    'images/handle_tips.png',
    'images/triangle.png',
    'images/girl2.png',
    'images/bg_tree.png',
    'images/text1.png',
    'images/girl3.png',
    'images/text2.png',
    'images/girl_attr1.jpg',
    'images/text3.png',
    'images/text4.png',
    'images/girl_attr2.jpg',
    'images/text5.png',
    'images/text6.png',
    'images/girl_attr3.jpg',
    'images/attr_info1.png'
  ];
  new mo.Loader(sourceArr, {
    loadType: 1,
    onLoading: function (count, total) {
      var percentage = parseInt(count / total * 100);
      progress(percentage);
    },
    onComplete: function (time) {
      progress(100);
      var $loading = $('#loading'),
        $wrapper = $('#wrapper');
      $wrapper.html($('#tpl').html());
      $loading.addClass('anim');

      setTimeout(function () {
        var $page1 = $wrapper.find('.page1');
        $loading.removeClass('anim').addClass('hide');
        $page1.removeClass('hide');
        setTimeout(function () {
          $page1.addClass('active');
        }, 50);
        initListener();
      }, 500);
    }
  });

  // 进度
  function progress(percentage) {
    $('#load_text').text('loading... ' + percentage + '%');
  }

  // 初始化事件监听
  function initListener() {
    var $wrapper = $('#wrapper');
    // var $audio = $('#audio');
    // var $music = $('#music');
    // var audio = $audio[0];

    // // 播放背景音乐
    // $audio.on('play', function (e) {
    //   $music.addClass('playing')
    // });
    // $audio.on('pause', function (e) {
    //   $music.removeClass('playing')
    // });
    // $music.on('touchstart', function (e) {
    //   $music.hasClass('playing') ? audio.pause() : audio.play();
    // });

    var switching = false;

    $wrapper.on('touchstart', '.btn-a', function (e) {
      if (switching) {
        return;
      }
      switching = true;
      var $active = $wrapper.find('.page.active');
      var current = $active.data('page');
      if (current < 7) {
        if (current == 4) {
          $active.find('.pokemon').addClass('parabola');
          setTimeout(function () {
            $active.removeClass('active');
            var $next = $wrapper.find('.page').eq(current);
            var girl = $active.find('.girl.active').data('girl');
            $next.removeClass('hide');
            $next.find('.girl-attr' + girl).addClass('active');
            setTimeout(function () {
              $next.addClass('active');
              switching = false;
            }, 50);
          }, 1050);
        } else {
          $active.removeClass('active');
          var $next = $wrapper.find('.page').eq(current);
          $next.removeClass('hide');
          setTimeout(function () {
            $next.addClass('active');
            switching = false;
          }, 50);

          if (current == 3) {
            $wrapper.find('.handle-tips').addClass('active');
          } else if (current == 6) {
            setTimeout(function () {
              $('#lnk_layer').removeClass('hide');
            }, 500);
          }
        }
      }
    });

    $wrapper.on('touchstart', '.btn-left', function (e) {
      var $active = $wrapper.find('.page.active');
      var current = $active.data('page');
      if (current == 4) {
        var $girlActive = $active.find('.active');
        var girlCurrent = $girlActive.data('girl');
        var index = girlCurrent - 2;
        $girlActive.removeClass('active');
        $active.find('.girl').eq(index).addClass('active');
      }
    });

    $wrapper.on('touchstart', '.btn-right', function (e) {
      var $active = $wrapper.find('.page.active');
      var current = $active.data('page');
      if (current == 4) {
        var $girlActive = $active.find('.active');
        var girlCurrent = $girlActive.data('girl');
        var index = girlCurrent;
        if (index == 3) {
          index = 0;
        }
        $girlActive.removeClass('active');
        $active.find('.girl').eq(index).addClass('active');
      }
    });

    $wrapper.on('touchstart', '.page6 .pokemon', function (e) {
      var $video_wrap = $('#video_wrap');
      var $video = $('#video');
      $video.attr('src', 'res/china-joy.mp4');
      $video_wrap.removeClass('hide');
      $video[0].play();
      setTimeout(function () {
        $video_wrap.addClass('active');
      }, 50);
    });

    $('#video_wrap').on('touchstart', '.close', function (e) {
      var $video_wrap = $('#video_wrap');
      var $video = $('#video');
      $video[0].pause();
      $video_wrap.removeClass('active');
      setTimeout(function () {
        $video_wrap.addClass('hide');
      }, 500);
    });
  }
});