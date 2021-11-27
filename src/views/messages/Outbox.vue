<template>
	<title-bar :title-stack="titleStack" />
	<hero-bar>Outbox</hero-bar>
	<main-section>
		<card-component
			title="Pesan Keluar"
			:icon="mdiAccountMultiple"
			has-table
		>
			<table class="table-auto table-fixed">
				<thead>
					<tr>
						<th>Kode</th>
						<th>Tanggal</th>
						<th>Penerima</th>
						<th>Pesan</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="(outbox, index) in allOutbox.result"
						:key="index"
						@click="message(outbox.pesan)"
					>
						<td>{{ outbox.kode }}</td>
						<td>{{ formatdate(outbox.tgl_entri) }}</td>
						<td>{{ outbox.penerima }}</td>
						<td>{{ outbox.pesan.substring(0, 18) + '..' }}</td>
						<td data-label="staus">
							<span
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
								v-if="
									outbox.status >= 20 && outbox.status <= 22
								"
								>TERKIRIM</span
							>
							<span
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
								v-if="outbox.status >= 0 && outbox.status <= 2"
								>PENDING</span
							>
							<span
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
								v-if="outbox.status >= 40"
								>GAGAL TERKIRIM</span
							>
						</td>
					</tr>
				</tbody>
			</table>
			<v-pagination
				v-model="page"
				style="list-style: disc outside; list-style-type: none"
				:pages="allOutbox.pages"
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
import { ref } from 'vue';
import { formatdate } from '@/lib/util.js';
import {
	mdiMonitorCellphone,
	mdiAccountMultiple,
	mdiTableBorder,
	mdiTableOff,
} from '@mdi/js';
import MainSection from '@/components/MainSection';
import CardComponent from '@/components/CardComponent';
import TitleBar from '@/components/TitleBar';
import HeroBar from '@/components/HeroBar';

export default {
	name: 'Tables',
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
		...mapGetters(['allOutbox']),
	},
	methods: {
		...mapActions(['fetchOutbox']),

		getRequestPayload(page) {
			let params = {};

			if (page) {
				params['page'] = page;
			}

			return params;
		},

		retrieveOutbox() {
			let payload = this.getRequestPayload(this.page);

			this.$store.dispatch('fetchOutbox', payload);
		},

		refreshList() {
			this.retrieveOutbox();
		},

		updateHandler(value) {
			this.page = value;
			this.retrieveOutbox();
		},

		message(index) {
			this.$swal.fire({
				title: `<strong class="text-base md:text-lg">${index}</strong>`,
				width: '2000px',
				heightAuto: true,
			});
		},

		formatdate,
	},
	setup() {
		const titleStack = ref(['Admin', 'Outbox']);

		return {
			titleStack,
			mdiMonitorCellphone,
			mdiAccountMultiple,
			mdiTableBorder,
			mdiTableOff,
		};
	},

	mounted() {
		this.retrieveOutbox();
	},
};
</script>
