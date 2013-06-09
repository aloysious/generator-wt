/**
 * @fileoverview 应用级组件，请修改组件描述
 **/
KISSY.add(function (S) {

	"use strict";

    /**
     * 请修改组件描述
     * @class Demo
     * @constructor
     * @extends S.Base
     */
	function Demo(id, cfg) {
		if (this instanceof Demo) {

			this.con = S.one(id);

			// 调用父类构造函数
			Demo.superclass.constructor.call(this, cfg);
			this.init();

		} else {
			return new Demo(id, cfg);
		}
	}

	// 属性样例
	Demo.ATTRS = {
		a: {
			setter: function(){},
			getter: function(){},
			value: 1
		}
	};

	S.extend(Demo, S.Base, {

		init: function() {
			// 请在此书写代码
		},

		destory: function(){

		}
	});

	return Demo;

}, {
	requires: ['base','node']
});
