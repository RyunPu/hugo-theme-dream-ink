"use strict";function _toConsumableArray(e){return _arrayWithoutHoles(e)||_iterableToArray(e)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function _iterableToArray(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}function _arrayWithoutHoles(e){if(Array.isArray(e)){for(var t=0,a=new Array(e.length);t<e.length;t++)a[t]=e[t];return a}}var SemanticUIColors=["red","orange","yellow","olive","green","teal","blue","violet","purple","pink","brown"];function randomInt(e,t){return e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e))+e}function initTags(){$(".dream-tags").children().map(function(){var e=$(this).attr("title"),t=localStorage.getItem(e);t?$(this).css("background","#".concat(t)):(t=SemanticUIColors[randomInt(0,SemanticUIColors.length)],$(this).addClass(t))})}function initAccordion(){$(".dream-categories .ui.accordion").accordion({selector:{trigger:".title .icon"},onChange:function(){$(".flip-container").height(Math.max.apply(Math,_toConsumableArray(getFilpHeights()))),$(".dream-grid").masonry("layout")}})}function _slicedToArray(e,t){return _arrayWithHoles(e)||_iterableToArrayLimit(e,t)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function _iterableToArrayLimit(e,t){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)){var a=[],n=!0,r=!1,i=void 0;try{for(var o,s=e[Symbol.iterator]();!(n=(o=s.next()).done)&&(a.push(o.value),!t||a.length!==t);n=!0);}catch(e){r=!0,i=e}finally{try{n||null==s.return||s.return()}finally{if(r)throw i}}return a}}function _arrayWithHoles(e){if(Array.isArray(e))return e}var per_page=10,search=null;function preload(){if($(".normal-mask").hide(),!(0<=!$(".homepage").length)){var t=ink(),a=$(".loading-bar .item"),n=($(".loading-mask"),$(".normal-mask")),e=new createjs.LoadQueue(!0);e.loadManifest(["/js/vendor.js","/css/github-markdown.css","/css/site.css","/img/404.png","/img/bg-dark.jpg","/img/bg-white.jpg","/img/default.jpg","/img/Caveat-Regular.ttf","/img/work/homepage.jpg","/img/project/self.jpg","/img/project/mxdia.jpg","/img/project/lehuomao.jpg","/img/project/gq.jpg","/img/project/hyym.jpg","/img/project/heytea.jpg"]),e.on("progress",function(e){a.show().animate({width:e.loaded/e.total*100+"%"},100)}),e.on("complete",function(e){a.fadeOut(),n.hide(),setTimeout(t,1e3)})}}function initSearch(){search=instantsearch({appId:"HZ02OH7T6I",apiKey:"9abdcad75712be7ca136135c15e532a4",indexName:"dev_Blog",searchFunction:function(e){var t=$("#search-results");""!==e.state.query?(e.search(),t.show()):t.hide()}});var a=$("#search-status"),n=$("#search-results");search.addWidgets([{render:function(e){var t=e.searchMetadata;(void 0===t?{}:t).isSearchStalled?(n.hide(),a.html('<div><div class="loading"></div></div>')):(a.html(""),n.show())}}]),Date.prototype.format=function(e){var t={"M+":this.getMonth()+1,"d+":this.getDate(),"h+":this.getHours(),"m+":this.getMinutes(),"s+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),S:this.getMilliseconds()};for(var a in/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length))),t)new RegExp("("+a+")").test(e)&&(e=e.replace(RegExp.$1,1==RegExp.$1.length?t[a]:("00"+t[a]).substr((""+t[a]).length)));return e};search.addWidget(instantsearch.widgets.searchBox({container:"#search-box",placeholder:"Search...",autofocus:!0})),search.addWidget(instantsearch.widgets.hits({container:"#hits",templates:{item:function(e){if(null!==e){var t=e._highlightResult.title.value,a=e.url,n=e.date?new Date(1e3*e.date).format("yyyy-MM-dd"):"";return a.includes("/categories/")||a.includes("/tags/")||a.includes("/about/")?null:'\n      <li>\n        <a href="'.concat(a,'">\n          ').concat(t,'\n          <span class="entry-date">\n            <time>').concat(n,"</time>\n          </span>\n        </a>\n      </li>\n    ")}}}})),search.addWidget(instantsearch.widgets.pagination({container:"#pagination",maxPage:10,scrollTo:!1})),search.start()}function ink(){$(".cd-modal-trigger");var e=$(".cd-transition-layer"),r=e.children(),t=$(".cd-modal"),i=!1;function a(){var e,t,a=$(window).width(),n=$(window).height();1.78<a/n?e=(t=a)/1.78:t=1.78*(e=1.2*n),r.css({width:25*t+"px",height:e+"px"}),i=!1}return a(),$(window).on("resize",function(){i||(i=!0,window.requestAnimationFrame?window.requestAnimationFrame(a):setTimeout(a,300))}),e.addClass("visible opening"),setTimeout(function(){t.addClass("visible")},200),function(){e.addClass("closing"),t.removeClass("visible"),r.one("animationend",function(){e.removeClass("closing opening visible"),r.off("animationend")})}}function closeOverlay(){$(".search-mask").removeClass("overlay").find(".ais-search-box--input").val(""),search&&search.helper.setQuery("").search(),$("body").removeClass("modal-open")}function init(){var t=$(".search-mask"),e=$(".search-icon"),a=$(".ais-search-box--input");t.click(function(e){0===$(e.target).closest(".search-area").length&&closeOverlay()}),a.on("keydown",function(e){27===e.which&&closeOverlay()}),e.click(function(e){t.addClass("overlay"),$("body").addClass("modal-open"),setTimeout(function(){a.focus()},400)}),$(".dream-single a").each(function(){this.hostname!==window.location.hostname&&(this.target="_blank")}),$(".infinite").hover(function(){$(this).stop().removeClass("animated")},function(){$(this).stop().addClass("animated")}),$(".arrow-down").click(function(){$("html, body").stop().animate({scrollTop:$(window).height()})}),$(".top-nav").sticky({context:"#container",offset:14});var n=$(".backToTop");$(window).scroll(function(){$(this).scrollTop()>$(this).height()?n.fadeIn():n.fadeOut()}),n.click(function(){$("html, body").stop().animate({scrollTop:0})})}function initPhotoswipe(){if(0!==$(".pswp").length&&0!==$(".pswp-list").length){var r=$(".pswp")[0],e=$(".pswp-list"),t=$("img[data-size]"),s=[];e.each(function(o){s[o]=[],$(this).find("img[data-size]").each(function(e){var t=$(this).attr("src"),a=$(this).data("size").split("x"),n=_slicedToArray(a,2),r=n[0],i=n[1];$(this).data({index:e,listIndex:o}),s[o].push({src:t,w:r,h:i})})}),t.on("click",function(e){var t=$(this).data("index"),a=$(this).data("listIndex"),n={index:t,bgOpacity:.7,showHideOpacity:!0};new PhotoSwipe(r,PhotoSwipeUI_Default,s[a],n).init()})}}function initGrid(){if(0!==$(".dream-column").length){var e=$(".dream-grid").masonry({itemSelector:".dream-column"});e.imagesLoaded().progress(function(){e.masonry("layout")}),initInfiniteScroll(e.data("masonry"))}}function initInfiniteScroll(e){var t=$(".dream-post").length;if(per_page<=t){var a=!1,n=1,r=location.href.split("/page/");new InfiniteScroll(".dream-grid",{path:function(){return!a&&r[1]&&(n=Number.parseInt(r[1]),a=!0),"".concat(r[0],"page/").concat(this.loadCount+n+1)},append:".dream-post",status:".scroller-status",outlayer:e})}}function _slicedToArray(e,t){return _arrayWithHoles(e)||_iterableToArrayLimit(e,t)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function _iterableToArrayLimit(e,t){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)){var a=[],n=!0,r=!1,i=void 0;try{for(var o,s=e[Symbol.iterator]();!(n=(o=s.next()).done)&&(a.push(o.value),!t||a.length!==t);n=!0);}catch(e){r=!0,i=e}finally{try{n||null==s.return||s.return()}finally{if(r)throw i}}return a}}function _arrayWithHoles(e){if(Array.isArray(e))return e}function _toConsumableArray(e){return _arrayWithoutHoles(e)||_iterableToArray(e)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function _iterableToArray(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}function _arrayWithoutHoles(e){if(Array.isArray(e)){for(var t=0,a=new Array(e.length);t<e.length;t++)a[t]=e[t];return a}}function initFilp(){var r=$(".flip-container");r.height(Math.max.apply(Math,_toConsumableArray(getFilpHeights()))),$(".dream-flip-toggle").click(function(){var e=getFilpHeights(),t=_slicedToArray(e,2),a=t[0],n=t[1];r.toggleClass("flip-it"),r.hasClass("flip-it")?r.height(n):r.height(a)}),r.on("transitionend",function(){0!==$(".dream-column").length&&$(".dream-grid").masonry("layout")})}function getFilpHeights(){var a=0,n=0;return $(".flipper-block").each(function(e,t){0===e&&(a=$(t).height()),1===e&&(n=$(t).height())}),[a,n]}$(document).ready(function(){preload(),initFilp(),initGrid(),initTags(),initAccordion(),initSearch(),initPhotoswipe(),init()});var dark="inverted",localStore=window.localStorage,darkHeaderElements=function(){if($(".dream-header").length){var e=$(".dream-header .ui.segment"),t=$(".dream-header .ui.top.segment .ui.header"),a=$(".dream-header .ui.top.segment .ui.list"),n=$(".dream-header .ui.segment .ui.accordion");e.map(function(){$(this).toggleClass(dark)}),t.toggleClass(dark),a.toggleClass(dark),n.toggleClass(dark)}},darkBack=function(){var e=$(".dream-back .ui.segment");e.length&&e.map(function(){$(this).toggleClass(dark)})},darkPostsSection=function(){var e=$(".ui.segment.dream-posts-section");e.length&&e.toggleClass(dark)},darkTagsSection=function(){var e=$(".ui.segment.dream-tags-section");e.length&&e.toggleClass(dark)},darkCategoriesSection=function(){var e=$(".ui.segment.dream-categories-section");e.length&&e.toggleClass(dark)},darkSingle=function(){var e=$(".dream-single .ui.segment");e.length&&(e.map(function(){$(this).toggleClass(dark)}),$(".dream-single .ui.top.segment .ui.header").toggleClass(dark))};function toggleDark(){darkHeaderElements(),darkBack(),darkPostsSection(),darkTagsSection(),darkCategoriesSection(),darkSingle(),darkOther()}function darkOther(){var t=$("body");t.css("backgroundImage");localStorage.getItem("hugo-theme-dream-is-dark")?($("body").addClass("dark"),$(".dream-menu").addClass(dark),$(".button").addClass(dark),onImgLoad("/img/bg-dark.jpg",function(e){e&&t.css("backgroundImage",'url("'.concat(e,'")'))})):($("body").removeClass("dark"),$(".dream-menu").removeClass(dark),$(".button").removeClass(dark),onImgLoad("/img/bg-white.jpg",function(e){e&&t.css("backgroundImage",'url("'.concat(e,'")'))}))}function onImgLoad(e,t){var a=new Image;a.src=e,a.onload=function(){t(e)},a.onerror=function(e){t(!1)}}var isDark=localStore.getItem("hugo-theme-dream-is-dark"),iconSwitch=$("#theme-switch");isDark?(iconSwitch.addClass("moon"),toggleDark()):iconSwitch.addClass("sun");var themeSwitch=function(){isDark=isDark?(iconSwitch.removeClass("moon"),iconSwitch.addClass("sun"),localStore.removeItem("hugo-theme-dream-is-dark"),null):(iconSwitch.removeClass("sun"),iconSwitch.addClass("moon"),localStore.setItem("hugo-theme-dream-is-dark","y"),"y"),toggleDark()};