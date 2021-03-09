// const baseUrl = 'https://fwx-docker.suanshubang.com';

import { domain as baseUrl } from '@/service/api';


const login = appid =>
	new Promise((resolve, reject) => {
		wx.login({
			success(res) {
				wx.request({
					method: 'GET',
					url: baseUrl.loginDomain + '/wxserver/wxapp/loginbycode',
					data: {
						appid: appid,
						code: res.code
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					success(reson) {
						if (reson.data.errNo === 0) {
							resolve(reson.data.data);
						} else {
							wx.showToast({
								icon: 'none',
								title: reson.data.errstr || reson.data.errStr,
								mask: true,
								duration: 3000
							});
							reject(res.data);
						}
					}
				});
			},
			fail(e) {
				reject(e);
			}
		});
	});

const request = options =>
	new Promise((resolve, reject) => {
		const { method = 'GET', param = {} } = options;
		wx.showLoading({
			title: '加载中',
			mask: true
    });
    const wxUser = encodeURIComponent(uni.getStorageSync('wx_user')); 
		wx.request({
			url: baseUrl.requestDomain + options.url,
			data: options.param,
			header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Cookie': `wxUser=${wxUser};wx_user=${wxUser};`
			},
			method: options.method,
			success(res) {
				try {
					if (res.data && (res.data.errNo === 0 || res.data.errNo === 4005)) {
						resolve(res.data);
					} else if (res.data.errNo === 40003 || res.data.errNo === 30001) {
						wx.showToast({
							icon: 'none',
							title: '网络开小差了，请重新尝试～',
							mask: true,
							duration: 3000
						});
						resolve(res.data);
					} else if (res.data.errNo === 40001) {
						resolve(res.data);
					} else {
						wx.showToast({
							icon: 'none',
							title: res.data.errstr || res.data.errStr,
							mask: true,
							duration: 3000
						});
						reject(res.data);
					}
				} catch (error) {
					// throw new Error(baseUrl.requestDomain + options.url + '  :接口报错！！！' + error + '；返回结果：' + JSON.stringify(res));
				}
				
			},
			fail(e) {
				wx.showToast({
					icon: 'none',
					title: '请求失败，请稍后再试~'
				});
				reject(e);
			},
			complete(e) {
        wx.hideLoading();
			}
		});
	});

//获取query参数拼接
const jsonToQuery = json => {
	let jsonQuery = '';
	Object.keys(json).forEach((key, index) => {
		jsonQuery += index > 0 ? '&' + key + '=' + json[key] : '?' + key + '=' + json[key];
	});
	return jsonQuery;
};

//判断是否为空对象
const isEmptyObject = function (e) {
	var t;
	for (t in e) return !1;
	return !0;
};

const debounce = (fn, timeout) => {
	let timer = null;
	return function (...args) {
		if (timer) return;
		timer = setTimeout(() => {
			fn.apply(this, args);
			timer = null;
		}, timeout)
	}
}

/* 函数防抖 */
export function debounceFn(fn, timeout, immediate) {
	let timer;
	let timer2;
	let flag = immediate;
	timeout = timeout >= 0 ? timeout : 1000;
	return function (...args) {
	  if (timer) clearTimeout(timer);
	  if (timer2) clearTimeout(timer2);
	  if (flag) {
		fn.apply(this, args);
		flag = false;
		return;
	  }
	  timer = setTimeout(() => {
		fn.apply(this, args);
		timer2 = setTimeout(() => {
		  immediate && (flag = true);
		}, timeout);
	  }, timeout);
	};
  }

export default {
	baseUrl: baseUrl,
	request: request,
	login: login,
	jsonToQuery: jsonToQuery,
	isEmptyObject: isEmptyObject,
	debounce
};
