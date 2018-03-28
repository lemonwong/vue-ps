<template>
	<div class="delivery-wrapper">
		<div class="header-wrapper">
			<nav-bar
				title="交货地址"
				left-arrow
				@click-left="onClickLeft"
			/>
		</div>
		<div class="address-wrapper">
			<scroll :data='renderData' ref='scrolllist' class="scrolllist" :options="options" @pulling-down="onPullingDown">
				<div class="item-wrapper" v-for='(item,index) in renderData' :key='index'>
					<p class="card-padding pt-5">
						<span class="key">地&nbsp;&nbsp;&nbsp;址&nbsp;:&nbsp;&nbsp;</span>
						<span class="val">{{item.F_JHDD}}</span>
					</p>
					<p class="card-padding">
						<span class="key">联系人&nbsp;:&nbsp;&nbsp;</span>
						<span class="val">{{item.F_LXR}}</span>
					</p>
					<p class="card-padding">
						<span class="key">电&nbsp;&nbsp;&nbsp;话&nbsp;:&nbsp;&nbsp;</span>
						<span class="val">{{item.F_TELE}}</span>
					</p>
					<p class="card-padding">
						<span class="key">手机号&nbsp;:&nbsp;&nbsp;</span>
						<span class="val">{{item.F_SJH}}</span>
					</p>
				</div>
			</scroll>
		</div>
		<div class="btn-wrapper">
			<x-button type="default" size='large' @click='addAddress'>新增交货地点</x-button>
		</div>
		<ajax-loading v-show='loading'></ajax-loading>
	</div>
</template>

<script>
	import navBar from '../../base/navbar/navbar'
	import cellGroup from '../../base/cell-group/cell-group'
	import Cell from '../../base/cell/cell'
	import ajaxLoading from '../../base/loading/ajax-loading'
	import XButton from '../../base/button/button'
	import Scroll from '../../base/scroll/scroll'
	import { mapGetters } from 'vuex'
	export default {
		components: {
			navBar,
			cellGroup,
			Cell,
			ajaxLoading,
			XButton,
			Scroll
		},
		data() {
			return {
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
		computed: {
			...mapGetters(['url'])
		},
		methods: {
			onClickLeft() {
				this.$router.go(-1)
			},
			addAddress() {
				let dwbh = this.$route.params.dwbh
				this.$router.push({path:`/customers/delivery/${dwbh}/adddelivery`})
			},
			onPullingDown() {
				setTimeout(() => {
					this.getDeliveryDic()
					.then(res => {
						this.renderData = res.data.Table
					})
					.catch(err=>{
						console.log(err)
					})
				}, 1000)
			},
			getDeliveryDic() {
				let that = this
				let urlstr = this.url + "/Handler/QueryHandler.ashx"
				let dwbh = this.$route.params.dwbh
				let params = new URLSearchParams()
				params.append("action", "queryjhdd")
				params.append("dwbh", dwbh)
				return new Promise((resolve,reject)=>{
					this.$http
					.post(urlstr, params)
					.then(res => {
						resolve(res)
					})
					.catch(err => {
						reject(err)
					})
				})
			},
			init() {
				this.loading = true
				this.getDeliveryDic().then(res=>{
					this.renderData = res.data.Table
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
		}
	}
</script>

<style lang="stylus" scoped>
	.delivery-wrapper
		.header-wrapper
			position fixed
			top 0
			left 0
			width 100%
			z-index 999
		.address-wrapper
			position absolute
			top 46px
			left 0
			bottom 66px
			width 100%
			.scrolllist
				height 100%
				overflow hidden
				width 100%
				.item-wrapper
					border 1px solid #eeeeee
					border-radius 5px
					padding 5px 10px
					color #000
					.card-padding 
						display: flex
						padding-left 20px
						padding-top 5px
						padding-bottom 5px
						.key
							display inline-block
							flex 0 0 20vw
						.val
							display inline-block
							flex 1
					.pt-5
						padding-top 5px
		.btn-wrapper
			position absolute
			bottom 15px
			left 15px
			right 15px
			width calc(100% - 32px)
			border 1px solid #eee
			border-radius 5px
</style>


