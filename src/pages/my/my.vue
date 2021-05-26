<template>
  <view class="my">
    <view class="user-container">
      <view class="userinfo user-box">
        <view class="avatar">
          <OpenData type="userAvatarUrl"></OpenData>
        </view>
        <view class="nickname">
          <OpenData type="userNickName"></OpenData>
        </view>
      </view>
    </view>
<!--    <view class="select-container">-->

<!--        <view class="tool" @click="handleLink('/pages/my-publish/index')">-->
<!--          <view class="title-container">-->
<!--            <image-->
<!--              src="https://img.zuoyebang.cc/zyb_44c52807ecbfd1e06a0e64ed637eae48.png"-->
<!--              class="icon-sub"-->
<!--            />-->
<!--            <text class="title">我的发布</text>-->
<!--          </view>-->
<!--          <view class="content">-->
<!--            <text class="sub-title">共3个</text>-->
<!--            <view class="icon-arrow">-->
<!--              <image src="/static/images/icon/right.png" class="arrow" />-->
<!--            </view>-->
<!--          </view>-->
<!--        </view>-->

<!--        <view class="card" @click="handleLink('/pages/my-publish/index')">-->
<!--          <view class="card-bottom">-->
<!--            <view class="car-box">-->
<!--              <image src="/static/images/icon/time.png" class="icon-sub" />-->
<!--              <view class="card-title">星期五出发</view>-->
<!--            </view>-->
<!--            <view class="icon-arrow">-->
<!--              <image src="/static/images/icon/right.png" class="arrow" />-->
<!--            </view>-->
<!--          </view>-->
<!--        </view>-->

<!--    </view>-->
    <view class="select-container">
      <!-- <view class="tool" @click="handleLink('/pages/my-publish/index')">
        <view class="title-container">
          <image
              src="https://img.zuoyebang.cc/zyb_44c52807ecbfd1e06a0e64ed637eae48.png"
              class="icon-sub"
          />
          <text class="title">我的发布</text>
        </view>
        <view class="content">
          <view class="icon-arrow">
            <image src="/static/images/icon/right.png" class="arrow" />
          </view>
        </view>
      </view> -->
      <!-- <view class="tool business" @click="handleLink('/pages/my-join/index')">
        <view class="title-container">
          <image
            src="https://img.zuoyebang.cc/zyb_c401482b3fbb8ab96cfc7be3c92feb83.png"
            class="icon-sub"
          />
          <text class="title">我的预约</text>
        </view>
        <view class="content">
          <view class="icon-arrow">
            <image src="/static/images/icon/right.png" class="arrow" />
          </view>
        </view>
      </view> -->

      <view class="tool business" @click="handleLink('/pages/feedback/feedback')">
        <view class="title-container">
          <image
            src="https://img.zuoyebang.cc/zyb_7093729eaa7992b2c7c0fdb686b3fc8b.png"
            class="icon-sub"
          />
          <text class="title">意见反馈</text>
        </view>
        <view class="content">
          <view class="icon-arrow">
            <image src="/static/images/icon/right.png" class="arrow" />
          </view>
        </view>
      </view>
      <view class="er_code">
        <image src="/static/images/other/qrCode.png" class="er_code_img"/>
        <view class="desc">
          滑遍全球，吃遍全球<br/>Go Skiing Go Living Go Exploring
        </view>
    </view>
    </view>
  </view>
</template>

<script>
export default {
  components: {},
  computed: {},
  data() {
    return {};
  },

  methods: {
    handleLink(url) {
      uni.navigateTo({
        url,
      });
    }
  },
  onShow() {},
  onHide() {},
  onShareAppMessage() {},
};
</script>

<style lang="scss">
@import "./my.scss";
.er_code {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  margin: 16px;
  padding: 20px;
  border-radius: 8px;
  .er_code_img {
    width: 500rpx;
    height: 500rpx;
  }
  .desc {
    text-align: center;
    font-size: 13px;
    margin-top: 15px;
    line-height: 22px;
    color: #777;
  }
}
</style>
