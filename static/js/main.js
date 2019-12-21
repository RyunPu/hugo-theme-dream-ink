"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var SemanticUIColors = ['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown'];

function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function initTags() {
  $('.dream-tags').children().map(function () {
    var title = $(this).attr('title');
    var tagColor = localStorage.getItem(title);

    if (tagColor) {
      $(this).css('background', "#".concat(tagColor));
    } else {
      tagColor = SemanticUIColors[randomInt(0, SemanticUIColors.length)];
      $(this).addClass(tagColor);
    }
  });
}

function initAccordion() {
  $('.dream-categories .ui.accordion').accordion({
    selector: {
      trigger: '.title .icon'
    },
    onChange: function onChange() {
      $('.flip-container').height(Math.max.apply(Math, _toConsumableArray(getFilpHeights())));
      $('.dream-grid').masonry('layout');
    }
  });
}
"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// 每页文章数
var per_page = 10; // 搜索

var search = null;
$(document).ready(function () {
  preload();
  initFilp();
  initGrid();
  initTags();
  initAccordion();
  initSearch();
  initPhotoswipe();
  init();
});

function preload() {
  if ($('.homepage').length === 0) return;
  var initInk = ink();
  var $bar = $('.loading-bar .item');
  var $mask = $('.loading-mask');
  var $nmask = $('.normal-mask');
  var queue = new createjs.LoadQueue(true); // TODO: 提前加载的静态资源，根据需要修改

  var resources = ['/js/vendor.js', '/css/github-markdown.css', '/css/site.css', '/img/404.png', '/img/bg-dark.jpg', '/img/bg-white.jpg', '/img/default.jpg', '/img/Caveat-Regular.ttf', '/img/work/homepage.jpg', '/img/project/self.jpg', '/img/project/mxdia.jpg', '/img/project/lehuomao.jpg', '/img/project/gq.jpg', '/img/project/hyym.jpg', '/img/project/heytea.jpg'];
  queue.loadManifest(resources);
  queue.on('progress', function (e) {
    $bar.show().animate({
      width: e.loaded / e.total * 100 + '%'
    }, 100);
  });
  queue.on('complete', function (e) {
    $bar.fadeOut();
    $nmask.hide();
    setTimeout(initInk, 1000);
  });
}

function initSearch() {
  search = instantsearch({
    // TODO: 配置你自己的 appId，apiKey 和 indexName，查询地址 https://www.algolia.com/dashboard，相关文章 https://dp2px.com/2019/09/07/hugo-algolia/
    appId: 'HZ02OH7T6I',
    apiKey: '9abdcad75712be7ca136135c15e532a4',
    indexName: 'dev_Blog',
    searchFunction: function searchFunction(helper) {
      var $searchResults = $('#search-results');

      if (helper.state.query === '') {
        $searchResults.hide();
        return;
      }

      helper.search();
      $searchResults.show();
    }
  });
  var $status = $('#search-status');
  var $results = $('#search-results');
  search.addWidgets([{
    render: function render(_ref) {
      var _ref$searchMetadata = _ref.searchMetadata,
          searchMetadata = _ref$searchMetadata === void 0 ? {} : _ref$searchMetadata;
      var isSearchStalled = searchMetadata.isSearchStalled;
      var tpl = '<div><div class="loading"></div></div>';

      if (isSearchStalled) {
        $results.hide();
        $status.html(tpl);
      } else {
        $status.html('');
        $results.show();
      }
    }
  }]);

  Date.prototype.format = function (format) {
    var o = {
      'M+': this.getMonth() + 1,
      // month
      'd+': this.getDate(),
      // day
      'h+': this.getHours(),
      // hour
      'm+': this.getMinutes(),
      // minute
      's+': this.getSeconds(),
      // second
      'q+': Math.floor((this.getMonth() + 3) / 3),
      // quarter
      'S': this.getMilliseconds() // millisecond

    };

    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
      if (new RegExp('(' + k + ')').test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
      }
    }

    return format;
  };

  var hitTemplate = function hitTemplate(hit) {
    if (hit === null) return;
    var title = hit._highlightResult.title.value;
    var url = hit.url;
    var date = hit.date ? new Date(hit.date * 1000).format('yyyy-MM-dd') : '';
    if (url.includes('/categories/') || url.includes('/tags/') || url.includes('/about/')) return null;
    return "\n      <li>\n        <a href=\"".concat(url, "\">\n          ").concat(title, "\n          <span class=\"entry-date\">\n            <time>").concat(date, "</time>\n          </span>\n        </a>\n      </li>\n    ");
  };

  search.addWidget(instantsearch.widgets.searchBox({
    container: '#search-box',
    placeholder: 'Search...',
    autofocus: true
  }));
  search.addWidget(instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: hitTemplate
    }
  }));
  search.addWidget(instantsearch.widgets.pagination({
    container: '#pagination',
    maxPage: 10,
    scrollTo: false
  }));
  search.start();
}

