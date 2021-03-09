// 当前小程序正式 appid
const APPID = 'wx90701aa9c5b9dcc6';
// const devAppid = 'wx45023cc9091c8eb5';
const devAppid = 'wx90701aa9c5b9dcc6';
// const devAppid = 'wx4577062d203e15e2';

export const appid = process.env.NODE_ENV === 'development' ? devAppid : APPID;

export const defaultAvatar = 'https://www.zybang.com/yuxi-miniprogram/image/avatar.png';

export const tips = process.env.NODE_ENV === 'development' ? '__tips__=1' : '';

export const templateIds = {
    publish: '-u9ufgExIFQhZ4x1HDzmLcJkCSSl7aCb0_aoTMARyIE'
}