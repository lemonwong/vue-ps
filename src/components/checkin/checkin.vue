<template>
	<div class="checkin-wrapper">
		<div class="header-wrapper">
			<x-header title='移动签到'></x-header>
		</div>
		<div class="amap-wrapper">
			<amap @map-loaded='mapComplete' @geo-complete='geoComplete'></amap>
		</div>
		<div class="address-wrapper">
			<cell-group>
				<cell :title='address' icon="location"></cell>
			</cell-group>
		</div>
		<div class="btns-wrapper">
			<div class="left-btn">
				<x-button size="large" :disabled='btn1' @click='btnClick'>签到</x-button>
			</div>
			<div class="right-btn">
				<x-button size="large" :disabled='btn2' @click='btnClick'>签退</x-button>
			</div>
		</div>
		<div class="history-wrapper">
			<h3 class="title">今日打卡记录</h3>
			<scroll :data='signHistory' ref='historyscroll' class="history-scroll">
				<ul class="ul-wrapper">
					<li class="item" v-for='(item,index) in signHistory' :key='index'>
						<div class="left">打卡:</div>
						<div class="mid">{{parseTime(item.APPYDQD_TIME)}}</div>
						<div class="right">{{item.APPYDQD_ADDR}}</div>
					</li>
				</ul>
			</scroll>
		</div>
		<ajax-loading v-show='loading' :text='text'></ajax-loading>
	</div>
</template>

<script>
	import XHeader from '../../base/xheader/xheader'
	import amap from '../amap/amap'
	import ajaxLoading from '../../base/loading/ajax-loading'
	import Cell from '../../base/cell/cell'
	import CellGroup from '../../base/cell-group/cell-group'
	import XButton from '../../base/button/button'
	import Scroll from '../../base/scroll/scroll'
	import {formatDate} from '../../common/helpers/date'
	import {mapGetters} from 'vuex'
	export default {
		components: {
			XHeader,
			amap,
			ajaxLoading,
			Cell,
			CellGroup,
			XButton,
			Scroll
		},
		data() {
			return {
				loading: true,
				text: '地图加载中...',
				address: '系统正在进行位置定位，请稍等...',
				lng: 0,
				lat: 0,
				signHistory: [],
				btn1: true,
				btn2: true
			}
		},
		computed: {
			...mapGetters(['url'])
		},
		methods: {
			mapComplete() {
				this.text = '系统定位中...'
			},
			parseTime(checkinTime) {
				return (
					checkinTime.substr(0, 2) +
					":" +
					checkinTime.substr(2, 2) +
					":" +
					checkinTime.substr(4, 2)
				)
			},
			geoComplete(payload) {
				this.lng = payload.lng
				this.lat = payload.lat
				this.address = payload.address
				this.loading = false
			},
			initBtnStatus() {
				let vsNow = new Date()
				let hours = vsNow.getHours()
				this.btn1 = hours > 12 ? true : false
				this.btn2 = hours > 12 ? false : true
			},
			getHistoryData() {
				let suburl = this.url + '/Handler/QueryHandler.ashx'
				let params = new URLSearchParams()
				let czybh = localStorage.getItem('CZYBH')||'0001'
				let curDate = formatDate(new Date(),'yyyyMMdd')
				params.append("action", "queryydqd")
				params.append("czybh", czybh)
				params.append("date", curDate)
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
				this.getHistoryData()
				.then(res=>{
					this.signHistory = res.data.Table
					this.initBtnStatus()
				})
				.catch(err=>{
					console.log(err)
				})
			},
			submit() {
				let czybh = localStorage.getItem("CZYBH") || '0001'
				let zgbh = localStorage.getItem("ZGBH") || '000001'
				let urlstr = this.url + "/Handler/ydqdsave.ashx"
				let params = new URLSearchParams()
				params.append("czybh", czybh)
				params.append("zgbh", zgbh)
				params.append("longitude", this.lng)
				params.append("latitude", this.lat)
				params.append("addr", this.address)
				return new Promise((resolve,reject)=>{
					this.$http.post(urlstr,params)
					.then(res=>{
						resolve(res)
					})
					.catch(err=>{
						reject(err)
					})
				})
			},
			btnClick() {
				this.submit().then(res=>{
					if(res.data === 1) {
						this.$toast.success('提交成功')
						setTimeout(()=>{
							this.text = '刷新中...'
							this.loading = true
							this.init()
							this.$nextTick(()=>{
								this.loading = false
							},20)
						},3000)
					} 
				})
			}
		},
		mounted() {
			this.init()
		}
	}
</script>

<style lang="stylus" scoped>
	.checkin-wrapper
		position relative
		.header-wrapper
			position fixed
			top 0
			left 0
			width 100%
			height 46px
			z-index 999
		.amap-wrapper
			position absolute
			top 46px
			left 0
			width 100%
			height 250px
		.address-wrapper
			position absolute
			top 296px
			left 0
			width 100%
		.btns-wrapper
			position absolute			
			padding 3px 0
			top 345px
			left 0
			width 100%
			.left-btn
				display inline-block
				padding 0 3%
				width 43%
			.right-btn
				display inline-block
				padding 0 3%
				width 43%
		.history-wrapper
			position absolute
			top 400px
			width 100vw
			height calc(100vh - 400px)
			left 0
			.title
				padding 8px 8px
				color #000000
				font-weight bold
			.history-scroll
				height calc(100vh - 432px)
				width 100%
			.ul-wrapper
				.item
					display flex
					line-height 30px
					padding 3px 5px
					color #000
					.left
						padding-left 5px
						flex 0 0 10%
					.mid
						flex 0 0 20%
					.right
						flex: 1
</style>



