import axios from 'axios';
import baseURL from '@/api/api';
import auth from '@/lib/auth';

const state = {
	commission: []
};

const getters = {
	allCommission: (state) => {
		return state.commission
	}
};

const actions = {
	async fetchCommission({ commit }, payload) {
		await axios.get(baseURL + 'dashreport/commission?page=' + payload.page, {
			headers: {
				token: auth
			}
		}).then((response) => {
			commit('SET_COMMISSION', response.data);
		});
	},
};

const mutations = {
	SET_COMMISSION(state, commission) {
		state.commission = commission;
	},
};

export default {
	state,
	getters,
	actions,
	mutations,
};
