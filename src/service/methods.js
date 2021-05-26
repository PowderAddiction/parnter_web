/**
 * @file methods.js
 * @description 小程序公用方法
 * @author zhangxiaosong
 */

// import { BUSINESS_SERVER, WECHAT_SERVER } from '@/service/api';
// import { get,post } from '@/utils/request';
// import globalData from '@/config/globalData';
// import { zs } from '@zyb-data/stats-mp'

import {apiPath, getUrl} from "@/service/api";

/**
 * 检查登录状态
 */
export const login = () => {
    // uni.login 不是异步的返回promise 需要自己封装一下
    console.log("login")
    return new Promise((resolve, reject) => {
        const getUInfo = (resLogin) => {
            uni.getUserInfo({
                success: (res) => {
                    loginWxUser({
                        source: 'car',
                        js_code: resLogin.code,
                        encryptedData: res.encryptedData,
                        iv: res.iv
                    }, (data) => {
                        resolve(data)
                    }, (data) => {
                        reject(data)
                    })
                }
            })
        }
        uni.login({
            timeout: 5000,
            success: resLogin => {
                uni.getSetting({
                    success(res) {
                        if (res.authSetting['scope.userInfo']) {
                            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                            getUInfo(resLogin)
                        } else {
                            uni.authorize({
                                scope: "scope.userInfo",
                                success: () => {
                                    getUInfo(resLogin)
                                },
                                fail: (err) => {
                                    console.log(err)
                                    reject({
                                        err: 3,
                                        msg: '获取授权失败'
                                    });
                                }
                            })
                        }
                    },
                    fail() {
                        reject({
                            err: 2,
                            msg: '获取授权信息配置失败'
                        })
                    }
                })
            },
            fail: () => {
                reject({
                    err: 1,
                    msg: '未登录'
                });
            }
        });
    })
};
let token;
const request = (params) => {
    const handleSuccess = (data) => {
        if(data.data.code == 1 || data.data?.code === 200 ){
            params.success && params.success(data)
        } else {
            params.fail && params.fail(data)
        }
    }
    return uni.request({
        ...params,
        success: handleSuccess
    })
}
const requestWithAuth = async (params) => {
    if (!token) {
        const _token = uni.getStorageSync("userToken");
        if (_token) {
            token = _token;
        }
    }
    if (!token) {
        let res;
        try {
            res = await login()
        } catch (err) {
            console.log("catch", err)
            params.fail && params.fail(err)
            return
        }
        token = res.data.data.token
        uni.setStorageSync("userToken", token)
    }

    return request({
        ...params,
        data: {
            ...params.data,
        },
        url: params.url + (params.url.match(/\?/) ? `&token=${token}` : `?token=${token}`)
    })
}


const requestWithPhone = async (params) => {
    if (!token) {
        const _token = uni.getStorageSync("phoneToken");
        if (_token) {
            token = _token;
        }
    }
    return request({
        ...params,
        data: {
            ...params.data,
        },
        url: params.url + (params.url.match(/\?/) ? `&token=${token}` : `?token=${token}`)
    })
}
/**
 * 获取用户 ID
 */
export const loginWxUser = (miniUserInfo, success, fail) => {
    console.log("log wx user")
    return request({
        method: 'POST',
        url: getUrl(apiPath.loginWxUser),
        data: miniUserInfo,
        success,
        fail
    })
};

/*
* 1. 意见反馈
url: /api/feedback/create
meathod: post
参数:
token   string 用户token
content string 反馈内容

返回结果:
{
  "code": 1,
  "data": {
    "id": 36155
  },
  "msg": "success",
  "traceId": "2fa72f0f361e4dbb92de843d083e660f"
}
* */
export const feedback = (data, success, fail) => {
    return requestWithAuth({
        method: 'POST',
        url: getUrl(apiPath.feedbackCreate),
        data,
        success,
        fail
    })
}


// token         string    用户token
// title         string    标题
// type          int       类型: 1 我捎你 2 捎我一程
// contact       string    发布人联系方式 (我捎你专用)
// startTime     int       出发时间(毫秒时间戳)
// startCity     string    出发地城市
// startAddress  string    出发地详细地址
// endCity       string    目的地城市
// endAddress    string    目的地详细地址
// seatNum       int       座位数
// fare          int       车费(单位:分)
// luggage       string    行李数量
// remark        string    备注
export const createTask = (data, success, fail) => {
    return requestWithAuth({
        method: 'POST',
        url: getUrl(apiPath.taskCreate),
        data,
        success,
        fail
    })
}

export const getTaskList = (data, success, fail) => {
    return request({
        method: 'GET',
        url: getUrl(apiPath.taskList),
        data,
        success,
        fail
    })
}

export const getMyTaskList = (data, success, fail) => {
    return requestWithAuth({
        method: 'GET',
        url: getUrl(apiPath.publishList),
        data,
        success,
        fail
    })
}

export const getMySignUpList = (data, success, fail) => {
    return requestWithAuth({
        method: 'GET',
        url: getUrl(apiPath.signUpList),
        data,
        success,
        fail
    })
}

export const getTaskDetail = (data, success, fail) => {
    return requestWithAuth({
        method: 'GET',
        url: getUrl(apiPath.taskDetail),
        data,
        success,
        fail
    })
}
export const taskSignUp = (data, success, fail) => {
    return requestWithAuth({
        method: 'POST',
        url: getUrl(apiPath.taskSignUp),
        data,
        success,
        fail
    })
}

export const taskCancel = (data, success, fail) => {
    return requestWithAuth({
        method: 'POST',
        url: getUrl(apiPath.taskCancel),
        data,
        success,
        fail
    })
}

export const taskDelete = (data, success, fail) => {
    return requestWithAuth({
        method: 'POST',
        url: getUrl(apiPath.taskDelete),
        data,
        success,
        fail
    })
}

export const getInviteMatchList = (data, success, fail) => {
    return requestWithAuth({
        method: 'GET',
        url: getUrl(apiPath.inviteMatchList),
        data,
        success,
        fail
    })
}

export const inviteUser = (data, success, fail) => {
    return requestWithAuth({
        method: 'POST',
        url: getUrl(apiPath.inviteUser),
        data,
        success,
        fail
    })
}
export const fetchCategory = (data, success, fail) => {
    return request({
        method: 'GET',
        url: getUrl(apiPath.fetchCategory),
        data,
        success,
        fail
    })
}
export const fetchDetail = (data, success, fail) => {
    return request({
        method: 'GET',
        url: getUrl(apiPath.fetchDetail),
        data,
        success,
        fail
    })
}
export const fetchMenus = (data, success, fail) => {
    return request({
        method: 'GET',
        url: getUrl(apiPath.fetchMenus),
        data,
        success,
        fail
    })
}

export const configFetch = (data, success, fail) => {
    return request({
        method: 'GET',
        url: getUrl(apiPath.configFetch),
        data,
        success,
        fail
    })
}
export const fetchUserInfo = (data, success, fail) => {
    return requestWithPhone({
        method: 'GET',
        url: getUrl(apiPath.getUserInfo),
        data,
        success,
        fail
    })
}
export const sendCode = (data, success, fail) => {
    return requestWithPhone({
        method: 'POST',
        url: getUrl(apiPath.sendCode),
        data,
        success,
        fail
    })
}
export const sendCodeByCode = (data, success, fail) => {
    return requestWithPhone({
        method: 'POST',
        url: getUrl(apiPath.loginBySendCode),
        data,
        success,
        fail
    })
}
