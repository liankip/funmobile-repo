import axios from 'axios';
import baseURL from '@/api/api';

class AuthService {
	login(user) {
		return axios
		.post(baseURL + 'auth/signinr', {
			notelp: user.phone,
			pin: user.password,
		})
		.then((response) => {
			if (response.data.token) {
				 localStorage.setItem('user', JSON.stringify(response.data));
			}

			axios.post(baseURL + 'auth/getotp', {
			}, {
				headers: {
					token: response.data.token
				}
			})

			return response.data
		});
	}

	logout() {
		localStorage.clear();
	}

	register(user) {
		return axios.post(baseURL + 'reseller/signup', {
			name: user.name,
			phone: user.phone,
			password: user.password,
		});
	}
}

export default new AuthService();
