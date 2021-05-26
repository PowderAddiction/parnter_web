<!--
 * @Author: zhuyue
 * @Date: 2020-12-29 14:24:19
 * @LastEditors: zhuyue
 * @LastEditTime: 2021-01-19 15:54:23
 * @Description: app
-->
<script>
import util from '@/utils/util';
import globalData from "@/config/globalData";
import { fetchUserInfo ,configFetch} from "@/service/methods";
import {mapMutations, mapState} from 'vuex'
// import md5 from '@/utils/md5';
export default {
  onLaunch: function(options) {

    // 获取用户信息


    //获取系统类型，全局保存
    // this.getSystemInfo();

    // 获取系统类型，全局保存
  },
  onShow: async function (params) {
    // 获取用户信息
    configFetch({}, ({data})=>{

      this.$store.commit('updateCheckInfo', data.data.shouldUpLevelThreshold)
    })
    fetchUserInfo({},(res)=>{
      this.$store.commit('updateIsLogin', true)
    },()=>{
      // this.$router.push('/pages/login/index')
    })
  },
  methods: {
    getSystem() {
      uni.getSystemInfo({
        success: res => {
          const {
            system,
            model
          } = res;
          let isIphoneX = true;
          if (
            (model.search('iPhone') !== -1 && model.search(/iPhone [0-9]{1}/) !== -1) ||
            system.search('Android') > -1
          ) {
            isIphoneX = false;
          }

          globalData.isIphoneX = isIphoneX;

          if (model.toLocaleLowerCase().search('ipad') !== -1) {
            globalData.isIpad = true;
          }

          if (system.search('iOS') !== -1) {
            globalData.iOS = true;
          }
          globalData.systemInfo = res;

          globalData.topBar.height = res.statusBarHeight + 44;
          // this.setTjDefault(res);
        }
      });
    },
    // getSystemInfo() {
    //   wx.getSystemInfo({
    //     success: (res) => {
    //       this.globalData.isIos = res.system.indexOf('iOS') > -1 ? true : false;
    //       this.globalData.system = res.system;
    //     }
    //   });
    // },
    getMenuButton() {
      globalData.menuRect = uni.getMenuButtonBoundingClientRect() || {
        top: 20,
        left: 0,
        height: 44
      };
    }
  }
}
</script>

