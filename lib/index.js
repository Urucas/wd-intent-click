import wd from 'wd';

export default class Utils {

  static clickIntent(driver, el, cb) {
    let elCoords;
    let webViewXPath = '//android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/android.webkit.WebView[1]/android.view.View[1]';

    let pressAction = (driver, coords) => {
      let action = new wd.TouchAction(driver);
          action.press({x:coords.x,y:coords.y}).wait(10).release()
      return action;
    }
    // get element location
    driver.getLocation(el, (err, coords) => {
      if(err) return cb(err);
      elCoords = coords;
      driver.context('NATIVE_APP', (err) => {
        if(err) return cb(err);
        driver.elementByXPath(webViewXPath, (err, el) => {
            if(err) return cb(err);
            driver.getLocation(el, (err, coords) => {
              if(err) return cb(err);
              let action = pressAction(driver, {x: elCoords.x, y: (coords.y + elCoords.y)});
              action.perform( (err) => {
                // error clicking on the intent
                if(err) return cb(err);
                // success
                cb(null);
            });
          });
        });
      });
    });
  }
}

