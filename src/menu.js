import {
	mdiDesktopMac,
	mdiMargin,
	mdiCreditCard,
	mdiChartLine,
	mdiCurrencyUsd,
	mdiInboxFull,
	mdiInboxFullOutline,
	mdiPackage
} from '@mdi/js'

export default [
	'Report',
	[
		{
			to: '/',
			icon: mdiDesktopMac,
			label: 'Report'
		},
		{
			to: '/category',
			icon: mdiDesktopMac,
			label: 'Category'
		},
		{
			to: '/product',
			icon: mdiPackage,
			label: 'Produk'
		}
	],
	'messages', [
		{
			to: '/outbox',
			icon: mdiInboxFullOutline,
			label: 'Outbox'
		},
	],
	'Transaction', [
		{
			to: '/deposit',
			icon: mdiCreditCard,
			label: 'Deposit'
		},
		{
			to: '/mutation',
			icon: mdiChartLine,
			label: 'Mutasi'
		},
		{
			to: '/transaction',
			icon: mdiMargin,
			label: 'Transaksi'
		},
		{
			to: '/commission',
			icon: mdiCurrencyUsd,
			label: 'Komisi'
		}
	],
]
