// view Class
function cb_sys_ui_Form_cv(params) {
	this.setting(params);
	
	this.setContTitleBar = function(params) {
		if (typeof params=== 'undefined') return;
		if ((typeof params.index==='undefined')||(params.index<0)) {
			var tag = this.settings.target+" .cb_sys_ui_Form .TBars";
			params.index = -1;
		}else{
			var tag = this.settings.target+" .cb_sys_ui_Form .cb_sys_ui_Form_t"+params.index;
		}
		this.setTitle(params,tag);
	};
	this.setTitleBar = function(params) {
		if ((typeof params=== 'undefined')||(typeof params.index==='undefined')) return;
		var tag = this.settings.target+" .cb_sys_ui_Form .cb_sys_ui_Form_c"+params.index;
		this.setTitle(params,tag);
	};
	this.setOption = function(params) {
		if (typeof params=== 'undefined') return;
		if (typeof params.display!== 'undefined') this.setTitleBar({index:params.index,option:params.display});
		if ((typeof params.text!== 'undefined')&&(params.text!==null)) this.setTitleBar({index:params.index,option:{text:params.text}});
		if ((typeof params.css!== 'undefined')&&(params.css!==null)) this.setTitleBar({index:params.index,option:{css:params.css}});
	};

	this.setTitle = function(params, target) {
		// set title bar
		if ((typeof params.display!== 'undefined')&&(params.display==true)){
			if (params.index<0) jQuery(target).show();
			else jQuery(target+" .TitleBar").show();
		}
		if ((typeof params.display!== 'undefined')&&(params.display==false)){
			if (params.index<0) jQuery(target).hide();
			else jQuery(target+" .TitleBar").hide();
		}
		// set title bar css
		if ((typeof params.css!== 'undefined')&&(params.css!==null)) {
			jQuery(target+" .TitleBar").css(params.css.name, params.css.value);
		}

		// set thumbnail
		if ((typeof params.thumbnail!== 'undefined')&&(params.thumbnail==true)) {
			jQuery(target+" .TitleBar .thumbnail").show();
		}
		if ((typeof params.thumbnail!== 'undefined')&&(params.thumbnail==false)){
			jQuery(target+" .TitleBar .thumbnail").hide();
		}
		if ((typeof params.thumbnail!== 'undefined')&&(typeof params.thumbnail.css!== 'undefined'))
			jQuery(target+" .TitleBar .thumbnail").css(params.thumbnail.css.name,params.thumbnail.css.value);
		if ((typeof params.thumbnail!== 'undefined')&&(typeof params.thumbnail.html!== 'undefined'))
			jQuery(target+" .TitleBar .thumbnail").html(params.thumbnail.html);

		// set title text
		if ((typeof params.title!== 'undefined')&&(params.title!==null)) {
			var s = target+" .TitleBar  .title h3";
			jQuery(s).text(params.title);
		}

		// set caption buttons
		if ((typeof params.option!== 'undefined')&&(params.option==true)) {
			jQuery(target+" .TitleBar .option").show();
		}
		if ((typeof params.option!== 'undefined')&&(params.option==false)){
			jQuery(target+" .TitleBar .option").hide();
		}

		if ((typeof params.minimize!== 'undefined')&&(params.minimize==true)) {
			jQuery(target+" .TitleBar .minimize").show();
			jQuery(target+" .TitleBar .minimize").attr("onclick", this.settings.variable+".minimize("+params.index+");");
		}
		if ((typeof params.minimize!== 'undefined')&&(params.minimize==false)){
			jQuery(target+" .TitleBar .minimize").hide();
		}
		
		if ((typeof params.maximize!== 'undefined')&&(params.maximize==true)) {
			jQuery(target+" .TitleBar .maximize").show();
			jQuery(target+" .TitleBar .maximize").attr("onclick", this.settings.variable+".maximize("+params.index+");");
		}
		if ((typeof params.maximize!== 'undefined')&&(params.maximize==false)){
			jQuery(target+" .TitleBar .maximize").hide();
		}
			
		if ((typeof params.popup!== 'undefined')&&(params.popup==true)) {
			jQuery(target+" .TitleBar .popup").show();
			jQuery(target+" .TitleBar .popup").attr("onclick", this.settings.variable+".popup("+params.index+");");
		}
		if ((typeof params.popup!== 'undefined')&&(params.popup==false)){
			jQuery(target+" .TitleBar .popup").hide();
		}

		if ((typeof params.restore!== 'undefined')&&(params.restore==true)) {
			jQuery(target+" .TitleBar .restore").show();
			jQuery(target+" .TitleBar .restore").attr("onclick", this.settings.variable+".restore("+params.index+");");
		}
		if ((typeof params.restore!== 'undefined')&&(params.restore==false)){
			jQuery(target+" .TitleBar .restore").hide();
		}

		if ((typeof params.close!== 'undefined')&&(params.close==true)) {
			jQuery(target+" .TitleBar  .close").show();
			jQuery(target+" .TitleBar  .close").attr("onclick", this.settings.variable+".close("+params.index+");");
		}
		if ((typeof params.close!== 'undefined')&&(params.close==false)){
			jQuery(target+" .TitleBar  .close").hide();
		}

		// set option 
		if (typeof params.option!== 'undefined') {
			if (params.option==true) jQuery(target+" .TitleBar .option").show();
			if (params.option==false) jQuery(target+" .TitleBar .option").hide();
			if ((typeof params.option.text!== 'undefined')&&(params.option.text!==null)) jQuery(target+" .TitleBar .option").text(params.option.text);
			if ((typeof params.option.event!== 'undefined')&&(params.option.event!==null)) jQuery(target+" .TitleBar .option").attr("onclick", params.option.event);
			if ((typeof params.option.css!== 'undefined')&&(params.option.css!==null)) jQuery(target+" .TitleBar .option").css(params.option.css.name, params.option.css.value);
		}
	};

	this.setStatusBar = function(params) {
		if ((typeof params=== 'undefined')||(typeof params.index==='undefined')) return;
		var target = this.settings.target+" .cb_sys_ui_Form .cb_sys_ui_Form_c"+params.index;
		if ((typeof params.display!== 'undefined')&&(params.display==true))
			jQuery(target+" .StatusBar").show();
		if ((typeof params.display!== 'undefined')&&(params.display==false))
			jQuery(target+" .StatusBar").hide();

		// set status info
		if ((typeof params.status!== 'undefined')&&(params.status!==null)) {
			var s = target+" .StatusBar .statusInfo";
			jQuery(s).text(params.status);
		}
		// set css
		if ((typeof params.css!== 'undefined')&&(params.css!==null)) {
			jQuery(target+" .StatusBar").css(params.css.name, params.css.value);
		}
	};


	this.setContBorder = function(params) {
		if (typeof params=== 'undefined') return;
		if ((typeof params.index==='undefined')||(params.index<0)) {
			var tag = this.settings.target+" .cb_sys_ui_Form";
			params.index = -1;
		}else{
			var tag = this.settings.target+" .cb_sys_ui_Form .cb_sys_ui_Form_t"+params.index+" .TitleBar";
		}
		this.border(params,tag);
	};
	this.setBorder = function(params) {
		if ((typeof params=== 'undefined')||(typeof params.index==='undefined')) return;
		var tag = this.settings.target+" .cb_sys_ui_Form .cb_sys_ui_Form_c"+params.index;
		this.border(params,tag);
	};

	this.border = function(params,tag) {
		if ((typeof params.display!== 'undefined')&&(params.display==false)) {
			jQuery(tag).css("border", "none");
		};
		// set css
		if ((typeof params.css!== 'undefined')&&(params.css!==null)) {
			jQuery(tag).css("border", params.css);
		}
	};
	
	this.setCss = function(params) {
		if ((typeof params=== 'undefined')||(typeof params.index==='undefined')) return;
		var tag = this.settings.target+" .cb_sys_ui_Form .cb_sys_ui_Form_c"+params.index;
		jQuery(tag).css(params.name,params.value);
	};

	this.minimize = function(index){
		jQuery(this.getComponentTarget(index)).hide();
	};
	this.maximize = function(index){
		jQuery(this.getComponentTarget(index)).show();
	};
	this.popup = function(index){
		jQuery("body").append('<div class="cb_sys_ui_Form_locker"></div>');
		jQuery(".cb_sys_ui_Form_locker").fadeIn();
		jQuery(this.settings.target+" .cb_sys_ui_Form .cb_sys_ui_Form_c"+index).addClass("cb_sys_ui_Form_popup");
	};
	this.restore = function(index){
		jQuery(this.settings.target+" .cb_sys_ui_Form .cb_sys_ui_Form_c"+index).removeClass("cb_sys_ui_Form_popup");
		jQuery(".cb_sys_ui_Form_locker").fadeOut("normal", function(){jQuery(".cb_sys_ui_Form_locker").remove();});
	};
	this.close = function(index){
		jQuery(this.settings.target+" .cb_sys_ui_Form .TBars .cb_sys_ui_Form_t"+index).remove();
		jQuery(this.settings.target+" .cb_sys_ui_Form .Comps .cb_sys_ui_Form_c"+index).remove();
		jQuery(".cb_sys_ui_Form_locker").fadeOut("normal");
		this.controlObj.components.splice(index,1);
		jQuery(".cb_sys_ui_Form_locker").remove();
	};

	this.active=function(idx){
		// set current tab
		if (typeof idx==='undefined') return;
		for (var i=0; i<this.controlObj.components.length; i++) {
			if (i==idx) {
				jQuery(this.settings.target + " .cb_sys_ui_Form .cb_sys_ui_Form_t"+i).addClass("current");
				jQuery(this.settings.target + " .cb_sys_ui_Form .cb_sys_ui_Form_c"+i).css("display", "block");
			} else {
				jQuery(this.settings.target + " .cb_sys_ui_Form .cb_sys_ui_Form_t"+i).removeClass("current");
				if ((typeof this.controlObj.settings.style!=='undefined')&&(this.controlObj.settings.style.toLowerCase()=="tab")) {
					jQuery(this.settings.target + " .cb_sys_ui_Form .cb_sys_ui_Form_c"+i).css("display", "none");
				} else {
					jQuery(this.settings.target + " .cb_sys_ui_Form .cb_sys_ui_Form_c"+i).css("display", "block");
				}
			}
		}
	};

	this.getComponentTarget=function(index){return this.settings.target+" .cb_sys_ui_Form .cb_sys_ui_Form_c"+index+" .Component";};
	

	this.addWidget=function(params){
		if ((typeof params=== 'undefined')||(typeof params.index==='undefined')) return;
		// remove tag if it exists
		var h=jQuery(this.settings.target + " .cb_sys_ui_Form .cb_sys_ui_Form_t"+params.index).html();
		if (h!==null) {
			jQuery(this.settings.target+" .cb_sys_ui_Form .cb_sys_ui_Form_t"+params.index).remove();
			jQuery(this.settings.target+" .cb_sys_ui_Form .cb_sys_ui_Form_c"+params.index).remove();
		}
		// add new component
		var html='<div class="cb_sys_ui_Form_t'+params.index+' tab"></div>';
		jQuery(this.settings.target+" .cb_sys_ui_Form .TBars").append(html);
		html='<div class="cb_sys_ui_Form_c'+params.index+' comp"><div class="Component"></div><div class="StatusBar"><div class="statusInfo"></div></div></div>';
		jQuery(this.settings.target+" .cb_sys_ui_Form .Comps").append(html);
		this.addTitleBar(params.index);
		// set titlebar
		this.setTitleBar({index:params.index, title:params.title});
		this.setContTitleBar({index:params.index, title:params.title});
		var s = this.controlObj.settings.variable+".active("+params.index+");";
		jQuery(this.settings.target + " .cb_sys_ui_Form .cb_sys_ui_Form_t"+params.index+" .TitleBar .title").attr("onclick", s);
//		this.setBorder({index:params.index, display:false});
	}
	
	this.addTitleBar = function(index) {
		var html = '<div class="TitleBar">\n<div class="thumbnail"></div>'
			+'<div class="captionBtn">\n<div class="option"></div><div class="minimize"></div><div class="maximize"></div><div class="popup"></div><div class="restore"></div><div class="close"></div></div>\n<div class="title"><h3></h3></div>\n<div class="menu"></div>\n</div>';
		jQuery(this.settings.target+" .TBars .cb_sys_ui_Form_t"+index).append(html);
		jQuery(this.settings.target+" .Comps .cb_sys_ui_Form_c"+index).prepend(html);
	};
	// override getHtml
	this.getHtml = function() {
		return '<div class="cb_sys_ui_Form"><div class="TBars"></div><div class="Comps"></div> <div class="cb_sys_ui_Form_Footer"></div></div>'
	};
	this.themeLoaded=function(){
		if (!this.isTabStyle()) this.setContTitleBar({display:false});
	};
	this.isTabStyle=function(){
		if ((typeof this.controlObj.settings.style!=='undefined')&&(this.controlObj.settings.style.toLowerCase()=="tab"))  
			return true;
		else
			return false;
	}
};
// inherit from CB_WContainerView
cb_sys_ui_Form_cv.prototype = new CB_WContainerView;
cb_sys_ui_Form_cv.prototype.super = CB_WContainerView.prototype;

function cb_sys_ui_Form(params) {
	this.setting(params);
	this.setView(new cb_sys_ui_Form_cv(params));
	
	this.init = function(target, theme) {
		if (typeof target!== 'undefined') this.settings.target = target;
		if (typeof theme!== 'undefined') this.settings.theme = theme;
		this.viewObj.loadTheme();
	};
	
	this.setContTitleBar=function(params){this.viewObj.setContTitleBar(params);};
	this.getComponentTarget=function(index){return this.viewObj.getComponentTarget(index);};
	
	this.addWidget = function(component) {
		var idx = this.setComponent(component);
		component.setting({target:this.getComponentTarget(idx), index:idx});
		this.viewObj.addWidget(component.settings);
		this.setContTitleBar({index:idx,minimize:false,maximize:false,close:false,popup:false,restore:false,option:false,thumbnail:false});
		this.setTitleBar({index:idx,minimize:false,maximize:false,close:false,popup:false,restore:false,option:false,thumbnail:false});
		return idx;
	};
	
};
// inherit from CB_WContainerControl
cb_sys_ui_Form.prototype = new CB_WContainerControl;
cb_sys_ui_Form.prototype.super = CB_WContainerControl.prototype;
