<template>
	<title-bar :title-stack="titleStack" />
	<hero-bar>Mutasi</hero-bar>
	<main-section>
		<card-component title="Mutasi" :icon="mdiMonitorCellphone" has-table>
			<table>
				<thead>
					<tr>
						<th>Nama Customer</th>
						<th>Tanggal Mutasi</th>
						<th>Jumlah</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(mutasi, index) in allMutation.result" :key="index">
						<td data-label="nama">
							{{ mutasi['reseller.nama'] }}
						</td>
						<td data-label="tanggal">
							{{ format_date(mutasi.tanggal) }}
						</td>
						<td data-label="jumlah">
							{{ currency(mutasi.jumlah) }}
						</td>
						<td data-label="staus">
							<span
								v-if="mutasi['transaksi.status'] == 20"
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
								v-if="mutasi['transaksi.status'] == 2"
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
								v-if="mutasi['transaksi.status'] >= 40"
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
					</tr>
				</tbody>
			</table>
			<v-pagination
				v-model="page"
				style="list-style: disc outside; list-style-type: none"
				:pages="allMutation.pages"
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
import { currency, format_date } from '@/lib/util.js';
import { ref } from 'vue';

import MainSection from '@/components/MainSection';
import TitleBar from '@/components/TitleBar';
import HeroBar from '@/components/HeroBar';
import CardComponent from '@/components/CardComponent';

import {
	mdiAccountMultiple,
	mdiCartOutline,
	mdiFinance,
	mdiMonitorCellphone,
	mdiReload,
	mdiGithub,
	mdiEye,
	mdiTrashCan,
	mdiMagnify,
} from '@mdi/js';

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
			searchMutation: '',
		};
	},
	computed: {
		...mapGetters(['allMutation']),
	},
	methods: {
		...mapActions(['fetchMutations', 'removeMutation']),

		getRequestPayload(searchMutation, page) {
			let params = {};

			searchMutation
				? (params['name'] = searchMutation)
				: (params['name'] = '');

			if (page) {
				params['page'] = page;
			}

			return params;
		},

		retrieveMutations() {
			let payload = this.getRequestPayload(this.searchMutation, this.page);

			this.$store.dispatch('fetchMutations', payload);
		},

		refreshList() {
			this.retrieveMutations();
		},

		toMutation(kode) {
			this.$router.push({
				name: 'Mutation',
				params: {
					code: kode,
				},
			});
		},

		updateHandler(value) {
			this.page = value;
			this.retrieveMutations();
		},

		persist(event) {
			localStorage.setItem('mutation', event.target.value);
		},

		currency,
		format_date,
	},

	setup() {
		const titleStack = ref(['Report', 'Mutasi']);

		return {
			titleStack,
			mdiAccountMultiple,
			mdiCartOutline,
			mdiFinance,
			mdiMonitorCellphone,
			mdiReload,
			mdiGithub,
			mdiEye,
			mdiTrashCan,
			mdiMagnify,
		};
	},

	mounted() {
		this.retrieveMutations();
		if (localStorage.mutation) {
			this.searchProduct = localStorage.getItem('mutation');
		}
	},
};
</script>