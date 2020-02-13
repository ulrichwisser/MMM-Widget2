# MMM-Widget2
MM module for displaying Web Widget or HTML code. This is lighter version of MMM-Widget. Made for usage by duplication .

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

### Duplication
```sh
cd <YOUR_MAGIC_MIRROR_DIRECTORY>/modules
cp -vr ./MMM-Widget2 ./MMM-Widget2_2
cd MMM-Widget2_2
mv MMM-Widget2.js MMM-Widget2_2.js
nano MMM-Widget2_2.js
```
rename module name at line 1.
```js
Module.register("MMM-Widget2_2",{ // When you duplicate this module, just edit here only.
```
