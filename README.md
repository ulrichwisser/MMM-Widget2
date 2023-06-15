# MMM-Widget2
MM module for displaying the `Web Widget` or HTML code. This is a lighter version of MMM-Widget. <del>Made for usage by duplication.</del><ins>Just add configuration once more to use multi widgets.</ins>

Especially, this is not an improved version of `MMM-Widget`. <del>Just rebuilding for easy duplication. (Requested by @chassain)</del>

## Install
```sh
cd <YOUR_MAGIC_MIRROR_DIRECTORY>/modules
git clone https://github.com/eouia/MMM-Widget2
```

## Configuration
```js

{
  module: "MMM-Widget2",
  position: "top_left",
  config: {
  	refreshInterval: 1000*60*60,
  	file: "test.html",
  	iframeStyle: {
  		width: "800px",
  		height: "400px"
  	}
  }
},
```
### Defaults & Details
```js
config: {
  uid: null, // You can set `uid` for this module instance. Usually, no need to care about this unless use notification `WIDGET_REFRESH`.
  refreshInterval: 1000*60*60,
  code: "<p>Nothing to Show</p>", // Put here your widget script or html code.
  file: null, // if `file` is set, `code` will be ignored. Try to test "test.html"
  fullHTMLfile: false, // if your file is already full HTML document (with <html></html>) set this true.
  iframeStyle: {}, // define your iframe style. like above sample.
},
```


## Refresh by notification
```js
this.sendNotification("WIDGET_REFRESH")
```
This will refresh all duplicated MMM-Widget2 modules.

Or

```js
this.sendNotification("WIDGET_REFRESH", "123")
```
This will refresh MMM-Widget2 sibling who has `123` as uid

### Multi instances
**CHANGED**
You don't need to copy and rename this module itself anymore.

Just add module configuration once again.

```js
// In your config.js
{
  module: "MMM-Widget2",
  position: "top_left",
  config: {
    uid: 'ABC1234' // If omitted, `module Identifier` will replace. (e.g. 'module_12_MMM-Widget2')
    code:` ... `
    // ...
  }
},
{
  module: "MMM-Widget2",
  position: "bottom_right",
  config: {
    uid: 'DEF5678' // If omitted, `module Identifier` will replace. (e.g. 'module_13_MMM-Widget2')
    code:` ... `
    // ...
  }
},
// ... 
```
