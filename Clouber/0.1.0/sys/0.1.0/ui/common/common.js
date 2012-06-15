/*
 * Common UI Control
 */
// Common UI Control class
/*
 *  settings.base		base URL
 *  settings.app		application name
 *  settings.version	application version
 *  settings.module		application module
 *  settings.control	control name
 *	settings.theme		web page theme: html, css, images
 *  settings.target		web page target tag
 *  settings.style		web page layout style
 *  settings.title		control title
 *  settings.variable	variable instance name
 *  settings.index		index of container's components
 */
function CB_UIControl(params) {
	this.viewObj = null;
	this.settings = null;

	this.setting = function(params) {
		if (typeof params!=='undefined') this.settings = jQuery.extend(this.settings, params);
		if (this.viewObj!==null) this.viewObj.setting(params);	// control and view object keep same settings
	};

	this.setView = function(obj) {
		this.viewObj = obj;
		this.viewObj.controlObj = this;
	};

	this.loadTheme = function(params) {this.viewObj.loadTheme(params);};
};

// Common UI View class
function CB_UIView(params) {
	this.controlObj = null;
	this.settings = null;
	
	this.setting = function(params) {
		if (typeof params!=='undefined') {
			if (this.settings===null) {
				this.settings = params;
			} else {
				this.settings = jQuery.extend(this.settings, params);
			}
		}
	};
	
	// can be overrided event
	this.themeLoading=function(params){};
	this.themeLoaded=function(params){};
	this.htmlError=function(params){};
	
	// get theme HTML through ajax, can be overrided
	this.getHtml=function(params){
		params = jQuery.extend({async:false}, params);
		var href = null;
		if (this.settings.app=="sys") {
			href = this.settings.base+"/sys/"+this.settings.version+"/"+this.settings.module+"/"+this.settings.control+"/theme/"+this.settings.theme+"/"+this.settings.control+".html";
		} else {
			href = this.settings.base+"/apps/"+this.settings.app+"/"+this.settings.version+"/"+this.settings.module+"/"+this.settings.control+"/theme/"+this.settings.theme+"/"+this.settings.control+".html";
		}
		jQuery.ajax({
			async: params.async,
			type: 'GET', 
			url: href,
			dataType: 'html',
			success: jQuery.proxy(function(data){
				this.setHtml(data);
				this.setting({isAjaxHtml:true});
			}, this),
			error: jQuery.proxy(function(jqXHR,textStatus,errorThrown){
				this.setting({isAjaxHtml:false});
				this.htmlError({obj:jqXHR,status:textStatus,error:errorThrown});
			},this),
		}).done();
		return null;
	};
	
	this.setHtml = function(data){
		if ((typeof this.settings.isAjaxHtml!=='undefined')&&(this.settings.isAjaxHtml==true)) return;
		if ((typeof data!=='undefined')&&(data!==null)) {
			if (this.TYPE=="PAGE_VIEW") {
				var tag = "body"; 
			} else {
				var tag = this.settings.target;
			}
			jQuery(tag).html(data);
			this.themeLoaded(params);
		}
	};

	this.loadCss=function(){
		var href = null;
		if (this.settings.app=="sys") {
			href = this.settings.base+"/sys/"+this.settings.version+"/"+this.settings.module+"/"+this.settings.control+"/theme/"+this.settings.theme+"/"+this.settings.control+".css";
		} else {
			href = this.settings.base+"/apps/"+this.settings.app+"/"+this.settings.version+"/"+this.settings.module+"/"+this.settings.control+"/theme/"+this.settings.theme+"/"+this.settings.control+".css";
		}
		if (jQuery("head link[href=\""+href+"\"]").size()==0) 
			jQuery("head").append('<link rel="stylesheet" href="'+ href +'" type="text/css" />');
	};

	/*
	 *	params.async		load theme asynchronously
	 *	params.htmlLoaded after html load
	 */
	this.loadTheme = function(params) {
		this.themeLoading(params);
		this.loadCss();
		var data = this.getHtml(params);
		this.setHtml(data);
	};
};

/*
 * Base Container Control UI
 */
// Base Container Control class
function CB_ContainerControl(params) {
	this.TYPE = "CONTAINER_CONTROL";
	this.components = null;
	this.setting(params);

	this.setComponent = function(component) {
		if ((typeof component==='undefined')||(component===null)) return;
		if (this.components===null) this.components = new Array();	// inherit issue
		var len = this.components.push(component);
		component.setContainer(this);
		component.setting({index:len-1});
		return len-1;
	};

	this.setTheme = function (params) {
		this.viewObj.loadTheme(params);
		// reload every component's theme
		for (var i=0; i<this.components.length; i++) {
			this.components[i].viewObj.loadTheme();
		}
	};
};
// inherit from CB_UIControl
CB_ContainerControl.prototype = new CB_UIControl;

// Common Container view class
function CB_ContainerView(params) {
	this.TYPE = "CONTAINER_VIEW";
	this.setting(params);
};
// inherit from CB_UIView
CB_ContainerView.prototype = new CB_UIView;

/*
 * Base Component Control UI
 */
// Component Control class
function CB_ComponentControl(params) {
	this.TYPE = "COMPONENT_CONTROL";
	this.container = null;
	this.setting(params);

	this.setContainer = function(container) {
		if ((typeof container==='undefined')||(container===null)) return;
		this.container = container;
	};
};
// inherit from CB_ContainerControl
CB_ComponentControl.prototype = new CB_ContainerControl;

