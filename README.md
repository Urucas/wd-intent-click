# wd-utils

Some util methods to complement [wd](https://github.com/admc/wd) module

* clickIntent, because clicking on an intent url(non http link) on a web view is not that simple. [Related](https://discuss.appium.io/t/clicking-on-an-intent-url-not-http-link-inside-a-webview-solved/5022)
```javascript
var Utils = require('wd-utils');
// appium test code
// you finding the element to click
Utils.clickIntent(driver, element, function(err){
  // if not error you have clicked on an intent successfully
});
```
