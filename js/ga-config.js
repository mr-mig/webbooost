appendScript('/js/ext-ga.js', function(){
    ga = new ExtGA({
        trackingId : "UA-48549087-1", // Your Tracking Id
        trackingDns : "webbooost.fse.guru", // Domain name that you created for the profile
        appVersion : "1.0", // application Version
        appName : "Webbooost", // application Name    
        getPref : function(pref){
            return localStorage[pref];
        },
        setPref : function(pref, val) {
            localStorage[pref] = val;
        }
    });
    ga_ready.cbs.forEach(function(it){
        it();
    })
})

var ga_ready = function(cb){
   ga_ready.cbs = ga_ready.cbs || [];
   ga_ready.cbs.push(cb); 
}
