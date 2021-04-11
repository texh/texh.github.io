(function() {
  var npmUsername = 'nahanil';

  function onNpmModulesLoaded () {
    var data;
    try {
      data = JSON.parse(this.responseText);
    } catch (err) {
      console.warn('Hey there. Uhh, so I couldn\'t parse the npm modules list - SORRY BOUT IT!');
      return
    }

    if (!data || !data.results || !data.results.length) {
      console.log('Oh, how rare. I couldn\'t find any relevant npm packages :(');
      return;
    }

    var htmlOut = '<strong>NPM Things</strong><ul>';
    for (var i=0; i < data.results.length; i++) {
      var r = data.results[i].package;
      htmlOut += '<li><a href="' + r.links.npm + '">' + r.name + '</a>';
      if (r.description) {
        htmlOut += ' - ' + r.description;
      }
      htmlOut += '</li>';
    }
    htmlOut += '</ul>';

    document.getElementById('npm-things').innerHTML = htmlOut;
  }

  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", onNpmModulesLoaded);
  oReq.open('GET', 'https://api.npms.io/v2/search?q=maintainer:'+npmUsername);
  oReq.send();
})();
