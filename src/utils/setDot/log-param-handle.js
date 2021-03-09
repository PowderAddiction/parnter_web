/**
 * Copyright (c) 2014-2017 Zuoyebang, All rights reseved.
 * @fileoverview 直播售卖侧前端打点工具
 * @author sunmingzhang | sunmingzhang@zuoyebang.com
 * @version 1.0 | 2018-06-05 | sunmingzhang    // 初始版本。
 * @version 1.1 | 2018-07-05 | dengxin    // 修改兼容小程序打点
 *
 * @method setLogPath(data)         // 方法：设置页面logpath。
 * @param data {Object}       // 参数：id必要为页面id。
 * @return No                 // 返回：无。
 *
 * @method getLogPath    // 方法：获取页面logpath。
 * @param No           // 参数：无。
 * @return String                    // 返回：logpath。
 */

var logPathItem = 'logPath';

var $ = {
  isEmptyObject : function(e) {
    var t;
    for (t in e)
      return !1;
    return !0
  },
  //判断是否是纯粹的对象
 isPlainObject: function(obj) {
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
}
 
// 拼接path规则
function getPath(prePath, pageId, pathParams) {
  if (!pageId) {
    return '.'
  } else {
    var curPath = pageId;
    if ($.isPlainObject(pathParams) && !$.isEmptyObject(pathParams)) {
      for(var p in pathParams) {
        curPath = curPath + '(' + p + '!' + pathParams[p] + ')';
      }
    }
    return prePath ? (prePath + '__' + curPath) : curPath;
  }
}

function setLogPath(data) {
  var urlLogPath = (function () {
    var pages = getCurrentPages();
    var currentPage = pages[pages.length-1] //获取当前页面的对象

    if (currentPage && currentPage.options.logpath) {
      return currentPage.options.logpath;
    } else {
      return wx.getStorageSync(logPathItem) || ''
    }
  })()

  if (data
    && $.isPlainObject(data)
    && !$.isEmptyObject(data)
  ) {
    var pageId = data.id || '';
    try {
      delete data.id;
    } catch(e) {
      // console.log(e);
    }
    var logPath = getPath(urlLogPath, pageId, data);
    wx.setStorageSync(logPathItem, logPath);
  }
}

function getLogPath() {
  return wx.getStorageSync(logPathItem) || '';
}

// lastfrom 处理
var lastfromItem = 'lastfrom';
var frItem = 'fr';
var appidItem = 'appid';
var scene = 'scene'
var urlLastFrom =(function () {
  var pages = getCurrentPages();
  var currentPage = pages[pages.length-1] //获取当前页面的对象
  if (currentPage && currentPage.options.lastfromItem) {
    return currentPage.options.lastfromItem;
  } else {
    return wx.getStorageSync(lastfromItem) || ''
  }
})()

function getLastfrom() {
  var pages = getCurrentPages()
  var currentPage = pages[pages.length-1] //获取当前页面的对象
  if (currentPage.options.lastfrom) {
    wx.setStorageSync(lastfromItem, currentPage.options.lastfrom);
    return currentPage.options.lastfrom;
  } else {
    return wx.getStorageSync(lastfromItem) || '';
  }
}

function getScene() {
  var App = getApp()//获取当前页面的对象
  if ( App.globalData.scene ) {
    wx.setStorageSync(scene, App.globalData.scene);
    return App.globalData.scene;
  } else {
    return wx.getStorageSync(scene) || '';
  }
}

function getFr() {
  var pages = getCurrentPages()
  var currentPage = pages[pages.length-1] //获取当前页面的对象
  if (currentPage.options.fr) {
    wx.setStorageSync(frItem, currentPage.options.fr);
    return currentPage.options.fr;
  } else {
    return wx.getStorageSync(frItem) || '';
  }
}
function getAppId() {
  return wx.getStorageSync(appidItem)
}
function setFr(fr) {
  wx.setStorageSync(frItem, fr);
}
function setLastfrom(lastfrom) {
  wx.setStorageSync(lastfromItem, lastfrom);
}
// setLastfrom(urlLastFrom);

// url 处理
function urlHandle(url) {
  var lastFrom = getLastfrom();
  var logPath = getLogPath();
  var contactMark = /\?/.test(url) ? '&' : '?'; // 确定url参数连接符,若有?则用&
    url = url + contactMark + 'lastfrom=' + lastFrom;
    url = url + contactMark + 'logpath=' + logPath;
  return url;
}

export default {
  getLogPath: getLogPath,
  setLogPath: setLogPath,
  getLastfrom: getLastfrom,
  setLastfrom: setLastfrom,
  getFr: getFr,
  setFr: setFr,
  getAppId: getAppId,
  getScene: getScene,
  urlHandle: urlHandle
}