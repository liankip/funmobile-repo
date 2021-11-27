import axios from 'axios';
import baseURL from '@/api/api';
import auth from '@/lib/auth';

const state = {
	deposit: []
};

const getters = {
	allDeposit: (state) => {
		return state.deposit
	}
};

const actions = {
	async fetchDeposit({ commit }, payload) {
		await axios.get(baseURL + 'dashreport/deposit?page=' + payload.page, {
			headers: {
				token: auth
			}
		})
			.then((response) => {
				commit('SET_DEPOSIT', response.data);
			});
	},
};

const mutations = {
		SET_DEPOSIT(state, deposit) {
		state.deposit = deposit;
	},
};

export default {
	state,
	getters,
	actions,
	mutations,
};
