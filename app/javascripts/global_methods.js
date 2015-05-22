function includeScripts(urls) {
  var head = $("head");

  $.each(urls, function(index, url) {
    head.append('<script type="text/javascript" src="' + url + '"></script>');
  })
}

function getHeaders(cookie) {
  return {
    headers: {
      'X-CLIENT-EMAIL': cookie.get("email"),
      'X-AUTHORIZATION-TOKEN': cookie.get("authorization_token")
    }
  }

}
