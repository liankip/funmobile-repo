import { createStore } from 'vuex';
import { auth } from './modules/auth.module';
import home from './modules/home.module';
import deposit from './modules/deposit.module';
import mutation from './modules/mutation.module';
import transaction from './modules/transaction.module';

import message from './modules/message.module';

import commission from './modules/commission.module'

const store = createStore({
	state: {
    isFormScreen: false,
    isAsideMobileExpanded: false,
    isAsideLgActive: false,
  },
  mutations: {
    basic (state, payload) {
      state[payload.key] = payload.value
    },

    user (state, payload) {
      if (payload.name) {
        state.userName = payload.name
      }
      if (payload.email) {
        state.userEmail = payload.email
      }
      if (payload.avatar) {
        state.userAvatar = payload.avatar
      }
    }
  },
  actions: {
    asideMobileToggle ({ commit, state }, payload = null) {
      const isShow = payload !== null ? payload : !state.isAsideMobileExpanded

      document.getElementById('app').classList[isShow ? 'add' : 'remove']('ml-60')

      document.documentElement.classList[isShow ? 'add' : 'remove']('m-clipped')

      commit('basic', {
        key: 'isAsideMobileExpanded',
        value: isShow
      })
    },
    asideLgToggle ({ commit, state }, payload = null) {
      commit('basic', { key: 'isAsideLgActive', value: payload !== null ? payload : !state.isAsideLgActive })
    },
    formScreenToggle ({ commit, state }, value) {
      commit('basic', { key: 'isFormScreen', value })

      document.documentElement.classList[value ? 'add' : 'remove']('form-screen')
    }
  },
	modules: {
		auth,
		home,
		deposit,
		mutation,
		transaction,
		message,
		commission,
	},
});

export default store;
