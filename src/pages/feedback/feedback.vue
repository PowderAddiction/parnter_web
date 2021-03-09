<template>
  <view class="feedback-container">
    <textarea class="feedback-edit" maxlength="200" placeholder="请输入意见或建议" v-model="content"></textarea>
    <view class="op-group">
      <button class="submit" @click="submit" open-type="getUserInfo">提交</button>
    </view>
  </view>
</template>

<script>
import {feedback} from "@/service/methods";

export default {
  data() {
    return {
      content: ''
    }
  },
  methods: {
    submit() {
      if (!this.content) {
        uni.showModal({
          title: "提示",
          content: "请填写反馈内容",
          showCancel: false,
        })
      }
      feedback(this.content, () => {
        uni.showModal({
          title: "发送成功",
          content: "我们将第一时间处理您的反馈",
          showCancel: false,
          success: () => {
            uni.switchTab({
              url: "/pages/my/my"
            })
          }
        })
      })
    }
  }
}
</script>

<style lang="scss">
@import "feedback";
</style>