// Component view class
function CB_ComponentView(params) {
	this.TYPE = "COMPONENT_VIEW";
	this.setting(params);
};
// inherit from CB_ContainerView
CB_ComponentView.prototype = new CB_ContainerView;

/*
 * Base Page Control UI
 */
// Base Page Control class
function CB_PageControl(params) {
	this.TYPE = "PAGE_CONTROL";
	this.setting(params);
	this.setting({target:"body"});
};
// inherit from CB_ContainerControl
CB_PageControl.prototype = new CB_ContainerControl;

// Common page view class
function CB_PageView(params) {
	this.TYPE = "PAGE_VIEW";
	this.setting(params);
	
};
// inherit from CB_ContainerView
CB_PageView.prototype = new CB_ContainerView;

/*
 * Area Control UI
 */
// Area Control class
function CB_AreaControl(params) {
	this.TYPE = "AREA_CONTROL";
	this.setting(params);

};
// inherit from CB_ComponentControl
CB_AreaControl.prototype = new CB_ComponentControl;

// Area view class
function CB_AreaView(params) {
	this.TYPE = "AREA_VIEW";
	this.setting(params);
};
// inherit from CB_ComponentView
CB_AreaView.prototype = new CB_ComponentView;


/*
 * Base Widget Container Control
 */
// Base Widget Container Control class
function CB_WContainerControl(params) {
	this.TYPE = "WIDGET_CONTAINER_CONTROL";
	this.setting(params);
	
	this.setContTitleBar=function(params){this.viewObj.setContTitleBar(params);};
	this.setContBorder	=function(params){this.viewObj.setContBorder(params);};
	this.setTitleBar	=function(params){this.viewObj.setTitleBar(params);};
	this.setStatusBar	=function(params){this.viewObj.setStatusBar(params);};
	this.setBorder		=function(params){this.viewObj.setBorder(params);};
	this.setOption 		=function(params){this.viewObj.setOption(params);};
	this.setCss 		=function(params){this.viewObj.setCss(params);};
	this.minimize		=function(params){this.viewObj.minimize(params);};
	this.maximize		=function(params){this.viewObj.maximize(params);};
	this.close			=function(params){this.viewObj.close(params);};
	this.popup			=function(params){this.viewObj.popup(params);};
	this.restore		=function(params){this.viewObj.restore(params);};
	this.active			=function(index){this.viewObj.active(index);};

};
// inherit from CB_ComponentControl
CB_WContainerControl.prototype = new CB_ComponentControl;

// Common widget container view class
function CB_WContainerView(params) {
	this.TYPE = "WIDGET_CONTAINER_VIEW";
	this.setting(params);
	// must be overrided
	this.setContTitleBar=function(params){};
	this.setContBorder	=function(params){};
	this.setTitleBar	=function(params){};
	this.setStatusBar	=function(params){};
	this.setBorder		=function(params){};
	this.setOption 		=function(params){};
	this.setCss 		=function(params){};
	this.minimize		=function(params){};
	this.maximize		=function(params){};
	this.close			=function(params){};
	this.popup			=function(params){};
	this.restore		=function(params){};
	this.active			=function(index){};
};
// inherit from CB_ComponentView
CB_WContainerView.prototype = new CB_ComponentView;

/*
 * Base Widget Component Control
 */
// Base Widget Control class
function CB_WidgetControl(params) {
	this.TYPE = "WIDGET_COMPONENT_CONTROL";
	this.setting(params);

	this.setContTitleBar=function(params){
		params = jQuery.extend(params,{index:this.settings.index});
		this.container.setContTitleBar(params);
	};
	this.setContBorder=function(params){
		this.container.setContBorder(params);
	};
	this.setTitleBar=function(params){
		params = jQuery.extend(params,{index:this.settings.index});
		this.container.setTitleBar(params);
	};
	this.setStatusBar=function(params){
		params = jQuery.extend(params,{index:this.settings.index});
		this.container.setStatusBar(params);
	};
	this.setBorder=function(params){
		params = jQuery.extend(params,{index:this.settings.index});
		this.container.setBorder(params);
	};
	this.setOption=function(params){
		params = jQuery.extend(params,{index:this.settings.index});
		this.container.setOption(params);
	};
	this.setCss=function(params){
		params = jQuery.extend(params,{index:this.settings.index});
		this.container.setCss(params);
	};
	this.minimize=function(params){
		params = jQuery.extend(params,{index:this.settings.index});
		this.container.minimize(params);
	};
	this.maximize=function(params){
		params = jQuery.extend(params,{index:this.settings.index});
		this.container.maximize(params);
	};
	this.close=function(params){
		params = jQuery.extend(params,{index:this.settings.index});
		this.container.close(params);
	};
	this.popup=function(params){
		params = jQuery.extend(params,{index:this.settings.index});
		this.container.popup(params);
	};
	this.restore=function(params){
		params = jQuery.extend(params,{index:this.settings.index});
		this.container.restore(params);
	};
	this.active=function(){
		this.container.active(this.settings.index);
	};
};
// inherit from CB_ComponentControl
CB_WidgetControl.prototype = new CB_ComponentControl;

// Common widget class
function CB_WidgetView(params) {
	this.TYPE = "WIDGET_COMPONENT_VIEW";
	this.setting(params);

};
// inherit from CB_ComponentView
CB_WidgetView.prototype = new CB_ComponentView;

