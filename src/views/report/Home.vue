<template>
	<title-bar :title-stack="titleStack" />
	<hero-bar>Report</hero-bar>
	<main-section>
		<div class="grid grid-cols-1 gap-6 lg:grid-cols-4 mb-6">
			<card-widget
				v-for="(count, index) in countAll"
				:key="index"
				class="tile"
				:color="count.color"
				:icon="count.icon"
				:number="count.total"
				prefix=""
				:label="count.nama"
			/>
		</div>

		<card-component
			:icon="mdiMonitorCellphone"
			title="Daftar Transaksi"
			has-table
		>
			<Listorder />
		</card-component>
	</main-section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { ref, onMounted } from 'vue';
import {
	mdiAccountMultiple,
	mdiCartOutline,
	mdiChartTimelineVariant,
	mdiFinance,
	mdiPackage,
	mdiMonitorCellphone,
	mdiReload,
	mdiGithub,
	mdiCashCheck,
} from '@mdi/js';
import * as chartConfig from '@/components/Charts/chart.config';

import Listorder from '@/components/Listorder.vue';

import MainSection from '@/components/MainSection';
import TitleBar from '@/components/TitleBar';
import HeroBar from '@/components/HeroBar';
import CardWidget from '@/components/CardWidget';
import CardComponent from '@/components/CardComponent';

export default {
	name: 'Home',
	components: {
		MainSection,
		CardComponent,
		CardWidget,
		HeroBar,
		TitleBar,
		Listorder,
	},

	methods: {
		...mapActions(['fetchCounts', 'fetchTrx']),
	},

	setup() {
		const titleStack = ref(['Home', 'Report']);

		const chartData = ref(null);

		const fillChartData = () => {
			chartData.value = chartConfig.sampleChartData();
		};

		onMounted(() => {
			fillChartData();
		});

		return {
			titleStack,
			chartData,
			fillChartData,
			mdiAccountMultiple,
			mdiCartOutline,
			mdiChartTimelineVariant,
			mdiFinance,
			mdiMonitorCellphone,
			mdiReload,
			mdiGithub,
			mdiPackage,
			mdiCashCheck,
		};
	},

	computed: mapGetters(['countAll']),

	async created() {
		this.fetchCounts();
	},
};
</script>
