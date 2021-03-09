import { domain } from '@/service/api';
import globalData from '@/config/globalData';
import { appid } from '@/config/config';
import { tips } from '@/config/config';

// eslint-disable-next-line import/no-commonjs
const qs = require('qs');

// 请求头中添加用户身份信息

let Fly = require("flyio/dist/npm/wx")
let fly = new Fly


fly.config.timeout = 30000;
//设置请求基地址
fly.config.baseURL = domain.requestDomain;

fly.interceptors.request.use(
  config => {
    const wxUser = encodeURIComponent(uni.getStorageSync('wx_user') || globalData.wxUser);
    const ZYBUSS = uni.getStorageSync('ZYBUSS');
    const wx_uid = uni.getStorageSync('wx_uid');
    config.headers.Cookie = `wxUser=${wxUser};wx_user=${wxUser};wx_uid=${wx_uid};ZYBUSS=${ZYBUSS}; ${tips}`; // 请求头加上token
    return config;
  },
  err => {
    if (err) {
      return uni.reLaunch({
        url: `/subPages/404/404?redirect=${encodeURIComponent(this.globalData.launchPath)}`
      });
    }
  }
);

fly.interceptors.response.use(
  response => {
    uni.hideLoading();
    const { errNo, errStr = '', errstr = '', data } = response.data;

    switch (errNo) {
      case 0:
        return data;
      // 用户没有课程
      case 10013:
        uni.reLaunch({
          url: '/pages/index/index'
        });
        break;

      default:
        uni.showToast({
          icon: 'none',
          title: `${errStr || errstr}:${errNo}`
        });
    }
  },
  err => {
    console.log('request errror ', err);
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '请求错误(400)';
          break;
        case 403:
          err.message = '拒绝访问(403)';
          break;
        case 404:
          err.message = '请求出错(404)';
          break;
        case 408:
          err.message = '请求超时(408)';
          break;
        case 500:
          err.message = '服务器错误(500)';
          break;
        case 501:
          err.message = '服务未实现(501)';
          break;
        case 502:
          err.message = '网络错误(502)';
          break;
        case 503:
          err.message = '服务不可用(503)';
          break;
        case 504:
          err.message = '网络超时(504)';
          break;
        case 505:
          err.message = 'HTTP版本不受支持(505)';
          break;
        default:
          err.message = `连接出错(${err.response.status})!`;
      }
    } else {
      err.message = '连接服务器失败!';
    }
    uni.reLaunch({
      url: `/subPages/404/404?err=${err || '连接服务器失败!'}&redirect=${encodeURIComponent(globalData.launchPath)}`
    });
    return false;
  }
);


function $http(method, url, param, noLoading) {
  if (!noLoading) {
    uni.showLoading({ title: '加载中...' });
  }
  // 如果已经带了协议,则不需要拼接host
  if (!/http|https/.test(url)) {
    url = `${domain.requestDomain}${url}`;
  }
  return fly[method](url, param)
    .then(res => {
      if (!noLoading) {
        uni.hideLoading();
      }
      return res;
    })
    .catch(err => {
      if (!noLoading) {
        uni.hideLoading();
      }
      return err;
    });
}

export function get(args) {
  return $http('get', args.url, Object.assign({}, args.data, { appid: appid }), args.noLoading);
}
export function post(args) {

  return $http('post', args.url, qs.stringify(Object.assign({}, args.data, { appid: appid })), args.noLoading);
}
