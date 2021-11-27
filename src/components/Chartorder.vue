<template>
	<apexchart
		type="bar"
		height="350"
		:options="chartOptions"
		:series="series"
		class="h-96"
	/>
</template>

<script>
import axios from 'axios';
import baseURL from '@/api/api';
import auth from '@/lib/auth';

export default {
	data: function () {
		return {
			series: [
				{
					name: 'Pemasukan',
					data: [[]],
				},
			],
			chartOptions: {
				chart: {
					height: 350,
					type: 'bar',
				},
				plotOptions: {
					bar: {
						borderRadius: 10,
						dataLabels: {
							position: 'top',
						},
					},
				},
				dataLabels: {
					enabled: true,
					offsetY: -20,
					style: {
						fontSize: '12px',
						colors: ['#304758'],
					},
				},

				xaxis: {
					position: 'top',
					axisBorder: {
						show: false,
					},
					axisTicks: {
						show: false,
					},
					crosshairs: {
						fill: {
							type: 'gradient',
							gradient: {
								colorFrom: '#D8E3F0',
								colorTo: '#BED1E6',
								stops: [0, 100],
								opacityFrom: 0.4,
								opacityTo: 0.5,
							},
						},
					},
					tooltip: {
						enabled: true,
					},
				},
				yaxis: {
					axisBorder: {
						show: false,
					},
					axisTicks: {
						show: false,
					},
					labels: {
						formatter: function (value) {
							return new Intl.NumberFormat('id-ID', {
								style: 'currency',
								currency: 'IDR',
								maximumSignificantDigits: 3,
							}).format(value);
						},
					},
				},
				title: {
					text:
						'Data penjualan pebulan dalam tahun ' + new Date().getFullYear(),
					floating: true,
					offsetY: 330,
					align: 'center',
					style: {
						color: '#444',
					},
				},
			},
		};
	},
	created() {
		this.getPoints();
	},
	methods: {
		getPoints() {
			axios
				.get(baseURL + 'dashreport/chartrxr', {
					headers: {
						token: auth,
					},
				})
				.then((res) => {
					this.series = [
						{
							data: res.data,
						},
					];
				});
		},
	},
};
</script>
