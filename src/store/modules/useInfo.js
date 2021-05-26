export default {
    state: {
        info: {
            avatar: "",
            nickname: "",
        },
        needCheck: true,
        isLogin: uni.getStorageSync('phoneToken') || false
    },
    getters: {

    },
    mutations: {
        updateIsLogin(state, data) {
            state.isLogin = data
        },
        updateInfo(state,data){
            state.info = data
        },
        updateCheckInfo(state,data){
            state.needCheck = data
        }
    },
    actions: {
    }
}
