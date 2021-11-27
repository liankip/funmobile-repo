import axios from 'axios';
import baseURL from '@/api/api';
import auth from '@/lib/auth';

const state = {
	mutations: [],
};

const getters = {
	allMutation: (state) => {
		return state.mutations;
	},
};

const actions = {
	async fetchMutations({ commit }, payload) {
		await axios.get(baseURL + 'dashreport/mutation?nama=' + payload.name + '&page=' + payload.page, {
			headers: {
				token: auth
			}
		})
		.then((response) => {
			commit('SET_MUTATIONS', response.data);
		});
	},
};

const mutations = {
	SET_MUTATIONS(state, mutations) {
		state.mutations = mutations;
	},
};

export default {
	state,
	getters,
	actions,
	mutations,
};
