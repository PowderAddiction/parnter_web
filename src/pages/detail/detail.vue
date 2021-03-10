<template>
  <view class="page-detail">
    <view class="detail-img">
      <image
          :src="skiDetail.thumbUrl"
          class="icon-img"
          />
    </view>
    <view class="detail-title">
      {{skiDetail.title}}
    </view>
     <image
          :src="skiDetail.wechatGroupUrl"
          class="icon-img"
          show-menu-by-longpress="true"
          />
    <view class="detail-rules" >
      <view class="item" v-for="it in skiDetail.rules" :key="it">
        {{it}}
      </view>
    </view>
  </view>
</template>

<script>
import { fetchDetail } from "@/service/methods";
import globalData from "@/config/globalData";

export default {
  components: {},
  computed: {
  },
  data() {
    return {
      skiDetail: {}
    };
  },
  onShow() {
    // this.initList();
  },
  onLoad(params) {
    this.initDetail(params);
  },
  onHide() {},
  onShareAppMessage(res) {},
  methods: {
    initDetail({categoryId}){
      fetchDetail({
        categoryId
      },(res)=>{
        const detail = res.data?.data
        const rules = detail.rules.split('</br>')
        this.skiDetail = {
          ...detail,
          rules
        }
      },(res)=>{
      })
    },
    goDetail(id) {
      uni.navigateTo({
        url: `/pages/detail/detail?id=${id}`,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.page-detail {
  padding: 20rpx 0;
  .detail-img {
    .icon-img {
      width: 100%;
    }
  }
  .detail-title {
    padding: 10px 10px;
    font-weight: bold;
    color: #222;
  }
  .detail-rules {
    padding: 10px 10px;
    color: rgba(128, 128, 128, 1);
	  font-size: 12px;
  }
}
</style>
