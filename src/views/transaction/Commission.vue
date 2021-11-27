<template>
	<title-bar :title-stack="titleStack" />
	<hero-bar>Komisi</hero-bar>
	<main-section>
		<card-component title="Pesan Masuk" :icon="mdiMonitorCellphone" has-table>
			<table class="table-auto table-fixed">
				<thead>
					<tr>
						<th>Tanggal</th>
						<th>Produk</th>
						<th>Tujuan</th>
						<th>Reseller</th>
						<th>Jumlah</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(komisi, index) in allCommission.result" :key="index">
						<td>{{ formatdate(komisi['transaksi.tgl_entri']) }}</td>
						<td>{{ komisi['transaksi.produk.nama'] }}</td>
						<td>{{ komisi['transaksi.tujuan'] }}</td>
						<td>
							{{ komisi.kode_reseller }} -
							{{ komisi['reseller.nama'] }}
						</td>
						<td>{{ komisi.jumlah }}</td>
					</tr>
				</tbody>
			</table>
			<v-pagination
				v-model="page"
				style="list-style: disc outside; list-style-type: none"
				:pages="allCommission.pages"
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
import { formatdate } from '@/lib/util.js';
import { ref } from 'vue';

import MainSection from '@/components/MainSection';
import TitleBar from '@/components/TitleBar';
import HeroBar from '@/components/HeroBar';
import CardComponent from '@/components/CardComponent';

import { mdiMonitorCellphone, mdiReload, mdiMagnify } from '@mdi/js';

export default {
	components: {
		VPagination,
		MainSection,
		CardComponent,
		HeroBar,
		TitleBar,
	},

	data() {
		return {
			page: 1,
			size: 50,
		};
	},
	computed: {
		...mapGetters(['allCommission']),
	},
	methods: {
		...mapActions(['fetchCommission']),

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

		retrieveCommission() {
			let payload = this.getRequestPayload(
				this.searchOrder,
				this.page,
				this.size
			);

			this.$store.dispatch('fetchCommission', payload);
		},

		refreshList() {
			this.retrieveCommission();
		},

		updateHandler(value) {
			this.page = value;
			this.retrieveCommission();
		},

		persist(event) {
			localStorage.setItem('order', event.target.value);
		},

		formatdate,
	},

	setup() {
		const titleStack = ref(['Report', 'Komisi']);

		return {
			titleStack,
			mdiMonitorCellphone,
			mdiReload,
			mdiMagnify,
		};
	},

	mounted() {
		this.retrieveCommission();
	},
};
</script>