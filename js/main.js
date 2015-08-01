var NUMBER_OF_POSTS = 24;
var image_open = false;
var offset = 0;

handleValidResponse = function(posts) {
  offset+= NUMBER_OF_POSTS;
  for(var i=0; i<NUMBER_OF_POSTS; i++) {
    var post = posts[i];
    if(!post){
      finishPosts();
      break;
    }
    var photoUrl = post.photos[0].alt_sizes[3].url;
    var $div = $('<div class="work-image">')
    var $image = $('<img>');
    $image.attr({
      src: photoUrl
    });
    $image.appendTo($div);
    bindClickToImage($image, post);
    $div.appendTo('#work');
  }
}

bindClickToImage = function($image, post) {
  $image.bind('click', function(e){
    e.stopPropagation();
    $largeImage = $('<img>')
    $largeImage.attr({
      src: post.photos[0].original_size.url
    });
    $('#work_large_image').html($largeImage).promise().done(function() {
      $('#work_image_container').fadeIn(function(){
        image_open = true;
        $('body').addClass('image_open');
      });
    });
    $('#work_image_container').bind('click', closeLargeImage);
  });
}

closeLargeImage = function() {
  if(image_open == false) { return; }
  $('#work_image_container').fadeOut(function(){
    image_open = false;
    $('body').removeClass('image_open');
  });
}

handlePosts = function(data) {
  if(data.meta.status != 200) {
    $("#work").hide()
  } else {
    handleValidResponse(data.response.posts);
  }
}

fetchPosts = function() {
  url = '//api.tumblr.com/v2/blog/alliehasson.tumblr.com/posts?api_key=etXqNvuBoocd0gLP2YDCNZbgv3QZs4dQj9Dryq8id6qCzkbTxr&limit=' + NUMBER_OF_POSTS + '&offset=' + offset + '&type=photo';
  $.ajax({
    url: url,
    dataType: 'jsonp'
  }).success(handlePosts);
}

hijackLinks = function() {
  $('header a').bind('click', function(e) {
    e.preventDefault();
    sectionTop = $($(this).attr('href')).offset().top;
    // add 70 to account for fixed-pos header
    sectionTop -= 72;
    $('body,html').animate({ scrollTop: sectionTop }, 800);
  })
  $('#load_more').bind('click', function(e){
    e.preventDefault();
    fetchPosts();
  });
}

bindEscapeToClose = function() {
  $(document).keyup(function(e) {
    if(e.keyCode == 27){
      closeLargeImage();
    }
  });
}

finishPosts = function() {
  $('#load_more').hide();
}

$(function(){
  fetchPosts();
  hijackLinks();
  bindEscapeToClose();
});