function ink() {
  var modalTrigger = $('.cd-modal-trigger');
  var transitionLayer = $('.cd-transition-layer');
  var transitionBackground = transitionLayer.children();
  var modalWindow = $('.cd-modal');
  var frameProportion = 1.78; //png frame aspect ratio

  var frames = 25; //number of png frames

  var resize = false; //set transitionBackground dimentions

  setLayerDimensions();
  $(window).on('resize', function () {
    if (!resize) {
      resize = true;
      !window.requestAnimationFrame ? setTimeout(setLayerDimensions, 300) : window.requestAnimationFrame(setLayerDimensions);
    }
  });
  transitionLayer.addClass('visible opening');
  setTimeout(function () {
    modalWindow.addClass('visible');
  }, 200);

  function setLayerDimensions() {
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    var layerHeight;
    var layerWidth;

    if (windowWidth / windowHeight > frameProportion) {
      layerWidth = windowWidth;
      layerHeight = layerWidth / frameProportion;
    } else {
      layerHeight = windowHeight * 1.2;
      layerWidth = layerHeight * frameProportion;
    }

    transitionBackground.css({
      'width': layerWidth * frames + 'px',
      'height': layerHeight + 'px'
    });
    resize = false;
  }

  return function () {
    transitionLayer.addClass('closing');
    modalWindow.removeClass('visible');
    transitionBackground.one('animationend', function () {
      transitionLayer.removeClass('closing opening visible');
      transitionBackground.off('animationend');
    });
  };
}

function closeOverlay() {
  $('.search-mask').removeClass('overlay').find('.ais-search-box--input').val('');
  if (search) search.helper.setQuery('').search();
  $('body').removeClass('modal-open');
}

function init() {
  var $searchMask = $('.search-mask');
  var $searchIcon = $('.search-icon');
  var $searchBox = $('.ais-search-box--input');
  $searchMask.click(function (e) {
    if ($(e.target).closest('.search-area').length === 0) {
      closeOverlay();
    }
  });
  $searchBox.on('keydown', function (e) {
    if (e.which === 27) closeOverlay();
  });
  $searchIcon.click(function (e) {
    $searchMask.addClass('overlay');
    $('body').addClass('modal-open');
    setTimeout(function () {
      $searchBox.focus();
    }, 400);
  });
  $('.dream-single a').each(function () {
    if (this.hostname !== window.location.hostname) {
      this.target = '_blank';
    }
  });
  $('.infinite').hover(function () {
    $(this).stop().removeClass('animated');
  }, function () {
    $(this).stop().addClass('animated');
  });
  $('.arrow-down').click(function () {
    $('html, body').stop().animate({
      scrollTop: $(window).height()
    });
  });
  $('.top-nav').sticky({
    context: '#container',
    offset: 14
  });
  var $backToTop = $('.backToTop');
  $(window).scroll(function () {
    if ($(this).scrollTop() > $(this).height()) {
      $backToTop.fadeIn();
    } else {
      $backToTop.fadeOut();
    }
  });
  $backToTop.click(function () {
    $('html, body').stop().animate({
      scrollTop: 0
    });
  }); // 仅在首页，为 '.sre' 元素添加入场动画

  if ($('.homepage').length > 0) {
    ScrollReveal().reveal($('.sre'), {
      distance: '10px',
      delay: 300,
      cleanup: true
    });
  }
}

function initPhotoswipe() {
  // 每一组图库外层添加 pswp-list 类，每一张图片添加 data-size 属性，格式 1440x900，默认使用图片的 src，请根据需要修改
  if ($('.pswp').length === 0 || $('.pswp-list').length === 0) return;
  var $pswp = $('.pswp')[0];
  var $list = $('.pswp-list');
  var $imgs = $('img[data-size]');
  var items = [];
  $list.each(function (index) {
    items[index] = [];
    $(this).find('img[data-size]').each(function (itemIndex) {
      var href = $(this).attr('src');
      var size = $(this).data('size').split('x');

      var _size = _slicedToArray(size, 2),
          width = _size[0],
          height = _size[1];

      $(this).data({
        index: itemIndex,
        listIndex: index
      });
      items[index].push({
        src: href,
        w: width,
        h: height
      });
    });
  });
  $imgs.on('click', function (event) {
    var index = $(this).data('index');
    var listIndex = $(this).data('listIndex');
    var options = {
      index: index,
      bgOpacity: 0.7,
      showHideOpacity: true
    };
    var pswp = new PhotoSwipe($pswp, PhotoSwipeUI_Default, items[listIndex], options);
    pswp.init();
  });
}

function initGrid() {
  if ($('.dream-column').length === 0) return;
  var $grid = $('.dream-grid').masonry({
    itemSelector: '.dream-column'
  });
  $grid.imagesLoaded().progress(function () {
    $grid.masonry('layout');
  });
  initInfiniteScroll($grid.data('masonry'));
}

