
function is_mobile(){ 
  return $('#mobile-web').is(':visible'); 
}
function is_retina(){ 
  return $('#retina').is(':visible'); 
}
function is_desktop(){
  return (!is_mobile() && !is_retina());
}
$('.carousel').carousel({
  interval: 2000
});
$('.carousel').carousel('pause');

$('button.long-story').click(function(){
  $(this).hide();
  $('button.short-story').text('read the short version');
  $('#long-story').toggle('quad');
  $('#short-story').hide();
  $('#the-proposal .intro').hide();
});

$('button.short-story').click(function(){
  $(this).hide();
  $('button.long-story').text('read the looong version');
  $('#short-story').show('quad');
  $('#long-story').hide();
  $('#the-proposal .intro').hide();
});

$('button.more').click(function(){
  $(this).parent('div').find('p.more, p.less').toggle();
  $(this).hide();
});

// Deal with telephone scripts
$('div.guide a.tel').each(function(i,e){
  var href = $(e).attr('href');
  if(href.match(/tel:/) && !is_retina()){
    var tel = href.replace('tel:', '');
    $(e).popover({content: tel});
    $(e).removeAttr("href");
  }
});

// ------ Nav
$('#custom-nav-toggle').click(function(e){
  $('.nav-collapse ul').show();
  $(this).hide();
  e.preventDefault();
  return false;
});

if(is_mobile()){
  $('#nav ul').hide();
}
// Scroll user to correct place if url has path
if(is_desktop()){
  var pathname = window.location.pathname.replace(/^\//, '#').split("/")[0];
    if(pathname.length > 1){
    scroll(pathname);
  }
}

var scrolling = false;
function scroll(href, speed, offset){
  speed = typeof speed !== 'undefined' ? speed : 1000;
  offset = typeof offset !== 'undefined' ? offset : 1;
  scrolling = true;
  $('html, body').stop().animate(
    {scrollTop: $(href).offset().top + offset }, 
    speed, '', 
    function(){ scrolling = false; }
  );
} 

function push_state($anchor){
  var page_name = $anchor[0].innerHTML;
  var path = $anchor.attr('href').replace('#', '');
  history.replaceState({page_name: page_name, path: path}, page_name, path);
}

// window.onpopstate = function(event){console.log('pop', event);}; 
function activerize($anchor){
  $('div#nav li').removeClass('active');
  $anchor.parent('li').addClass('active');
}
if(is_mobile()){
  $('#nav li.pug').hide();
  // $('body').click(function(){
  //   $('#nav ul:visible').hide();
  // })
}
$('div#nav ul a').bind('click',function(event){
  event.preventDefault();
  var $anchor = $(this);
  if(!is_desktop()){
    scroll($anchor.attr('href'), 0, 0);
    activerize($anchor);
    setTimeout(function(){
      $('#nav ul').hide();
      $('#custom-nav-toggle').show();
    }, 800);
  }
  else{
    scroll($anchor.attr('href'));
    activerize($anchor);
  }
  // return false;
});

var tiles = [];
$('div#nav').find('a.tile').each(function(){
  var href = $(this).attr('href');
  tiles.push({href: href, top: $(href).offset().top});
});
var mobile = is_mobile();
$(window).resize(function(e){
  if(mobile != is_mobile()){
    if(is_mobile()){
      $('#nav li.pug').hide();
      $('#nav ul').hide();
    }else{
      $('#nav li.pug').css({display: 'inline-block'});
      $('#nav ul').show();
    }
  }
  mobile = is_mobile();
});

var intro_bottom = $('div#the-couple').offset().top + 50;
var small_nav = false;
var nav_offset = 200;
$(window).scroll(function(){
  if(!scrolling){
    var top_of_viewport = $(window).scrollTop();
    if(!is_desktop()){
      $('#nav ul').hide();
      $('#custom-nav-toggle').show();
    }
    // This figures out where we are on the page and changes the nav
    // highlight as the user scrolls.  
    //
    // I disabled pushstate b/c its really annoying to fillup the
    // history just by scrolling.
    $.each(tiles, function(i,tile){
      var next_tile = tiles[i+1];
      var last_tile = tiles[tiles.length - 1];
      if(top_of_viewport >= (tile.top - nav_offset) && (last_tile == tile || top_of_viewport < next_tile.top) ){
        var $anchor = $("div#nav a[href='"+tile.href+"']");
        if (!$anchor.parent('li').hasClass('active')){
          activerize($anchor);
          // push_state($anchor);
        }
      }
      if(tile.href == '#the-couple' && top_of_viewport < tile.top){
        // var $anchor = $("div#nav a[href='"+tile.href+"']");
        if($('li.active').hasClass('active')){
          $('li.active').removeClass('active');
        }
        if(window.location.pathname != "/"){
          // history.pushState({}, '', '/');
        }
      }
    });
  }
});
