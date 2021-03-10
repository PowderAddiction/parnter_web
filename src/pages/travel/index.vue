<template>
  <view class="page-ski">
    <view class="ski-pane"  v-for="(item, index) in skiList" :key="index" :style = "{backgroundImage: 'url(' + item.thumbUrl + ')'}"
      @click="goDetail(item.id)"
      >
      <view class="pane-desc">
        {{item.name}}>>>
      </view>
    </view>
  </view>
</template>

<script>
import { fetchCategory } from "@/service/methods";
import globalData from "@/config/globalData";

export default {
  components: {},
  computed: {
  },
  data() {
    return {
      skiList: []
    };
  },
  onShow() {
    // this.initList();
  },
  onLoad() {
    this.initList();
  },
  onHide() {},
  onShareAppMessage(res) {},
  methods: {
    initList(){
      fetchCategory({
        menuId: 2
      },(res)=>{
        this.skiList = res.data?.data
      },(res)=>{
      })
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
.page-ski {
  padding: 20px 13px;
  .ski-pane {
    height: 159px;
    border-radius: 20px;
    font-size: 14px;
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
