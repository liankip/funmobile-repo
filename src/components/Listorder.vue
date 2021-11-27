<template>
  <table>
    <thead>
      <tr>
        <th>Kode Transaksi</th>
        <th>Tujuan</th>
        <th>Harga</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(order, index) in allOrders.result"
        :key="index"
      >
        <td data-label="kode">
          {{ order.kode }}
        </td>
        <td data-label="Destiny">
          {{ order.tujuan }}
        </td>
        <td data-label="Price">
          {{ currency(order.harga) }}
        </td>
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
          >TERBAYAR</span>
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
          >PENDING</span>
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
          >GAGAL</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { currency } from '@/lib/util.js';

export default {
	data() {
		return {
			page: 1,
			size: 10,
		};
	},
	computed: {
		...mapGetters(['allOrders']),
	},
	methods: {
		...mapActions(['fetchOrders']),
		currency,
	},
	mounted() {
		this.fetchOrders({ code: '', page: this.page, size: this.size });
	},
};
</script>