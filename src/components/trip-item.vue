<template>
  <view class="trip-item" @click="handleClick">
    <view class="center">
      <view class="title">{{ data.title }}</view>
      <view>
        <text class="sub-title">{{ data.startCity }}->{{ data.endCity }}</text>
        <!--      <text class="sub-desc">自己开车</text> -->
      </view>
      <view class="date-time">出发：{{ data.startTime }}</view>
      <!--      <view class="date-time">费用：{{data.fare}}</view>-->
      <text>
        <!--        2空位-->
      </text>
    </view>
    <view class="right">
      <image :src="iconPath" />
    </view>
  </view>
</template>

<script>
export default {
  props: {
    data: {},
    iconType: {
      type: String,
      default: "link", // link, join
    },
  },
  methods: {
    handleClick() {
      this.$emit("click");
    },
  },
  computed: {
    iconPath() {
      if (this.iconType === "join") {
        return "/static/images/icon/join.png";
      } else {
        return "/static/images/icon/right.png";
      }
    },
  },
};
</script>

<style scoped lang="scss">
.trip-item {
  background: #fff;
  border-bottom: 1rpx solid #f1f1f1;
  display: flex;
  padding: 20rpx 32rpx 0;
  box-sizing: border-box;
  align-items: center;

  .center {
    width: 96%;
    .title {
      font-size: 32rpx;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(87, 71, 58, 1);
      line-height: 38rpx;
      margin-bottom: 24rpx;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      border-bottom: none;
    }
    .date-time,
    .sub-title {
      font-size: 24rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(179, 165, 155, 1);
      line-height: 24rpx;
      margin-bottom: 20rpx;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .sub-desc {
      font-size: 24rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      margin-right: 12rpx;
      line-height: 24rpx;
      margin-bottom: 20rpx;
    }
  }
  .right {
    flex-basis: 40rpx;
    flex-shrink: 0;
    justify-content: center;
    align-content: center;
    image {
      width: 40rpx;
      height: 40rpx;
    }
  }
}
</style>
