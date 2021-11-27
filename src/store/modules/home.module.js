import axios from 'axios';
import baseURL from '@/api/api';
import auth from '@/lib/auth';

const state = {
	counts: [],

	products: [],
	product: {},

	operators: [],
	operator: {},
};

const getters = {
	countAll: (state) => {
		return state.counts;
	},

	allProducts: (state) => {
		return state.products;
	},

	getProduct: (state) => {
		return state.product;
	},

	allOperators: (state) => {
		return state.operators;
	},

	getOperator: (state) => {
		return state.operator;
	},
};

const actions = {
	async fetchCounts({ commit }) {
		await axios.get(baseURL + 'dashreport/counttrxr', {
			headers:{token: auth}
		}).then((response) => {
			commit('SET_COUNTS', response.data);
		});
	},

	async fetchProducts({ commit }, payload) {
		try {
			await axios
			.get(baseURL + 'olahdata/listProduct/?nama=' + payload.nama + '&page=' + payload.page, {
				headers: {
					token: auth
				}
			})
			.then((response) => {
				commit('SET_PRODUCTS', response.data);
			});
		} catch (e) {
			return typeof e === 'undefined' ? '' : '';
		}
	},

	async fetchProduct({ commit }, id) {
		try {
			await axios
			.get(baseURL + 'olahdata/getProduct/' + id)
			.then((response) => {
				commit('SET_PRODUCT', response.data[0]);
			});
		} catch (e) {
			return typeof e === 'undefined' ? '' : '';
		}
	},

	async createupdateProduct({ commit }, payload) {
		try {
			const response = await axios.post(baseURL + 'inbox/changemarkupproduct/', {
				kode_reseller: payload.reseller,
				kode_produk: payload.kode,
				markup: payload.markup
			}, {
				headers: {
					token: auth
				}
			})
			commit('CREATE_UPDATE_PRODUCT', response.data);
		} catch (e) {
			return typeof e === 'undefined' ? '' : '';
		}
	},

	async fetchOperators({ commit }, payload) {
		try {
			await axios.get(baseURL + 'olahdata/listOperator?nama=' + payload.nama + '&page=' + payload.page, {
				headers: {
					token: auth
				}
			}).then((response) => {
				commit('SET_OPERATORS', response.data);
			});
		} catch (e) {
			return typeof e === 'undefined' ? '' : '';
		}
	},

	async fetchOperator({ commit }, id) {
		try {
			await axios.get(baseURL + 'olahdata/getoperatorm/' + id).then((response) => {
				commit('SET_OPERATOR', response.data);
			});
		} catch (e) {
			return typeof e === 'undefined' ? '' : '';
		}
	},

	async createupdateOperator({ commit }, payload) {
		try {
			const response = await axios.post(baseURL + 'inbox/changemarkupoperator/', {
				kode_reseller: payload.reseller,
				kode_operator: payload.kode,
				markup: payload.markup
			}, {
				headers: {
					token: auth
				}
			})
			commit('CREATE_UPDATE_OPERATOR', response.data);
		} catch (e) {
			return typeof e === 'undefined' ? '' : '';
		}
	},
};

const mutations = {
	SET_COUNTS: (state, counts) => (state.counts = counts),

	SET_PRODUCTS: (state, products) => state.products = products,

	SET_PRODUCT: (state, product) => state.product = product,

	SET_OPERATORS: (state, operators) => state.operators = operators,

	SET_OPERATOR: (state, operator) => state.operator = operator,

	CREATE_UPDATE_OPERATOR: (state, updatedOperator) => {
		const index = state.operators.findIndex(operator => operator._id === updatedOperator._id);

		if (index !== -1) {
			state.operators.splice(index, 1, updatedOperator);
		}
	},

	CREATE_UPDATE_PRODUCT: (state, updatedProduct) => {
		const index = state.products.findIndex(product => product.kode_produk === updatedProduct.kode_produk);

		if (index !== -1) {
			state.products.splice(index, 1, updatedProduct);
		}
	},
};

export default {
	state,
	getters,
	actions,
	mutations,
};
