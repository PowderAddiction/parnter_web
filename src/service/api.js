export const BUSINESS_SERVER = {};

const devDomain = {
    // 登录域名
    loginDomain: 'https://ttsa.aperturenx.cn',

    // 业务请求域名
    requestDomain: 'https://ttsa.aperturenx.cn',

    // 微信服务域名
    wxServiceDomain: 'https://ttsa.aperturenx.cn',
};
const buildDomain = {
    // 登录域名
    loginDomain: 'https://ttsa.aperturenx.cn',

    // 业务请求域名
    requestDomain: 'https://ttsa.aperturenx.cn',

    // 微信服务域名
    wxServiceDomain: 'https://ttsa.aperturenx.cn',
};

export const apiPath = {
    loginWxUser: '/api/user/login',
    feedbackCreate: '/api/feedback/create',
    taskCreate: '/api/task/create',
    taskList: '/api/task/list',
    publishList: '/api/task/publishList',
    signUpList: '/api/task/signUpList',
    taskDetail: '/api/task/detail',
    taskSignUp: '/api/task/signUp',
    taskCancel: '/api/task/cancel',
    taskDelete: '/api/task/delete',
    inviteMatchList: '/api/task/invite/list',
    inviteUser: '/api/task/invite',
    fetchCategory: '/api/v1/bk/fetch/category/id',
    fetchDetail: '/api/v1/bk/fetch/category/detail'

}

export const getUrl = (path) => {
    return buildDomain.requestDomain + path
}

export const domain = process.env.NODE_ENV === 'development' ? devDomain : buildDomain;