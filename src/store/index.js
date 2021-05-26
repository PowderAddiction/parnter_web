import Vue from 'vue'
import Vuex from 'vuex'

import useInfo from '@/store/modules/useInfo'


Vue.use(Vuex)
export default new Vuex.Store({
    modules:{
        useInfo
    }
})
