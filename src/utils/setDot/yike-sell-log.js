/**
 * Copyright (c) 2014-2017 Zuoyebang, All rights reseved.
 * @fileoverview 直播售卖侧前端打点工具
 * @author sunmingzhang | sunmingzhang@zuoyebang.com
 * @version 1.0 | 2018-06-05 | sunmingzhang    // 初始版本。
 * @version 2.0 | 2018-06-05 | dengxin    // 兼容小程序打点
 * @version 3.0 | 2019-02-29 | wurongliang    // 小程序打点补充
 *
 * @method send(data)         // 方法：自定义打点(参阅下文详述)。
 * @param data {Object}       // 参数：打点数据。
 * @return No                 // 返回：无。
 * 
 @example    // 典型的调用示例。

    import WxLog from '../../utils/setDot/yike-sell-log'
    
    // app 中设置
    WxLog.setFr(fr);
		WxLog.setLastfrom(lastfrom);
    // 自定义打点
    WxLog.send({
			name: 'M1_8_1',
			uid: 1212
		});
 */

import logParamHandle from './log-param-handle'

let app = getApp()
var userType; //用户角色
//获取系统信息
var systemInfo = {};
wx.getNetworkType({
  success(res) {
    systemInfo.networkType = res.networkType
  }
})
wx.getSystemInfo({
  success: function(res) {
    systemInfo.height = res.screenHeight;
    systemInfo.width = res.screenWidth;
    systemInfo.brand = res.brand;
    systemInfo.model = res.model;
    systemInfo.version = res.version;
    systemInfo.system = res.system;
    systemInfo.platform = res.platform;
  }
})

var commonData = {
  lastfrom: '',
  fr: '',
  appid: ''
};

// 端外环境生成一个尽量唯一的标识，对标端上的cuid
// var cuidItem = 'yikeLogCuid';
// var cuid = wx.getStorageSync(cuidItem);
// // if (!isInApp && !cuid) {
// if ( !cuid) {
//   cuid = guid(32);
//   wx.setStorageSync(cuidItem, cuid);
// }

var actionObj = {
  show: 1,
  click: 2,
  realShow: 3
}

function getName(pageId, positionId, actionId) {
  var args = Array.prototype.slice.apply(arguments);
  return args.join('_');
}
function _isWindow (obj) {
    return obj != null && obj.window;
  }

function _isArraylike( obj ) {
  var length = "length" in obj && obj.length,
  type = _type( obj );
  //如果是函数，或者window那么直接返回false
  if ( type === "function" || _isWindow( obj ) ) {
    return false;
  }
  if ( obj.nodeType === 1 && length ) {
    return true;
  }
  return type === "array" || length === 0 ||
       //length是数字类型，同时length>0而且length-1要存在
    typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}

function _each(obj,callback){  
    var  
      value,  
      length=obj.length,  
      i=0,  
      isArray=_isArraylike(obj);  
    //两种情况  
    //类数组  
    if(isArray){  
        for(;i<length;i++){  
            //若是返回false，则直接跳出  
            value=callback.call(obj,i,obj[i]);  
            if(value===false){  
                break;  
            }  
        }  
    }else{  
        for(i in obj){  
            value=callback.call(obj,i,obj[i]);  
            if(value===false){  
                break;  
            }  
        }  
    }  
    return obj;  
}; 

function _type(obj) {
  var toString = Object.prototype.toString,
    class2type = {
       "[object Array]": "array",
       "[object Boolean]": "boolean",
       "[object Date]": "date",
       "[object Function]": "function",
       "[object Number]": "number",
       "[object Object]": "object",
       "[object RegExp]": "regexp",
       "[object String]": "string"
    }
  return obj == null ? String( obj ) : class2type[ toString.call(obj) ] || "object";
}

function isEmptyObject(e) {
  var t;
  for (t in e)
    return !1;
  return !0
}

//判断是否是纯粹的对象
function isPlainObject(obj) {
  var class2type = {};
  var getProto = Object.getPrototypeOf;
  var toString = class2type.toString;
  var hasOwn = class2type.hasOwnProperty;
  var fnToString = hasOwn.toString;
  var ObjectFunctionString = fnToString.call(Object);
  var proto, Ctor;

  if (!obj || toString.call(obj) !== "[object Object]") {
    return false;
  }

  proto = getProto(obj);

  //如果对象没有原型，那也算纯粹的对象，比如用 Object.create(null) 这种方式创建的对象 
  if (!proto) {
    return true;
  }

  Ctor = hasOwn.call(proto, "constructor") && proto.constructor;

  return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
}

