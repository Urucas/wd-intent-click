var wd = require('wd');
var ar = require('appium-running');
var intentClick = require('../node/');
(function test() {
  var browser = wd.remote('localhost', 4723);
  browser.on('status', function(info) {
    console.log(info);
  });
  
  function error(browser) {
    console.log(error);
    browser.quit();
    process.exit(1);
  }

  function success() {
    console.log("SUCCESS");
    browser.quit();
    process.exit(0);
  }

  browser.on('command', function(meth, path, data) {
    console.log([meth, path, data].join(" "));
  });
  
  function test() {
    browser.init({
      browserName:'Chrome',
      deviceName:'Android',
      platformName: 'Android',
    }, function(){
      browser.get("http://labs.urucas.com/zoster", function(){
        browser.elementByLinkText("Open App", function(err, el) {
          if(err) error(err);
          intentClick(browser, el, success, error);
        });
      });
    });
  }

  ar(4723, function(success){
    if(!success) {
      console.log("Appium not running or available!");
      return;
    }
    test();
  });

})();

