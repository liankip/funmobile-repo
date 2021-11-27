import axios from 'axios';
import baseURL from '@/api/api';
import auth from '@/lib/auth';

const state = {
	outbox: [],
		inbox: []
};

const getters = {
	allOutbox: (state) => {
		return state.outbox
	},

	allInbox: (state) => {
		return state.inbox
	}
};

const actions = {
	async fetchOutbox({ commit }, payload) {
		await axios.get(baseURL + 'dashreport/listoutbox?page=' + payload.page, {
			headers: {
				token: auth
			}
		}).then((response) => {
			commit('SET_OUTBOX', response.data);
		});
	},

	async fetchInbox({ commit }, payload) {
		await axios.get(baseURL + 'dashreport/listinbox?page=' + payload.page, {
			headers: {
				token: auth
			}
		}).then((response) => {
			commit('SET_INBOX', response.data);
		});
	},
};

const mutations = {
	SET_OUTBOX(state, outbox) {
		state.outbox = outbox;
	},

	SET_INBOX(state, inbox) {
		state.inbox = inbox;
	},
};

export default {
	state,
	getters,
	actions,
	mutations,
};
