import { createRouter, createWebHistory } from 'vue-router';

import Login from '@/views/auth/Login.vue';

import Home from '@/views/report/Home.vue';
import Memberdownline from '@/views/report/Memberdownline.vue';
import Category from '@/views/report/Category.vue';
import Product from '@/views/report/Product.vue';

import Deposit from '@/views/transaction/Deposit.vue';
import Mutations from '@/views/transaction/Mutation.vue';
import Transactions from '@/views/transaction/trx/Transaction.vue';
import Transactionprint from '@/views/transaction/trx/Transactionprint.vue';
import Transactiondownline from '@/views/transaction/Transactiondownline.vue';
import Commission from '@/views/transaction/Commission.vue';
import Redeempoin from '@/views/transaction/Redeempoin.vue';

import Outbox from '@/views/messages/Outbox.vue'

import NotFound from '@/views/NotFound.vue';

const routes = [
	{
		meta: {
			title: 'Report'
		},
		path: '/',
		name: 'home',
		component: Home
	},
	{
		meta: {
			title: 'Login',
			formScreen: true
		},
		path: '/login',
		name: 'Login',
		component: Login,
	},
	{
		meta: {
			title: 'Member Downline'
		},
		path: '/member-downline',
		name: 'mDownline',
		component: Memberdownline,
	},
	{
		meta: {
			title: 'Category'
		},
		path: '/category',
		name: 'Category',
		component: Category,
	},
	{
		meta: {
			title: 'Produk'
		},
		path: '/product',
		name: 'Product',
		component: Product,
	},
	{
		meta: {
			title: 'Outbox'
		},
		path: '/outbox',
		name: 'Outbox',
		component: Outbox,
	},
	{
		meta: {
			title: 'Transaksi'
		},
		path: '/transaction',
		name: 'Transactions',
		component: Transactions,
	},
	{
		meta: {
			title: 'Transaksi Print'
		},
		path: '/transaction/print/:code',
		name: 'Transaction',
		component: Transactionprint,
		props: true
	},
	{
		meta: {
			title: 'Mutasi'
		},
		path: '/mutation',
		name: 'Mutations',
		component: Mutations,
	},
	{
		meta: {
			title: 'Deposit'
		},
		path: '/deposit',
		name: 'Deposits',
		component: Deposit,
	},
	{
		meta: {
			title: 'Transaksi Downline'
		},
		path: '/transaction-downline',
		name: 'tDownline',
		component: Transactiondownline,
	},
	{
		meta: {
			title: 'Komisi'
		},
		path: '/commission',
		name: 'Commission',
		component: Commission,
	},
	{
		meta: {
			title: 'Penukaran Poin'
		},
		path: '/poin',
		name: 'Poin',
		component: Redeempoin,
	},
	{
		path: "/:catchAll(.*)",
		component: NotFound,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
	linkActiveClass: 'active',
});

export default router;