function initInfiniteScroll(msnry) {
  var postLen = $('.dream-post').length;

  if (postLen >= per_page) {
    var hasInited = false;
    var currentPage = 1;
    var arr = location.href.split('/page/');
    var infiniteScroll = new InfiniteScroll('.dream-grid', {
      path: function path() {
        if (!hasInited && arr[1]) {
          currentPage = Number.parseInt(arr[1]);
          hasInited = true;
        }

        return "".concat(arr[0], "page/").concat(this.loadCount + currentPage + 1);
      },
      append: '.dream-post',
      status: '.scroller-status',
      outlayer: msnry
    });
  }
}
"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function initFilp() {
  var $container = $('.flip-container');
  var heightArr = [];
  $container.height(Math.max.apply(Math, _toConsumableArray(getFilpHeights())));
  $('.dream-flip-toggle').click(function () {
    var _getFilpHeights = getFilpHeights(),
        _getFilpHeights2 = _slicedToArray(_getFilpHeights, 2),
        frontHeight = _getFilpHeights2[0],
        backHeight = _getFilpHeights2[1];

    $container.toggleClass('flip-it');

    if ($container.hasClass('flip-it')) {
      $container.height(backHeight);
    } else {
      $container.height(frontHeight);
    }
  });
  $container.on('transitionend', function () {
    if ($('.dream-column').length === 0) return;
    $('.dream-grid').masonry('layout');
  });
}

function getFilpHeights() {
  var frontHeight = 0;
  var backHeight = 0;
  $('.flipper-block').each(function (index, ele) {
    if (index === 0) frontHeight = $(ele).height();
    if (index === 1) backHeight = $(ele).height();
  });
  return [frontHeight, backHeight];
}
"use strict";

var dark = 'inverted';
var localStore = window.localStorage;

var darkHeaderElements = function darkHeaderElements() {
  var header = $('.dream-header');

  if (header.length) {
    var segments = $('.dream-header .ui.segment');
    var title = $('.dream-header .ui.top.segment .ui.header');
    var iconList = $('.dream-header .ui.top.segment .ui.list');
    var accordion = $('.dream-header .ui.segment .ui.accordion');
    segments.map(function () {
      $(this).toggleClass(dark);
    });
    title.toggleClass(dark);
    iconList.toggleClass(dark);
    accordion.toggleClass(dark);
  }
};

var darkBack = function darkBack() {
  var segments = $('.dream-back .ui.segment');

  if (segments.length) {
    segments.map(function () {
      $(this).toggleClass(dark);
    });
  }
};

var darkPostsSection = function darkPostsSection() {
  var segment = $('.ui.segment.dream-posts-section');

  if (segment.length) {
    segment.toggleClass(dark);
  }
};

var darkTagsSection = function darkTagsSection() {
  var segment = $('.ui.segment.dream-tags-section');

  if (segment.length) {
    segment.toggleClass(dark);
  }
};

var darkCategoriesSection = function darkCategoriesSection() {
  var segment = $('.ui.segment.dream-categories-section');

  if (segment.length) {
    segment.toggleClass(dark);
  }
};

var darkSingle = function darkSingle() {
  var segments = $('.dream-single .ui.segment');

  if (segments.length) {
    segments.map(function () {
      $(this).toggleClass(dark);
    });
    var title = $('.dream-single .ui.top.segment .ui.header');
    title.toggleClass(dark);
  }
};

function toggleDark() {
  darkHeaderElements();
  darkBack();
  darkPostsSection();
  darkTagsSection();
  darkCategoriesSection();
  darkSingle();
  darkOther();
}

function darkOther() {
  var $bd = $('body');
  var bgi = $bd.css('backgroundImage');
  var isDark = localStorage.getItem('hugo-theme-dream-is-dark');

  if (isDark) {
    $('body').addClass('dark');
    $('.dream-menu').addClass(dark);
    $('.button').addClass(dark);
    onImgLoad('/img/bg-dark.jpg', function (res) {
      if (res) $bd.css('backgroundImage', "url(\"".concat(res, "\")"));
    });
  } else {
    $('body').removeClass('dark');
    $('.dream-menu').removeClass(dark);
    $('.button').removeClass(dark);
    onImgLoad('/img/bg-white.jpg', function (res) {
      if (res) $bd.css('backgroundImage', "url(\"".concat(res, "\")"));
    });
  }
}

function onImgLoad(img, cb) {
  var nimg = new Image();
  nimg.src = img;

  nimg.onload = function () {
    cb(img);
  };

  nimg.onerror = function (err) {
    cb(false);
  };
}

var isDark = localStore.getItem('hugo-theme-dream-is-dark');
var iconSwitch = $('#theme-switch');

if (isDark) {
  iconSwitch.addClass('moon');
  toggleDark();
} else {
  iconSwitch.addClass('sun');
}

var themeSwitch = function themeSwitch() {
  if (isDark) {
    iconSwitch.removeClass('moon');
    iconSwitch.addClass('sun');
    localStore.removeItem('hugo-theme-dream-is-dark');
    isDark = null;
  } else {
    iconSwitch.removeClass('sun');
    iconSwitch.addClass('moon');
    localStore.setItem('hugo-theme-dream-is-dark', 'y');
    isDark = 'y';
  }

  toggleDark();
};