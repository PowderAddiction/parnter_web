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
    <view class="detail-rules" >
      {{skiDetail.description}}
    </view>
    <view class="detail-mask" :class="{
      isFilter: !isLogin && needCheck
    }">
      <view class="btn" @click="handleFetchCode" v-if="!isLogin && needCheck">
        获取二维码
      </view>
     <image
          :src="skiDetail.wechatGroupUrl"
          class="icon-code"
          :show-menu-by-longpress="isLogin || !needCheck"
          />
    </view>
    <view class="detail-rules" >
      <view class="item" v-for="it in skiDetail.rules" :key="it">
        {{it}}
      </view>
    </view>

    <login v-if="visible" @close="handleClose" @success="handleSuccess"/>
  </view>
</template>

<script>
import { fetchDetail } from "@/service/methods";
import globalData from "@/config/globalData";
import {mapState} from 'vuex'
import Login from '../../components/login'
export default {
  components: {
    Login
  },
  computed: {
    ...mapState({
       isLogin: state => {
         return state.useInfo.isLogin
       },
       needCheck: state => {
         return state.useInfo.needCheck
       },
    })
  },
  data() {
    return {
      skiDetail: {
       
      },
      visible: false
    };
  },
  onShow() {
  },
  onLoad(params) {
    this.initDetail(params);
  },
  onHide() {},
  onShareAppMessage(res) {},
  methods: {
    handleFetchCode(){
      this.visible = true
    },
    initDetail({categoryId}){
      fetchDetail({
        categoryId
      },(res)=>{
        const detail = {

          ...res.data?.data
        }
        const rules = detail.rules.split('</br>')
        this.skiDetail = {
          ...detail,
          rules
        }
      },(res)=>{
      })
    },
    handleClose(){
      this.visible = false
    },
    handleSuccess(){
      this.visible = false
      this.$store.commit('updateIsLogin', true)
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
  .detail-mask {
    width: 600rpx;
    height: 600rpx;

    position: relative;
    .btn {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      font-size: 28rpx;
      z-index: 100;
      /* color: #fff; */
      padding: 10rpx 20rpx;
      border: 1px solid #222;
      border-radius: 5px;
      font-weight: 700;
    }
    &.isFilter {
      .icon-code {
        filter: blur(5px);
      }
    }
    .icon-code {
      width: 100%;
      height:100%;
      
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
