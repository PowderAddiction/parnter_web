<template>
  <view class="err">
    <image class="img" :src="errImg" />
    <view class="des">网络不给力</view>
    <view class="refresh" @click="refresh">刷新重试</view>
  </view>
</template>

<script>
import errImg from "@/static/images/404/404.png";
import getCurPage from '@/utils/getCurPage'
export default {
  data() {
    return {
      errImg,
      redirectUrl: '',
      utmSource: uni.getStorageSync('utmSource')
    };
  },
  onLoad(params) {
    console.log(params, '404  params:::>>>>');
    const { redirect } = params;
    this.redirectUrl = decodeURIComponent(redirect);
  },
  methods: {
    refresh() {
      if (!this.redirectUrl) {
        uni.switchTab({
          url: '/pages/index/index'
        });
      } else {
        const list = ["pages/index/index", "pages/learntool/learntool", "pages/my/my"];
        if (list.includes(this.redirectUrl)) {
          uni.switchTab({
            url: '/' + this.redirectUrl
          });
        } else {
          uni.navigateTo({
            url: '/' + this.redirectUrl
          });
        }
      }
      
      
    }
  }
};
</script>

<style lang="scss">
@import "./404.scss";
</style>