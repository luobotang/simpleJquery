function $(ele) {
	return new $.fn.init(ele);
}

$.fn = $.prototype;

$.fn.init = function (ele, context) {
	this.el = typeof ele === 'string' ? (context || document).querySelector(ele) : ele;
};

$.fn.init.prototype = $.prototype;

$.fn.find = function (ele) {
	return new $.fn.init(ele, this.el);
};

$.fn.on = function (event, target, callback) {
	var delegate = typeof target === 'string',
		handler;
	handler = delegate ? function (e) {
			if ($.is(e.target, target)) {
				return callback.call(e.target, e);
			}
		} : target;
	this.el.addEventListener(event, handler, false);
	return this;
};

$.fn.html = function (html) {
	if (arguments.length) {
		this.el.innerHTML = html;
		return this;
	} else {
		return this.el.innerHTML;
	}
};

$.is = function (ele, selector) { // only support 'div' or '.class'
	return selector.indexOf('.') > -1 ?
		ele.classList.contains(selector.substr(1)) : // .class
		ele.tagName === selector.toUpperCase(); // 'span'
};

$.each = function (o, callback) {
	if (Array.isArray(o)) {
		return o.forEach(callback);
	}
	if (typeof o === 'object') {
		var k, ret;
		for (k in o) {
			ret = callback(o[k], k);
			if (ret === false) return;
		}
	}
};

$.map = function (o, callback) {
	if (Array.isArray(o)) {
		return o.map(callback);
	}
	if (typeof o === 'object') {
		var k, ret, result = [];
		for (k in o) {
			ret = callback(o[k], k);
			result.push(ret);
		}
		return result;
	}
};