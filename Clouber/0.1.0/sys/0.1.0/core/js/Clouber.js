
var cb_core_appmgr = new function() {
	// core initialization
	this.settings = {
		base: "cb",
		version: "0.1.0",
	};

	this.setting = function(settings) {
		if (typeof settings !== 'undefined') this.settings = jQuery.extend(this.settings, settings);
	};

	this.moduleRef = function(params) {
		if (typeof params!== 'undefined') 
			params = jQuery.extend({
				base: this.settings.base,
				app:"", 
				version: this.settings.version,
				module:"",
				theme: "default",
				control: "",
			}, params);
		var href = null;
		if (params.app=="sys") {
			href = params.base+"/sys/"+params.version+"/"+params.module+"/"+params.control+"/"+params.control+".js";
		} else {
			href = params.base+"/apps/"+params.app+"/"+params.version+"/"+params.module+"/"+params.control+"/"+params.control+".js";
		}
		return href;
	};
	
	// load js module
	this.load = function(params) {
		var href = this.moduleRef(params);
		this.loadJs(href);
	};

	// include js file
	this.include = function(params) {
		var href = this.moduleRef(params);
		this.includeJs(href);
	};

	// create app object instance
	this.create = function(params) {
		obj=null;
		if (typeof params!== 'undefined') 
			var p = jQuery.extend({
				base: this.settings.base,
				app:"",
				version: this.settings.version,
				module: "", 
				control: "",
				theme: "default",
				target:""
			}, params);
		var str = JSON.stringify(p);
		str = "obj = new cb_"+p.app+"_"+p.module+"_"+p.control+" ("+str+")";
		eval(str);
		return obj;
	};

	// load js file asynchronously
	this.loadJs = function(href) {
		if (jQuery("head script[src=\""+href+"\"]").size()>0) return; 
		// include js using script tag
		var script = document.createElement('script');
		script.src = href;
		script.type = 'text/javascript';
	//	document.getElementsByTagName('head')[0].appendChild(script);
		document.write("<scr"+"ipt src=\""+href+"\"></sc"+"ript>") ;
	};

	// include js synchronously
	this.includeJs = function(href) {
		// include js using sync ajax
		$.ajax({type:'GET',url:href,async:false,dataType:'script'}); 
	};
};




getUrlArg = function (arg) { 
	var url = location.href; 
	var paraString = url.substring(url.indexOf("?")+1,url.length).split("&"); 
	var paraObj = {} 
	for (i=0; j=paraString[i]; i++){ 
		paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length); 
	} 
	var returnValue = paraObj[arg.toLowerCase()]; 
	if(typeof(returnValue)=="undefined"){ 
		return ""; 
	}else{ 
		return returnValue; 
	};
};	
