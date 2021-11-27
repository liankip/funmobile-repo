<template>
	<title-bar :title-stack="titleStack" />
	<hero-bar>Transaksi</hero-bar>
	<main-section>
		<card-component title="Transaksi" :icon="mdiMonitorCellphone" has-table>
			<table>
				<thead>
					<tr>
						<th>ID TRX</th>
						<th>Tanggal</th>
						<th>Produk</th>
						<th>Total</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(order, index) in allOrders.result" :key="index">
						<td>
							{{ order.kode }}
						</td>
						<td>{{ formatdate(order.tgl_entri) }}</td>
						<td>{{ order['produk.kode'] }} - {{ order['produk.nama'] }}</td>
						<td>{{ currency(order.harga) }}</td>
						<td data-label="staus">
							<span
								v-if="order.status == 20"
								class="
									inline-flex
									items-center
									justify-center
									px-2
									py-1
									text-xs
									font-bold
									leading-none
									text-green-100
									bg-green-600
									rounded-full
									uppercase
								"
								>TERBAYAR</span
							>
							<span
								v-if="order.status == 2"
								class="
									inline-flex
									items-center
									justify-center
									px-2
									py-1
									text-xs
									font-bold
									leading-none
									text-yellow-100
									bg-yellow-600
									rounded-full
									uppercase
								"
								>PENDING</span
							>
							<span
								v-if="order.status >= 40"
								class="
									inline-flex
									items-center
									justify-center
									px-2
									py-1
									text-xs
									font-bold
									leading-none
									text-red-100
									bg-red-600
									rounded-full
									uppercase
								"
								>GAGAL</span
							>
						</td>
						<td class="is-actions-cell">
							<jb-buttons
								v-if="order.status >= 20 && order.status <= 22"
								type="justify-start lg:justify-end"
								no-wrap
							>
								<jb-button
									class="mr-3"
									color="success"
									:icon="mdiPrinter"
									small
									@click="toOrder(order.kode)"
								/>
							</jb-buttons>
						</td>
					</tr>
				</tbody>
			</table>
			<v-pagination
				v-model="page"
				style="list-style: disc outside; list-style-type: none"
				:pages="allOrders.pages"
				:range-size="1"
				active-color="#DCEDFF"
				@update:modelValue="updateHandler"
			/>
		</card-component>
	</main-section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import VPagination from '@hennge/vue3-pagination';
import { currency, formatdate } from '@/lib/util.js';
import { ref } from 'vue';

import MainSection from '@/components/MainSection';
import TitleBar from '@/components/TitleBar';
import HeroBar from '@/components/HeroBar';
import CardComponent from '@/components/CardComponent';

import JbButtons from '@/components/JbButtons';
import JbButton from '@/components/JbButton';

import {
	mdiMonitorCellphone,
	mdiReload,
	mdiEye,
	mdiTrashCan,
	mdiMagnify,
	mdiPrinter,
} from '@mdi/js';

export default {
	components: {
		VPagination,
		MainSection,
		CardComponent,
		HeroBar,
		TitleBar,
		JbButton,
		JbButtons,
	},
	data() {
		return {
			page: 1,
			size: 50,
			searchOrder: '',
		};
	},
	computed: {
		...mapGetters(['allOrders']),
	},
	methods: {
		...mapActions(['fetchOrders', 'removeOrder']),

		getRequestPayload(searchOrder, page, size) {
			let params = {};

			searchOrder ? (params['code'] = searchOrder) : (params['code'] = '');

			if (page) {
				params['page'] = page;
			}

			if (size) {
				params['size'] = size;
			}

			return params;
		},

		retrieveOrders() {
			let payload = this.getRequestPayload(
				this.searchOrder,
				this.page,
				this.size
			);

			this.$store.dispatch('fetchOrders', payload);
		},

		refreshList() {
			this.retrieveOrders();
		},

		toOrder(kode) {
			this.$router.push({
				name: 'Transaction',
				params: {
					code: kode,
				},
			});
		},

		updateHandler(value) {
			this.page = value;
			this.retrieveOrders();
		},

		persist(event) {
			localStorage.setItem('order', event.target.value);
		},

		formatdate,
		currency,
	},

	setup() {
		const titleStack = ref(['Report', 'Transaksi']);

		return {
			titleStack,
			mdiMonitorCellphone,
			mdiReload,
			mdiEye,
			mdiTrashCan,
			mdiMagnify,
			mdiPrinter,
		};
	},

	mounted() {
		this.retrieveOrders();

		if (localStorage.product) {
			this.searchProduct = localStorage.getItem('order');
		}
	},
};
</script>