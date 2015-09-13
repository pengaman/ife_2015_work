//判断arr是否是数组类型

function IsArray(arr){
	
	if(arr.constructor==Array)
	
	return true;
	else return false;}
//判断fn是否是函数类型
function IsFunction(fn){
	if(typeof fn=="function")
	return true;
	else return false;}

	
// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(src) {
    // 对原始类型
    if (src == null || typeof src != 'object') {
        return src;
    }
     //对于对象类型：
    // 对于日期类型
    if (src instanceof Date) {
        var clone = new Date(src.getDate());
        return clone;
    }

    // 对于Array
    if (src instanceof Array) {
        var clone = [];
        for (var i = 0, len = src.length; i < len; i++) {
            clone[i] = src[i];
        }
        return clone;
    }

    // 对于Object
    if (src instanceof Object) {
        var clone = {};
        for (var key in src) {
                clone[key] = cloneObject(src[key]);
        }
        return clone;
    }
}





// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
    
	return str.replace(/^\s*|\s*$/,'');
}


// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    for(var i=0;i<arr.length;i++)
	{fn(arr[i],i);}
	
}

// 其中fn函数可以接受两个参数：item和index

// 使用示例
var arr = ['java', 'c', 'php', 'html'];
function output(item, index) {
    console.log(index + ': ' + item)
}
each(arr, output);  // 0:java, 1:c, 2:php, 3:html



// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
	return Object.keys(obj).length;}
// 使用示例
var obj = {
    a: 1,
    b: 2,
    c: {
        c1: 3,
        c2: 4
    }
};
console.log(getObjectLength(obj)); // 3 

// 判断是否为邮箱地址
function isEmail(emailStr) {
   if(/^([a-za-z0-9_\.\-])+\@(([a-za-z0-9\-])+\.)+([a-za-z0-9]{2,4})+$/)
   return true;
   else return false;
}

// 判断是否为手机号
function isMobilePhone(phone) {
    if(/^[1][0-9]{10}$/)
	return true;
	else return false;
}


// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
   element.className += " " + newClassName;
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
     element.className = element.className.replace(oldClassName, '');
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    if(element.parentNode==siblingNode.parentNode)
	{return true;}
	else
	{return false;}
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
   var left = element.offsetLeft;
    var top = element.offsetTop;
    var parent = element.offsetParent;

    while (parent !== null) {
        left += parent.offsetLeft;
        top += parent.offsetTop;
        parent = parent.offsetParent;
    }

    var scrollLeft = document.body.scrollLeft + document.documentElement.scrollLeft;
    var scrollTop = document.body.scrollTop + document.documentElement.scrollTop;

    left -= scrollLeft;
    top -= scrollTop;

    return {
        x: left,
        y: top
    }
   
}


// 实现一个简单的Query
function $(selector) {
return document.querySelector(selector);
}

// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    if(element.addEventLisener){
		element.addEventLisener(event,listener,false);}
	else if(element.attashEvent){
		element.attachEvent('on'+event,listener);
		}else{
			element['on'+event]=listener;}
}



// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, event, listener) {
  if(element.removeEventLisener){
		element.removeEventLisener(event,listener,false);}
	else if(element.detashEvent){
		element.detachEvent('on'+event,listener);
		}else{
			element['on'+event]=null;} 
}



//事件代理
function delegateEvent(element, tag, eventName, listener) {
   element['on' + eventName] = function(e) {
        var e = e || window.event;
        var target = e.srcElement ? e.srcElement : e.target;
        var tname = target.nodeName.toLowerCase();
        if (tname === tag) {
            target['on' + eventName] = listener;
        }
    }
}
$.delegate = delegateEvent;


// 使用示例
// 还是上面那段HTML，实现对list这个ul里面所有li的click事件进行响应
$.delegate($("#list"), "li", "click", clickHandle);

//BOM
function isIE() {
    var ua = navigator.userAgent.toLowerCase();
    var ie = ua.match(/rv:([\d.]+)/) || ua.match(/msie ([\d.]+)/);
    if(ie) {
        return ie[1];
    }
    else {
        return -1;
    }
}

// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
    if (expiredays) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + expiredays);
        var expires = ';expires=' + exdate.toUTCString();
    }
    else {
        expires = '';
    }
    document.cookie = cookieName + '=' + escape(cookieValue) + expires;
}

// 获取cookie值
function getCookie(cookieName) {
    var re = new RegExp(cookieName + '=(.*?)($|;)');
    return re.exec(document.cookie)[1];
}



//Ajax封装 
function ajax(url, options) {
    var xmlhttp;
	if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else {        
        xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
    }

}

// 使用示例：
ajax(
    'http://localhost:8080/server/ajaxtest', 
    {
        data: {
            name: 'simon',
            password: '123456'
        },
        onsuccess: function (responseText, xhr) {
            console.log(responseText);
        }
    }
);