function jsonToQuery(json, shouldEncode) {
  shouldEncode = typeof shouldEncode == 'boolean' ? shouldEncode : true;

  function getQuery(key, val){
    var _query;
    switch(_type(val)){
      case 'boolean':
      case 'number':
      case 'string':
        _query = (key + '=' + (shouldEncode ? encodeURIComponent(val) : val));
        break;
      case 'regexp':
        _query = (key + '=' + (shouldEncode ? encodeURIComponent(val.source) : val.source));
        break;
      case 'date':
        _query = (key + '=' + val.getTime());
        break;
      case 'array':
        _query = [];
        for (var i = 0; i < val.length; ++i) {
          if (/^boolean|number|string|regexp|date$/.test(_type(val[i]))) {
            _query.push(arguments.callee(key, val[i]));
          }
        }
        break;
      default:
        _query = undefined;
    }
    return _query;
  }

  var queries = [];
  if (_type(json) == 'object' && isPlainObject(json)) {
    _each(json, function(key, val){
      var query = getQuery(key, val);
      query && (queries = queries.concat(query));
    });
  }

  return queries.join('&');
}

function getPath(prePath, pageId, pathParams) {
  if (!pageId) {
    return '.'
  } else {
    var curPath = pageId;
    if (isPlainObject(pathParams) && !isEmptyObject(pathParams)) {
      for(var p in pathParams) {
        curPath = curPath + '(' + p + '!' + pathParams[p] + ')';
      }
    }
    return prePath ? (prePath + '_' + curPath) : curPath;
  }
}
// function getUserType() {
//   wx.request({
//     url: API.baseUrl + '/goods/na/stat/userrole',
//     header: {"content-type": "application/x-www-form-urlencoded"},
//     method: "GET",
//     data: {
//       zybuss: wx.getStorageSync('zybuss'),
//       WxMiniApp: 1,
//       wxin: 1
//     },
//     dataType: "json",
//     success: function (res) {
//       if (res && res.data.errNo == 0) {
//         app.globalData.userType = res.data.data.userType;
//       }
//     },
//     fail: function (res) {
//       console.log(res);
//     },
//     complete: function () {
//     }
//   });
// } 
function sendLog(data, logUrl='https://nlogtj.zuoyebang.cc/log/yikenotice.gif?'){
  var name = data.name;
  //获取页面栈
  var pages = getCurrentPages();
  var currentPage = pages[pages.length-1] //获取当前页面的对象
  try {
    delete data.name;
  } catch(e) {
  }
  commonData.fr = logParamHandle.getFr();
  commonData.appid = logParamHandle.getAppId();
  commonData.lastfrom = logParamHandle.getLastfrom();
  commonData.scene = logParamHandle.getScene();
  var data = Object.assign({  
    name: name,
    url: currentPage.route,
    brand: systemInfo.brand,
    model: systemInfo.model,
    system: systemInfo.system,
    l: systemInfo.networkType,
    platform: systemInfo.platform,
    wx_version: systemInfo.version,
    networkType: systemInfo.networkType,
    unionid: wx.getStorageSync('unionid'),
    wxapp_openid: wx.getStorageSync('wxapp_openid'),
  }, commonData, data)
  wx.request({
    url: logUrl + jsonToQuery(data, true),
    header: {"content-type": "application/x-www-form-urlencoded"},
    method: "GET",
    data: {},
    dataType: "json",
    success: function (res) {
    },
    fail: function (res) {
      // wx.showToast({
      //   icon: 'none',
      //   title: '网络错误，请稍后再试'
      // })
    },
    complete: function () {
    }
  });
}

function setCommonData(data) {
  //新页面加载的时候获取一次用户类型
  // getUserType();
  data && isPlainObject(data) && !isEmptyObject(data) && (commonData = Object.assign(commonData, data));
}

export default {
  send: function(data) {
    data && isPlainObject(data) && !isEmptyObject(data) && sendLog(data);
  },
  setCommonData: setCommonData,
  setLogPath: logParamHandle.setLogPath,
  setLastfrom: logParamHandle.setLastfrom,
  setFr: logParamHandle.setFr,
  urlHandle: logParamHandle.urlHandle,
  getScene: logParamHandle.getScene
};