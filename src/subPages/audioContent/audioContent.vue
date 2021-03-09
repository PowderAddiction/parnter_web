<template>
  <view class="audio-doc-wrap">
    <image v-for="(item, index) in imgs" :key="index" mode="widthFix"  :src="item"  alt=""></image>
  </view>
</template>

<script>
// import getCurPage from '@/utils/getCurPage'

export default {
  data() {
    return {
      imgs: this.$zybaudio.audiolist[this.$zybaudio.renderIndex].documents
    };
  },
  onShow() {
    uni.setNavigationBarTitle({
        title: uni.getStorageSync('book-name')
    })
  },
  mounted() {
      
  },
  methods: {
    
  }
};
</script>

<style lang="scss">
.audio-doc-wrap {
    image {
      display: block;
      height: 0;
      width: 100%;
      height: auto;
    }
}
</style>