import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import sessionStorage from '../storage'

Vue.use(Vuex);

const state = {
	user:sessionStorage.get("user") || {}
}
export default new Vuex.Store({
	state,
	mutations,
	actions
});
