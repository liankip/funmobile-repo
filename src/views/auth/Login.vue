<template>
	<main-section>
		<card-component class="w-11/12 md:w-5/12 shadow-2xl rounded-lg" form>
			<field label="Nomor Telephone" help="">
				<control
					v-model="phone"
					:icon="mdiAccount"
					name="Nomor Telephone"
					autocomplete="username"
					placeholder="Masukkan nomor telephon"
				/>
			</field>

			<field label="Password" help="">
				<control
					v-model="password"
					:icon="mdiAsterisk"
					type="password"
					name="password / pin"
					autocomplete="current-password"
					placeholder="Masukkan password / pin"
				/>
			</field>

			<div class="relative">
				<button
					type="button"
					class="
						w-full
						bg-blue-500
						hover:bg-blue-700
						text-white
						font-bold
						py-2
						px-4
						border border-blue-700
						rounded
						right-0
					"
					@click="handleLogin"
				>
					Masuk
				</button>
			</div>
		</card-component>
	</main-section>
</template>

<script>
import { mdiAccount, mdiAsterisk } from '@mdi/js';
import MainSection from '@/components/MainSection';
import CardComponent from '@/components/CardComponent';

import Field from '@/components/Field';
import Control from '@/components/Control';

import baseURL from '@/api/api';
import axios from 'axios';

export default {
	name: 'Login',
	components: {
		MainSection,
		CardComponent,
		Field,
		Control,
	},

	setup() {
		return {
			mdiAccount,
			mdiAsterisk,
		};
	},

	data() {
		return {
			phone: '',
			password: '',
		};
	},

	methods: {
		handleLogin() {
			if (this.phone === '' || this.password === '') {
				this.$swal('Login gagal', 'No telephone dan password kosong', 'error');
			} else {
				this.$store
					.dispatch('auth/login', {
						phone: this.phone,
						password: this.password,
					})
					.then((res) => {
						if (res.error != 99)
							this.$swal.fire({
								title: 'Masukkan kode OTP',
								input: 'text',
								inputAttributes: {
									autocapitalize: 'off',
								},
								showCancelButton: true,
								confirmButtonText: 'konfirmasi',
								showLoaderOnConfirm: true,
								preConfirm: (login) => {
									return axios
										.post(`${baseURL}auth/otp/${res.token}/${login}`)
										.then((response) => {
											if (response.data.error == 1) {
												this.$swal(
													'Login gagal',
													'Kode OTP yang dimasukkan salah',
													'error'
												);
											} else {
												this.$swal('Login berhasil', '', 'success').then(
													(okay) => {
														if (okay) {
															window.location.href = `https://report.funmobile.id/`;
														}
													}
												);
											}
										});
								},
								allowOutsideClick: () => !this.$swal.isLoading(),
							});
						else
							this.$swal(
								'Login gagal',
								'Akun salah mohon diperiksa kembali',
								'error'
							);
					});
			}
		},
	},
};
</script>
