<template>
	<title-bar :title-stack="titleStack" />
	<hero-bar>Deposit</hero-bar>
	<main-section>
		<card-component
			title="Daftar Deposit"
			:icon="mdiMonitorCellphone"
			has-table
		>
			<table
				class="
					table
					is-fullwidth is-striped is-hoverable is-sortable is-fullwidth
				"
			>
				<thead>
					<tr>
						<th>Waktu</th>
						<th>Reseller</th>
						<th>Jumlah</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(deposit, index) in allDeposit.result" :key="index">
						<td>{{ format_date(deposit.waktu) }}</td>
						<td>
							{{ deposit['reseller.kode'] }} -
							{{ deposit['reseller.nama'] }}
						</td>
						<td>{{ currency(deposit.jumlah) }}</td>
						<td>
							<span
								v-if="deposit.status == 'S'"
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
								v-if="deposit.status == 'C'"
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
				:pages="allDeposit.pages"
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
		};
	},

	computed: {
		...mapGetters(['allDeposit']),
	},

	methods: {
		...mapActions(['fetchDeposit']),

		getRequestPayload(page) {
			let params = {};

			if (page) {
				params['page'] = page;
			}

			return params;
		},

		retrieveDeposit() {
			let payload = this.getRequestPayload(this.page);

			this.$store.dispatch('fetchDeposit', payload);
		},

		refreshList() {
			this.retrieveDeposit();
		},

		updateHandler(value) {
			this.page = value;
			this.retrieveDeposit();
		},

		currency,
		format_date,
	},

	setup() {
		const titleStack = ref(['Report', 'Deposit']);

		return {
			titleStack,
			mdiAccountMultiple,
			mdiCartOutline,
			mdiFinance,
			mdiMonitorCellphone,
			mdiReload,
		};
	},

	mounted() {
		this.retrieveDeposit();
	},
};
</script>