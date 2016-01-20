"use strict";
var page = require('webpage').create()
var system = require('system');
var fs = require('fs');
var current_directory = fs.workingDirectory;
var log = current_directory + '/public/log.txt'
var source = current_directory + '/public/share-image.html'
var output = current_directory + '/public/images/share-image.png';
var html = system.args[1];

page.viewportSize = {
  width: 500,
  height: 1500
}

function getPage() {

  page.includeJs('http://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js', function() {
    fs.write(log, 'html received: ' +  html, 'w')
    page.evaluate(function(html) {
      var _html = html.replace('\n', '');
      $('main').append($(_html))
    }, html);
    setTimeout(function() {
      page.render(output);
      console.log('success');
      phantom.exit()
    }, 3000)
  });
}

page.onLoadFinish = function(status) {
  if(status === 'success') {
  } else {
    console.log(status);
  }
}

page.open(source, function(status) {
  if (status !== 'success') {
      console.log('Unable to load '+ source + ' from ' + current_directory);
      phantom.exit(1);
  } else {
    getPage();
  }
})

setTimeout(function(){
  phantom.exit(); 
}, 15000)