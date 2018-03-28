<template>
	<div class="custom-wrapper">
		<div class="header-wrapper">
			<x-header title='客户管理'></x-header>
		</div>
		<div class="search-wrapper">
			<search placeholder="客户名称|编号|地区" v-model="value" @cancel="onCancel"></search>
		</div>
		<div class="customerlist-wrapper">
			<scroll :data='renderData' ref='scrolllist' class="scrolllist" :options="options" @pulling-down="onPullingDown">
				<div class="list-card-wrapper">
					<card v-for="(item,index) in renderData" :item="item" @card-select="select" :key="index" :title="item.ZWWLDW_DWMC" :bottom='true'>
						<span slot="title-right" class="title-right">{{item.ZWDQZD_DQMC}}</span>
						<div slot="content" class="item-content">
							<p>地 址 : {{item.ZWWLDW_ADDR}}</p>
							<p>联系人 : {{item.ZWWLDW_LXR}}</p>
							<p>电 话 : {{item.ZWWLDW_TELE}}</p>
						</div>
						<div slot='left' @click.stop='showAddr(item)'>
							查看交货地址
						</div>
						<div slot='right' @click.stop='showMore(item)'>
							更多信息
						</div>
					</card>
				</div>
			</scroll>
		</div>
		<ajax-loading v-show='loading'></ajax-loading>
	</div>
</template>

<script>
	import XHeader from '../../base/xheader/xheader'
	import Search from '../../base/search/search'
	import Card from '../../base/card/card'
	import Scroll from '../../base/scroll/scroll'
	import ajaxLoading from '../../base/loading/ajax-loading'
	import _ from 'lodash'
	import { mapGetters } from 'vuex'
	export default {
		components: {
			XHeader,
			Search,
			Card,
			Scroll,
			ajaxLoading
		},
		data() {
			return {
				value: '',
				resData: [],
				renderData: [],
				loading: false,
				options: {
					pullDownRefresh: {
						threshold: 90,
						stop: 40,
						txt: '刷新完成!'
					}
				}
			}
		},
		computed:{
			...mapGetters(['url'])
		},
		watch: {
			value: _.debounce(function(){
				this.renderData = []
				let that = this
				this.renderData = this.resData.filter(function(item) {
					return (
						Object.values(item)
							.join("")
							.indexOf(that.value) > -1
					)
				})
			}, 500)
		},
		methods: {
			select() {
				
			},
			showAddr(item) {
				let dwbh = item.ZWWLDW_DWBH
				this.$router.push({ path: `/customers/delivery/${dwbh}` })
			},
			showMore(item) {
				let dwbh = item.ZWWLDW_DWBH
				this.$router.push({ path: `/customers/${dwbh}` })
			},
			onPullingDown() {
				setTimeout(() => {
					this.getCustomerList()
					.then(res => {
						this.resData = this.renderData = res.data
					})
					.catch(err=>{
						console.log(err)
					})
				}, 1000)
			},
			onCancel() {
				this.renderData = this.resData
			},
			getCustomerList() {
				let czybh = localStorage.getItem("CZYBH") || '0001'
				let urlstr = this.url + "/Handler/QueryHandler.ashx"
				let params = new URLSearchParams()
				params.append('action','queryCustomer')
				params.append('czybh',czybh)
				return new Promise((resolve,reject)=>{
					this.$http
					.post(urlstr, params)
					.then(res => {
						resolve(res)
					})
					.catch(err=>{
						reject(err)
					})
				})
			},
			init() {
				this.loading = true
				this.getCustomerList()
				.then(res => {
					this.resData = this.renderData = res.data
					this.loading = false
				})
				.catch(err=>{
					this.loading = false
					console.log(err)
				})
			}
		},
		mounted() {
			this.init()
		},
		beforeDestroy() {
			this.loading = false
		}
	}
</script>

<style lang="stylus" scoped>
	.custom-wrapper
		position relative
		.header-wrapper
			position fixed
			top 0
			left 0
			width 100%
			height 46px
			z-index 999
		.search-wrapper
			position fixed
			top 46px
			width 100%
		.customerlist-wrapper
			position fixed
			top 88px
			width 100%
			bottom 5px		
			.scrolllist
				height 100%
				overflow hidden
				width 100%
				.list-card-wrapper
					padding-bottom 5px	
					.item-content
						padding-left: 20px
						padding-top: 3px
</style>


