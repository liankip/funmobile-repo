<template>
	<title-bar :title-stack="titleStack" />
	<hero-bar>Transaksi {{ code }}</hero-bar>
	<main-section>
		<div>
			<div
				v-if="showModal"
				class="
					overflow-x-hidden overflow-y-auto
					fixed
					inset-0
					z-50
					outline-none
					focus:outline-none
					justify-center
					items-center
					flex
				"
			>
				<div class="relative w-auto my-6 mx-auto max-w-6xl">
					<!--content-->
					<div
						class="
							border-0
							rounded-lg
							shadow-lg
							relative
							flex flex-col
							w-full
							bg-white
							outline-none
							focus:outline-none
						"
					>
						<!--header-->
						<div
							class="
								flex
								items-start
								justify-between
								p-5
								border-b border-solid border-blueGray-200
								rounded-t
							"
						>
							<h3 class="text-3xl font-semibold">Edit Admin</h3>
							<button
								class="
									p-1
									ml-auto
									bg-transparent
									border-0
									text-black
									opacity-5
									float-right
									text-3xl
									leading-none
									font-semibold
									outline-none
									focus:outline-none
								"
								v-on:click="toggleModal()"
							>
								<span
									class="
										bg-transparent
										text-black
										opacity-5
										h-6
										w-6
										text-2xl
										block
										outline-none
										focus:outline-none
									"
								>
									×
								</span>
							</button>
						</div>
						<!--body-->
						<div class="relative p-6 flex-auto">
							<input
								class="
									appearance-none
									block
									w-full
									bg-gray-200
									text-gray-700
									border border-gray-200
									rounded
									py-3
									px-4
									leading-tight
									focus:outline-none
									focus:bg-white
									focus:border-gray-500
								"
								v-model="admin"
								type="number"
							/>
						</div>
						<!--footer-->
						<div
							class="
								flex
								items-center
								justify-end
								p-6
								border-t border-solid border-blueGray-200
								rounded-b
							"
						>
							<button
								class="
									text-blue-500
									background-transparent
									font-bold
									uppercase
									px-6
									py-2
									text-sm
									outline-none
									focus:outline-none
									mr-1
									mb-1
									ease-linear
									transition-all
									duration-150
								"
								type="button"
								v-on:click="toggleModal()"
							>
								Simpan
							</button>
						</div>
					</div>
				</div>
			</div>
			<div
				v-if="showModal"
				class="opacity-25 fixed inset-0 z-40 bg-black"
			></div>
		</div>
		<div>
			<div
				v-if="showModalHarga"
				class="
					overflow-x-hidden overflow-y-auto
					fixed
					inset-0
					z-50
					outline-none
					focus:outline-none
					justify-center
					items-center
					flex
				"
			>
				<div class="relative w-auto my-6 mx-auto max-w-6xl">
					<!--content-->
					<div
						class="
							border-0
							rounded-lg
							shadow-lg
							relative
							flex flex-col
							w-full
							bg-white
							outline-none
							focus:outline-none
						"
					>
						<!--header-->
						<div
							class="
								flex
								items-start
								justify-between
								p-5
								border-b border-solid border-blueGray-200
								rounded-t
							"
						>
							<h3 class="text-3xl font-semibold">Edit Harga</h3>
							<button
								class="
									p-1
									ml-auto
									bg-transparent
									border-0
									text-black
									opacity-5
									float-right
									text-3xl
									leading-none
									font-semibold
									outline-none
									focus:outline-none
								"
								v-on:click="toggleModalHarga()"
							>
								<span
									class="
										bg-transparent
										text-black
										opacity-5
										h-6
										w-6
										text-2xl
										block
										outline-none
										focus:outline-none
									"
								>
									×
								</span>
							</button>
						</div>
						<!--body-->
						<div class="relative p-6 flex-auto">
							<input
								class="
									appearance-none
									block
									w-full
									bg-gray-200
									text-gray-700
									border border-gray-200
									rounded
									py-3
									px-4
									leading-tight
									focus:outline-none
									focus:bg-white
									focus:border-gray-500
								"
								v-model="getOrder.harga"
								type="number"
							/>
						</div>
						<!--footer-->
						<div
							class="
								flex
								items-center
								justify-end
								p-6
								border-t border-solid border-blueGray-200
								rounded-b
							"
						>
							<button
								class="
									text-blue-500
									background-transparent
									font-bold
									uppercase
									px-6
									py-2
									text-sm
									outline-none
									focus:outline-none
									mr-1
									mb-1
									ease-linear
									transition-all
									duration-150
								"
								type="button"
								v-on:click="toggleModalHarga()"
							>
								Simpan
							</button>
						</div>
					</div>
				</div>
			</div>
			<div
				v-if="showModalHarga"
				class="opacity-25 fixed inset-0 z-40 bg-black"
			></div>
		</div>
		<card-component id="print" has-table>
			<table>
				<tr class="top">
					<td colspan="2">
						<table>
							<tr>
								<td
									v-if="getOrder.status == 20"
									class="text-green-600 md:text-green-600 uppercase text-4xl"
								>
									Terbayar
								</td>
								<td
									v-if="getOrder.status == 2"
									class="text-yellow-600 md:text-yellow-600 uppercase text-4xl"
								>
									Pending
								</td>
								<td
									v-if="getOrder.status >= 40"
									class="text-red-600 md:text-red-600 uppercase text-4xl"
								>
									Gagal
								</td>
								<td>
									Transaksi #: {{ code }}<br />
									Tanggal Transaksi:
									{{ format_date(getOrder.tgl_entri) }}<br />
									Tanggal Pembayaran:
									{{ format_date(getOrder.tgl_status) }}
								</td>
							</tr>
						</table>
					</td>
				</tr>

				<tr class="information">
					<td colspan="2">
						{{ _address(getOrder['reseller.alamat']) }}
					</td>
				</tr>

				<tr class="item">
					<td>{{ getOrder['produk.nama'] }}</td>
					<td>
						{{ currency(getOrder.harga) }}
					</td>
				</tr>

				<tr class="item">
					<td>Admin</td>
					<td>
						{{ currency(admin) }}
					</td>
				</tr>

				<tr class="total">
					<td>Total:</td>
					<td>
						{{ currency(getOrder.harga + admin) }}
					</td>
				</tr>
			</table>
		</card-component>

		<button
			class="bg-blue-500 text-white font-bold py-2 px-4 rounded"
			v-on:click="toggleModal()"
		>
			Edit Admin
		</button>
		<button
			class="bg-blue-500 text-white font-bold py-2 px-4 rounded"
			v-on:click="toggleModalHarga()"
		>
			Edit Harga
		</button>
		<button
			class="bg-blue-500 text-white font-bold py-2 px-4 rounded"
			@click="print()"
		>
			Print
		</button>
	</main-section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { ref } from 'vue';
