<template>
  <view>
    <web-view :src="url" @message="handleMessage"></web-view>
  </view>
</template>

<script>
import getCurPage from '@/utils/getCurPage'
export default {
  data() {
    return {
      url: ""
    };
  },
  mounted() {
      this.url = getCurPage().options.url;
  },
  methods: {
    handleMessage() {}
  }
};
</script>

<style>
</style>