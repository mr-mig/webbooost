/**
 *  @license
 *  ga-ext version 1.0
 *  (https://github.com/melalj/universal-ga-extension)
 *  Javascript script that allows adding Universal Google analytics snippet to a chrome extension
 *
 *  Copyright (c) 2013 Mohammed Elalj [mohammed@elalj.com] 
 *  This script is freely distributable under the terms of an MIT-style license.
 */

ExtGA.prototype = {
    
    trackingId : null,
    trackingDns : null,
    appVersion : null,
    appName : null,
    uId : null,
    getPref : window.localStorage.getItem,
    setPref : window.localStorage.setItem,

    /**
     * Initilization function
     * @param object trackingData Have all tracking attributes
    */
    init : function (trackingData) {
        this.trackingId = trackingData.trackingId;
        this.trackingDns = trackingData.trackingDns;
        this.appVersion = trackingData.appVersion;
        this.appName = trackingData.appName;
        if(typeof(trackingData.getPref) == "function") this.getPref = trackingData.getPref;
        if(typeof(trackingData.setPref) == "function") this.setPref = trackingData.setPref;
    },

    /**
     * change uId value
     * @param string _uId User Id
    */
    setUid : function (_uId) {
        this.uId = _uId;
    },

    /**
     * Send an event to G.A
     * @param string category Event Category
     * @param string action Event Action
     * @param string label Event Label (optional)
     * @param integer value Event Value (optional)
    */
    event : function (category, action, label, value) {
        payload = "&t=event";
        if (category) payload += "&ec="+escape(category);
        if (action) payload += "&ea="+escape(action);
        if (label) payload += "&el="+escape(label);
        if (value) payload += "&ev="+parseInt(value);
        this._collect(payload);
    },

    /**
     * Visit a page event to G.A
     * @param string path Page path
     * @param string title Page title
    */
    pageview : function (path, title){
        payload = "&t=pageview";
        if (path) payload += "&dp="+escape(path);
        if (title) payload += "&dt="+escape(title);
        this._collect(payload);
    },

    /**
     * Track exception with G.A
     * @param string description Exception Description
     * @param binary fatal Is it fatal ?
    */
    exception : function (description, fatal) {
        payload = "&t=exception";
        if (description) payload += "&exd="+escape(description);
        if (fatal) payload += "&exf="+fatal;
        this._collect(payload);
    },

    /**
     * Track social interactions with G.A
     * @param string action Social event Action
     * @param string network Social network
     * @param string target Path targeted by social event
    */
    social : function (action, network, target) {
        payload = "&t=social";
        if (action) payload += "&sa="+escape(action);
        if (network) payload += "&sn="+escape(network);
        if (target) payload += "&st="+escape(target);
        this._collect(payload);
    },

    /**
     * Get/Generate & Save Client Id
    */
    _getCid : function () {
        if (this.getPref("gaCid")){
            return "&cid="+this.getPref("gaCid");
        } else {
            var cid = Math.round(2147483647 * Math.random());
            this.setPref("gaCid", cid);
            return "&cid="+cid;
        }
    },

    /**
     * Get/Generate & Save Client Id
    */
    _getUid : function () {
        if (this.uId != null) {
            return "&uid="+this.uId;
        } else {
            return "";
        }
    },

    /**
     * Add System Info
    */
    _getSystemInfo : function () {
        payload  = "";
        payload += "&sr="+window.screen.availWidth+"x"+window.screen.availHeight;
        payload += "&sd="+window.screen.colorDepth+"-bits";
        payload += "&ul="+navigator.language;
        return payload;
    },

    /**
     * Add Application Info
    */
    _getAppInfo : function () {
        payload  = "";
        payload += "&an="+this.appName;
        payload += "&av="+this.appVersion;
        return payload;
    },

    /**
     * Build GA collect link and sent it to Google
     * @param string payload Custom parameters
    */
    _collect : function (payload) {
        urlGa = "https://www.google-analytics.com/collect?v=1";
        urlGa +="&dh="+this.trackingDns;
        urlGa +="&tid="+this.trackingId;

        urlGa += this._getUid();
        urlGa += this._getCid();
        urlGa += this._getSystemInfo();
        //urlGa += this._getAppInfo();

        urlGa += payload;

        xhr = new XMLHttpRequest();                     
        xhr.open("GET", urlGa, true);
        xhr.send(null); 
    }
};

function ExtGA(trackingData) {
    this.init(trackingData);
}