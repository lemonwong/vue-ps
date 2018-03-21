<template>
	<div class="dblist-wrapper">
		<div class="header-wrapper">
			<x-header title="待办任务" @right-click="showFilter" :showRightBtn=true>
				<span slot="right-icon" class="icon-prev"></span>
			</x-header>
		</div>
		<div class="list-content-wrapper">
			<scroll :data='dblist' :pullup='true' ref='scrolllist' class="scrolllist" :options="options" @pulling-down="onPullingDown" @pulling-up="onPullingUp">
				<div class="card-wrapper">
					<card v-for="(item,index) in dblist" :item="item" @card-select="select" :key="index" :title="item.bt[0]['单据名称']">
						<div slot="content">
							<p v-for="(val,key,index) in item.mx[0]">{{key}} : {{val}}</p>
						</div>
					</card>
				</div>
			</scroll>
		</div>
		<div class="filter-wrapper" v-show='filterFlag'>
			<scroll ref='scrollfilter' class="scrollfilter" :data='receiptTypes'>
				<ul>
					<li class="item" v-for='(item,index) in receiptTypes' @click='chooseType(item)'>{{item.单据名称}}</li>
				</ul>
			</scroll>
		</div>
		<ajax-loading v-show='loading'></ajax-loading>
	</div>
</template>

<script>
	import XHeader from '../../base/xheader/xheader'
	import Card from '../../base/card/card'
	import Scroll from '../../base/scroll/scroll'
	import ajaxLoading from '../../base/loading/ajax-loading'
	import {mapGetters} from 'vuex'
	export default {
		components: {
			XHeader,
			Card,
			Scroll,
			ajaxLoading
		},
		data() {
			return {
				filterFlag: false,
				loading:false,
				dblist: [],
				receiptTypes:[],
				curType:'all',
				times:1,
				options: {
					pullDownRefresh: {
						threshold: 90,
						stop: 40,
						txt: '刷新完成!'
					},
					pullUpLoad: {
						threshold: 0,
						txt: {
							more: '加载更多...',
							noMore: '没有更多数据了'
						}
					}
				}
			}
		},
		computed:{
			...mapGetters(['url'])
		},
		watch: {
			curType() {
				this.times = 1
				this.loading = true
				this.getDblist()
				.then(res=>{
					if(res.data.length > 0) {
						this.dblist = res.data
					}
					this.loading = false
				})
				.catch(err=>{
					this.loading = false
					console.log(err)
				})
			}
		},
		methods: {
			onPullingDown() {
				this.times = 1
				this.loading = true
				setTimeout(() => {
					this.getDblist().then(res=>{
						// 如果有新数据
						if(res.data.length > 0) {
							this.dblist = res.data
						} else {
							// 如果没有新数据
							this.$refs.scrolllist.forceUpdate()
						}
					})
					.catch(err=>{
						console.log(err)
					})
					this.loading = false
				}, 1000)
			},
			onPullingUp() {
				let that = this
				// 更新数据
				if(this.times === 1) {
					this.times = 2
				}
				this.loading = true
				setTimeout(() => {
					this.getDblist().then(res=>{
						// 如果有新数据
						if(res.data.length > 0) {
							this.dblist = [...this.dblist,...res.data]
							this.times += 1
						} else {
							// 如果没有新数据
							this.$refs.scrolllist.forceUpdate()
						}
					})
					.catch(err=>{
						this.loading = false
						console.log(err)
					})
					this.loading = false
				}, 1000)
			},
			showFilter() {
				this.filterFlag = !this.filterFlag
				let ele = document.getElementsByClassName('filter-wrapper')[0]
				
				if(this.filterFlag) {
					if(this.receiptTypes.length > 8) {
						ele.style.height = '300px'
					}
					setTimeout(()=>{
						this.$refs.scrollfilter.refresh()
					},20)
				}
			},
			select(val) {
				alert(val.bt[0]['单据名称'])
			},
			chooseType(item) {
				let ywid = item.单据编号
				console.log(ywid)
				this.curType = ywid
				this.filterFlag = false
			},
			getReceiptTypes() {
				let that = this
				let suburl = this.url + '/Handler/Handler.ashx'
				let params = new URLSearchParams()
				params.append('kind', 'info')
				return new Promise((resolve,reject)=>{
					this.$http.post(suburl,params)
					.then(res=>{
						resolve(res)
					})
					.catch(err=>{
						reject(err)
					})
				})
			},
			getDblist() {
				let suburl = this.url + '/Handler/Handler.ashx'
				let czybh = localStorage.getItem('CZYBH') || '0001'
				let bz = 'db'
				let params = new URLSearchParams()
				params.append('kind', 'dbdefault')
				params.append('czybh', czybh)
				params.append('bz', bz)
				params.append('type', this.curType)
				params.append('times', this.times)
				params.append('dateFilter', '')
				return new Promise((resolve,reject)=>{
					this.$http.post(suburl,params)
					.then(res=>{
						resolve(res)
					})
					.catch(err=>{
						reject(err)
					})
				})
			},
			init() {
				this.loading = true
				let that = this
				this.getDblist().then(res=>{
					if(res.data.length > 0) {
						that.dblist = res.data
						that.times += 1
					}
					that.getReceiptTypes().then(res=>{
						if(res.data.length>0){
							that.receiptTypes = res.data
						}
						that.loading = false
					})
					.catch(err=>{
						this.loading = false
						console.log(err)
					})
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

<style lang="stylus">
	.dblist-wrapper
		.header-wrapper
			position fixed
			top 0
			left 0
			width 100%
			height 46px
			z-index 999
		.list-content-wrapper
			position fixed 
			width 100%
			top 46px
			bottom 0
			.scrolllist
				height 100%
				overflow hidden
				width 100%
		.filter-wrapper
			border-radius 5px
			position fixed
			margin 10px 3px
			width 30%
			top 48px
			max-height 300px
			right 10px
			background-color #FFF
			color #000
			border 1px solid #d8c5e7
			.scrollfilter
				height 100%
				overflow hidden
				width 100%
				.item
					box-sizing border-box
					align-items center
					padding 10px 10px
					text-align center
</style>


