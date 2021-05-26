<template>
  <view class="page-index">
    <view class="index-wrapper">
      <indexs :currentTab="currentTab" v-if="currentTab.name !== '我的'"></indexs>
      <my v-else></my>
    </view>
    <view class="tabs">
      <view class="tab-item" v-for="(item, index) in menusList" :key="index" :class="{
        active: index+ 1 === currentTab.id
      }" @click="handleSwitch(item)">
       
        <view v-if="item.iconUrl" class="img-wrapper">
          <img v-if="index + 1 === currentTab.id" :src="item.selectedIconUrl"> 
          <img v-if="index + 1 !== currentTab.id" :src="item.iconUrl" alt="">
        </view>
        {{item.name}}
      </view>
    </view>
  </view>
</template>

<script>
import { fetchCategory,fetchMenus } from "@/service/methods";
import globalData from "@/config/globalData";
import indexs from './indexs'
import my from '../my/my'
export default {
  components: {indexs,my},
  computed: {
  },
  data() {
    return {
      skiList: [],
      menusList: [],
      currentTab: {
        id: 1
      }
    };
  },
  onShow() {
    // this.initList();
  },
  onLoad(params) {

    this.initList();
  },
  onHide() {},
  onShareAppMessage(res) {},
  methods: {
    initList(){
      fetchMenus({},(res)=>{
        this.menusList = res.data?.data
      },()=>{})
      // fetchCategory({
      //   menuId: 1
      // },(res)=>{
      //   this.skiList = res.data?.data
      // },(res)=>{

      // })
    },
    handleSwitch(item){
      this.currentTab = item
      uni.pageScrollTo({
        scrollTop: 0
      });
    },
    goDetail(id) {
      uni.navigateTo({
        url: `/pages/detail/detail?categoryId=${id}`,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.page-index {
  height: 100vh;
  .index-wrapper {
    padding-bottom: 80px;
  }
  .tabs {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 70px;
    border-top: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    .tab-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex: 1;
      font-size: 13px;
      &.active {
        color: rgb(255,109,67);
      }
      img {
        width: 15px;
        height: 15px;
        display: block;
      }
      .img-wrapper {
        margin-bottom: 5px;
      }
      height: 100%;
      color: #666;
    }
  }
}
.page-ski {
  padding: 20px 13px;
  .ski-pane {
    height: 159px;
    border-radius: 20px;
    font-size: 16px;
    font-weight: 700;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.2);
    margin-bottom: 17px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-size: 100%;
  }
}
</style>
