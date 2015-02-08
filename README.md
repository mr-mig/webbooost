![Logo](http://mrmig-statis-assets.s3-website-eu-west-1.amazonaws.com/medium_tile.png)

[![bitHound Score](https://www.bithound.io/mr-mig/webbooost/badges/score.svg)](https://www.bithound.io/mr-mig/webbooost)

Chrome extension for faster web browsing. http://bit.ly/webbooost

How it works?
=============

The extension is listening for all outcoming requests and substitute the requests for **well-known and highly used** javascript libraries, css files and fonts.

How can I use it?
================

Just install it.

If you are a **web developer** - you can now develop your stuff **without internet connection to CDNs**. 
The libraries from CDNs will be served locally from the extension.

What is included?
===========================

You can find the CDN and library usage research in [this blog post](http://www.fse.guru/2014/03/cdn-usage-and-javascript-library).

CDNs covered:

* [Google CDN](https://developers.google.com/speed/libraries/devguide)
* [Yandex CDN](http://api.yandex.ru/jslibs/)
* [JSDelivr](http://www.jsdelivr.com/)
* [Microsoft CDN](http://www.asp.net/ajax/cdn)
* [Cloudflare CDNJS](https://cdnjs.com/)
* [jQuery CDN](https://code.jquery.com/)
* [Bootstrap CDN](http://www.bootstrapcdn.com/)
* Bootstrap old NetDNA CDN

Libraries covered:

* jQuery
* jQuery-migrate
* angular core (1.0.1 - 1.2.14)
* webfontloader
* google analytics (ga.js, analytics.js)
* yandex metrika (watch.js)
* google plus one (plusone.js)
* twitter widgets (widgets.js, client.js)
* swfobject
* Bootstrap JS (2.3.2, 3.1.1)
* Bootstrap CSS  (2.3.2, 3.1.1)
* Font Awesome (3.2.1, 4.0.0)
* facebook (en_US/all.js)

Is it really making something faster?
=====================

Yes, it is.
Try it, it's free.

Can I contribute?
=================

For security reasons **I do not accept pull requests with new libraries**.

If you want to add some **library**, feel free to raise an issue.

If you want to modify **the code or injection rules** - make a pull request.

How can I build all the stuff?
======
Run `make all` to create a development build in `/dist`.

You can point Chrome to this directory to use the "unpacked extension"

To pack the extension in a zip use `make all pack` 