import { _address, currency, format_date } from '@/lib/util.js';

import MainSection from '@/components/MainSection';
import TitleBar from '@/components/TitleBar';
import HeroBar from '@/components/HeroBar';
import CardComponent from '@/components/CardComponent';

import {
	mdiMonitorCellphone,
	mdiAccountMultiple,
	mdiTableBorder,
	mdiTableOff,
} from '@mdi/js';

export default {
	data() {
		return {
			admin: 0,
			showModal: false,
			showModalHarga: false,
		};
	},

	props: ['code'],

	methods: {
		...mapActions(['fetchOrder']),
		_address,
		currency,
		format_date,

		toggleModal: function () {
			this.showModal = !this.showModal;
		},

		toggleModalHarga: function () {
			this.showModalHarga = !this.showModalHarga;
		},

		print() {
			var divElements = document.getElementById('print').innerHTML;

			var oldPage = document.body.innerHTML;

			document.body.innerHTML =
				'<html><head><title></title></head><body>' + divElements + '</body>';
			document.close();
			window.print();
			document.body.innerHTML = oldPage;
		},
	},

	components: {
		MainSection,
		CardComponent,
		HeroBar,
		TitleBar,
	},

	computed: {
		...mapGetters(['getOrder']),
	},

	created() {
		this.$store.dispatch('fetchOrder', this.code);
	},

	setup() {
		const titleStack = ref(['Admin', 'Tables']);

		return {
			titleStack,
			mdiMonitorCellphone,
			mdiAccountMultiple,
			mdiTableBorder,
			mdiTableOff,
		};
	},
};
</script>