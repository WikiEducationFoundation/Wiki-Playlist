"use strict";
var page = require('webpage').create()
var system = require('system');
var fs = require('fs');
var html = system.args[1];
var title = system.args[2];
var current_directory = fs.workingDirectory;
var source = current_directory + '/public/share-image.html'
var output = current_directory + '/tmp/images/' + title + '_' + Date.now() +'_share-image.png';


page.viewportSize = {
  width: 764,
  height: 399
}

var log = {
  path: output
};
function sendLog() {
  console.log(JSON.stringify(log));
}

// page.content = ""
// page.content += html;

function getPage() {
  page.evaluate(function(html) {
    var main = document.getElementById('main');
    // main.innerHTML = '<h1>hi</h1>';
    main.innerHTML = html;
  }, html);
  setTimeout(function() {
    page.render(output);
    log['rendered'] = true;
    sendLog();
    phantom.exit()
  }, 4000)
}

page.onLoadFinish = function(status) {
  if(status === 'success') {


  } else {
    console.log(status);
  }
}

page.open(source, function(status) {
  if (status !== 'success') {
      log['rendered'] = false;
      log['message'] = 'Unable to load '+ source + ' from ' + current_directory;
      sendLog()
      phantom.exit(1);
  } else {
    getPage();
  }
})

setTimeout(function(){
  phantom.exit(); 
}, 15000)