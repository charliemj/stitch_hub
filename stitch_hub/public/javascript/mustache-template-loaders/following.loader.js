var loadFollowingTemplate = function(user) {
  console.log(user);
  $.get('mustache-templates/following.template.html', function (template) {
    var html = Mustache.render($(template).html(), user);
    $('#following-template-container').append(html);
  });
}