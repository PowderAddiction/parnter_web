<template>
  <view class="login" @click="handleClick">
    <view class="mask">
      <view class="login-pane">
        <view class="pane-title">
          手机号验证
        </view>
        <view class="pane-item">
          <div class="item-input">
            <input type="tel" placeholder="请输入手机号" v-model="phone" maxlength="11">
          </div>

        </view>
        <view class="pane-item">
          <div class="item-input">
            <input type="tel" adjust-position="true" placeholder="请输入验证码" v-model="code" maxlength="6">
          </div>
          <div class="item-button" @click="handleSendCode">
            {{desc}}
          </div>
        </view>
        <view class="pane-item">
          <div class="error-tip">
            {{errorTip}}
          </div>
        </view>
        <view class="pane-btn" @click="handleLogin">
          快捷验证
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { sendCode, sendCodeByCode } from "@/service/methods";
export default {
  props: {
    data: {
    },
  },
  data: ()=>{
    return {
      desc: '获取验证码',
      count: 59,
      phone: '',
      code: '',
      errorTip: ''
    }
  },
  components: {},
  methods: {
    async handleSendCode() {
      if (this.count < 59){
        return
      }
      // 发送验证码
      if(this.validatePhone()){
        this.errorTip = this.validatePhone()
        return
      } else {
        sendCode({
          phone: this.phone
        },()=>{},()=>{})
      }
      let timer = setInterval(()=>{
        --this.count
        if(this.count === 0){
          this.desc = "重新发送"
          this.count = 59
          clearInterval(timer)
          return
        }
        this.desc = this.count
      },1000)
    },
    validatePhone (){
      if(!this.phone) {
        return '手机号不能为空！'
      }
      else if(isNaN(this.phone) || ('' + this.phone).length < 11 ) {
        return '手机号格式不正确！'
      }
      else {
        return ''
      }
    },
    validateForm(){
      if(this.validatePhone()){
        return this.validatePhone()
      }
      else if(!this.code){
        return '短信验证码不能为空!'
      }
      else if(isNaN(this.code) || ('' + this.code).length < 6) {
        return '短信验证码格式不正确!'
      }
      else {
        return ''
      }
    },
    async handleLogin(){
      const errorTip = this.validateForm()
      if(errorTip){
        this.errorTip = errorTip
        return;
      }
      sendCodeByCode({
        phone: this.phone,
        code: this.code
      },(res)=>{
        const token = res?.data?.data?.token
        token && uni.setStorageSync("phoneToken", token);
        this.$emit('success')
      })
    }
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
.login {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 10000;
  .mask {
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: rgba(0,0,0,0.3);
    /* display: flex;
    align-items: center;
    justify-content: center; */
  }
  .login-pane {
    width: 490rpx;
    margin: auto;
    margin-top: 45%;
    background-color: #fff;
    border-radius: 5px;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 30rpx;
    box-sizing: border-box;
    .pane-item {

      width: 410rpx;
      .item-input {
        border: 1px solid #999;
        border-radius: 3px;
        padding: 3px 5px;
        flex: 1;
      }
      display: flex;
      .item-button {
        width: 70px;
        margin-left: 5px;
        border: 1px solid #999;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
      }
      margin-top: 13px;
    }
    .pane-btn {
      width: 410rpx;
      height: 70rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 3px;
      background-color: #3370FF;
      color: #fff;
      font-size: 18px;
      margin-top: 12px;
    }
    .error-tip {
      font-size: 13px;
      color: #e64340;
    }
  }
}
</style>
