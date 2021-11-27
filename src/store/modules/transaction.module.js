import axios from 'axios';
import baseURL from '@/api/api';
import auth from '@/lib/auth';

const state = {
	orders: [],
	order: {},
};

const getters = {
	allOrders: (state) => {
		return state.orders;
	},

	getOrder: (state) => {
		return state.order;
	},
};

const actions = {
	async fetchOrders({ commit }, payload) {
		try {
			await axios.get(baseURL + 'dashreport/transaction?kode=' + payload.code + '&page=' + payload.page + '&size=' + payload.size, {
				headers: {
					token: auth
				}
			})
			.then((response) => {
				commit('SET_ORDERS', response.data);
			});
		} catch (e) {
			return typeof e === 'undefined' ? '' : '';
		}
	},

	async fetchOrder({ commit }, code) {
		try {
			await axios.get(baseURL + 'report/detailtransaction/' + code).then((response) => {
				commit('SET_ORDER', response.data);
			});
		} catch (e) {
			return typeof e === 'undefined' ? '' : '';
		}
	},
};

const mutations = {
	SET_ORDERS(state, orders) {
		state.orders = orders;
	},

	SET_ORDER(state, order) {
		state.order = order;
	},
};

export default {
	state,
	getters,
	actions,
	mutations,
};
