/**
 * @fileoverview 项目全局包配置
 */
function GlobalInit(){
	"use strict";

	// 每个项目都以widget和util作为包名
	AppUtil.namespace('widget');
	AppUtil.namespace('util');
}

;(function(S,exports,undefined){
	"use strict";

	if(S === undefined){
		throw Error('KISSY 未定义')
		return;
	}

	KISSY.config({
		base:'http://a.tbcdn.cn/s/kissy/1.3.0/'
	});

	exports.AppUtil = {
		_tag:(function(){
			var d = new Date();
			return '' + d.getFullYear() + (d.getMonth()+1) + d.getDate();
		})(),

		namespace: function(ns){
			var self = this;
			KISSY.config({
				combine:self.isCombo(),
				charset: 'utf-8',
				packages:[{
					combine:self.isCombo(),
					debug: true,
					name : ns,
					path : self.globalJSPath + ns,
					tag : self.getTag(),
					ignorePackageNameInUri:true
				}]
			});
		},
		setTag:function(t){
			this._tag = t;
		},
		getTag:function(){
			return this._tag;
		},
		isCombo:function(){
			return this.getUrlConfig()['__combine__'];
		},
		/*
		 * 这里的域名和应用global.js时的域名有关系
		 * 如果是用相对路径引用，则调试状态就是取相对路径的文件
		 *
		 * 输入
		 * http://a.tbcdn.cn/??a.js,b.js,config.js,c.js
		 * http://a.tbcdn.cn/??a.js,b.js,path/to/config.js,c.js
		 * http://a.tbcdn.cn/??a.js,b.js,c.js,config.js
		 * http://a.tbcdn.cn/??a.js,b.js,c.js,path/to/config.js
		 * http://a.tbcdn.cn/??config.js,a.js,b.js
		 * http://a.tbcdn.cn/??path/to/config.js,a.js,b.js
		 * http://a.tbcdn.cn/path/to/??config.js,a.js,b.js
		 *
		 * 输出
		 * http://a.tbcdn.cn/path/to/
		 * */
		globalJSPath:(function(){
			var scripts = document.getElementsByTagName("script"),
				script = scripts[scripts.length-1],
				src=script.src;
			
			if(/\?\?/ig.test(src)){
				var a = src.match(/(,[^,]+)config\.js|,config\.js|\?[^,?]+config\.js|config\.js/);
				var uri = src.replace(/\?\?.+$/ig,'');
				var p = a[0]? a[0].replace(/[?,]/ig,''):'';
				if(p === 'config.js'){
					p = '';
				}
				return uri + p.replace(/\/[^\/]+$/i,'/').replace(/\?.+/i,'');
			}else{
				return src.replace(/(\/[^\/]+\.js)/,'/').replace(/\?.+/i,'');
			}
		})(),
		getUrlConfig:function(){
			var urlConfig = {};
			S.each(S.merge({
				/*
				 * 这里写URL参数里需要匹配的参数名和默认值
				 * 
				 * example:
				 * 		http://abc.com/file.html?__tdev__=true
				 * 		http://abc.com/file.html?__tdev__=true&__combine=true
				 * */
				// __tdev__:		false,
				__combine__:	 	true
			},S.unparam(window.location.search.replace(/\?/ig,''))	),function(v,k){
				urlConfig[k] = (v == 'true')? true: (v == 'false')? false:v ;
			});
			return urlConfig;
		}
	};

})(KISSY,window);

GlobalInit();

