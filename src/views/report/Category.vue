<template>
	<title-bar :title-stack="titleStack" />
	<hero-bar>Produk</hero-bar>
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
							<h3 class="text-2xl font-bold">Edit Laba</h3>
							<div
								class="modal-close cursor-pointer z-50"
								@click="closeModal()"
							>
								<svg
									class="fill-current text-black"
									xmlns="http://www.w3.org/2000/svg"
									width="18"
									height="18"
									viewBox="0 0 18 18"
								>
									<path
										d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
									></path>
								</svg>
							</div>
						</div>
						<!--body-->
						<div class="relative p-6 flex-auto">
							<p>Kode Reseller</p>
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
									focus:outline-none focus:bg-white focus:border-gray-500
								"
								v-model="reseller"
							/>
							<p>Markup</p>
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
									focus:outline-none focus:bg-white focus:border-gray-500
								"
								v-model="markup"
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
									px-4
									bg-transparent
									p-3
									rounded-lg
									text-indigo-500
									hover:bg-gray-100 hover:text-indigo-400
									mr-2
								"
								@click="closeModal()"
							>
								Tutup
							</button>
							<button
								class="
									px-4
									bg-indigo-500
									p-3
									rounded-lg
									text-white
									hover:bg-indigo-400
								"
								type="button"
								v-on:click="toggleModal(kode)"
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

		<div class="shadow flex mb-6">
			<span class="w-auto flex justify-end items-center p-2">
				<svg
					class="fill-current w-4 h-4 mr-2"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
				>
					<path :d="mdiMagnify" />
				</svg>
			</span>
			<input
				v-model="searchNama"
				class="w-full rounded p-2"
				type="text"
				placeholder="Masukkan nama category yang ingin dicari"
				@input="
					page = 1;
					retrieveCategory();
				"
			/>
		</div>

		<card-component title="Category" :icon="mdiMonitorCellphone" has-table>
			<table>
				<thead>
					<tr>
						<th>Kode</th>
						<th>Nama Category</th>
						<th>Type</th>
						<th>Laba</th>
						<th>Prefix</th>
						<th />
					</tr>
				</thead>
				<tbody>
					<tr v-for="(operator, index) in allOperators.result" :key="index">
						<td>{{ operator.kode }}</td>
						<td>{{ operator.nama }}</td>
						<td>
							<p v-if="operator.kode !== 'ZWD'">Prepaid</p>
							<p v-else>Postpaid</p>
						</td>
						<td>
							{{ currency(operator['markup_operator.markup']) }}
						</td>
						<td>
							{{ operator.prefix_tujuan }}
						</td>
						<td class="is-actions-cell">
							<jb-buttons type="justify-start lg:justify-end" no-wrap>
								<jb-button
									class="mr-3"
									color="success"
									:icon="mdiPencil"
									small
									@click="toggleModal(operator.kode)"
								/>
							</jb-buttons>
						</td>
					</tr>
				</tbody>
			</table>
			<div class="table-pagination">
				<level>
					<v-pagination
						v-model="page"
						style="list-style: disc outside; list-style-type: none"
						:pages="allOperators.pages"
						:range-size="1"
						active-color="#DCEDFF"
						@update:modelValue="updateHandler"
					/>
				</level>
			</div>
		</card-component>
	</main-section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { ref } from 'vue';
import VPagination from '@hennge/vue3-pagination';
import { currency } from '@/lib/util.js';

import MainSection from '@/components/MainSection';
import TitleBar from '@/components/TitleBar';
import HeroBar from '@/components/HeroBar';
import CardComponent from '@/components/CardComponent';

import Level from '@/components/Level';

import JbButtons from '@/components/JbButtons';
import JbButton from '@/components/JbButton';

import { mdiMonitorCellphone, mdiPencil, mdiMagnify } from '@mdi/js';

export default {
	name: 'Produk',
	components: {
		VPagination,
		MainSection,
		CardComponent,
		HeroBar,
		TitleBar,
		Level,
		JbButton,
		JbButtons,
	},
	data() {
		return {
			page: 1,
			searchNama: '',
			showModal: false,
			reseller: '',
			markup: 0,
			kode: '',
		};
	},
	computed: {
		...mapGetters(['allOperators']),
	},
	methods: {
		...mapActions(['fetchOperators', 'createupdateOperator']),

		getRequestPayload(searchNama, page) {
			let params = {};

			searchNama ? (params['nama'] = searchNama) : (params['nama'] = '');

			if (page) {
				params['page'] = page;
			}

			return params;
		},

		retrieveCategory() {
			let payload = this.getRequestPayload(this.searchNama, this.page);

			this.$store.dispatch('fetchOperators', payload);
		},

		updateHandler(value) {
			this.page = value;
			this.retrieveCategory();
		},

		currency,

		toggleModal: function (kode) {
			this.showModal = !this.showModal;
			this.kode = kode;
			let data = {
				reseller: this.reseller,
				markup: this.markup,
				kode: kode,
			};
			this.$store.dispatch('createupdateOperator', data);
			this.retrieveCategory();
		},

		closeModal: function () {
			this.showModal = !this.showModal;
		},
	},

	setup() {
		const titleStack = ref(['Admin', 'Category']);

		return {
			titleStack,
			mdiMonitorCellphone,
			mdiPencil,
			mdiMagnify,
		};
	},

	created() {
		this.retrieveCategory();
	},

	mounted() {
		this.retrieveCategory();
	},
};
</script>