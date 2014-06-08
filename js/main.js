handleValidResponse = function(posts) {
  var NUMBER_OF_POSTS = 6;
  for(var i=0; i<NUMBER_OF_POSTS; i++) {
    var post = posts[i];
    var photoUrl = post.photos[0].original_size.url;
    var $div = $('<div class="work-image">')
    var $image = $('<img>');
    $image.attr({
      src: photoUrl
    });
    $image.appendTo($div);
    $div.appendTo('#work');
  }
}

handlePosts = function(data) {
  if(data.meta.status != 200) {
    $("#work").hide()
  } else {
    handleValidResponse(data.response.posts);
  }
}

fetchPosts = function() {
  url = '//api.tumblr.com/v2/blog/alliehasson.tumblr.com/posts?api_key=etXqNvuBoocd0gLP2YDCNZbgv3QZs4dQj9Dryq8id6qCzkbTxr&limit=6&type=photo';
  $.ajax({
    url: url,
    dataType: 'jsonp'
  }).success(handlePosts);
}

hijackLinks = function() {
  $('header a').bind('click', function(e) {
    e.preventDefault();
    sectionTop = $($(this).attr('href')).position().top;
    // add 70 to account for fixed-pos header
    sectionTop -= 72;
    $('body,html').animate({ scrollTop: sectionTop }, 800);
  })
}

$(function(){
  fetchPosts();
  hijackLinks();
});