<template>
	<div class="clientDetail-wrapper">
		<div class="header-wrapper">
			<nav-bar
				title="更多信息"
				left-arrow
				@click-left="onClickLeft"
			/>
		</div>
		<div class="content-wrapper" v-if='detailInfo.length>0'>
			<div class="basic-wrapper">
				<p class="title">基本信息</p>
        <p class="first">
          <span class="left">单位编号 : </span>
          <span class="right">{{detailInfo[0].F_DWBH}}</span>
        </p>
        <p>
          <span class="left">单位名称 : </span>
          <span class="right">{{detailInfo[0].F_DWMC}}</span>
        </p>
        <p>
          <span class="left">联系人姓名 : </span>
          <span class="right">{{detailInfo[0].F_LXR}}</span>
        </p>
        <p>
          <span class="left">联系人电话 : </span>
          <span class="right lxr">{{detailInfo[0].F_TELE}}</span>
        </p>
        <p class="last">
          <span class="left">地址 : </span>
          <span class="right">{{detailInfo[0].F_ADDR}}</span>
        </p>
			</div>
			<div class="wldw-wrapper">
				<p class="title">往来信息</p>
        <p class="first">
          <span class="left">资信限额 : </span>
          <span class="right">{{numberLocaled(detailInfo[0].F_ZXXE)}}元</span>
        </p>
        <p>
          <span class="left">付款期限 : </span>
          <span class="right">{{numberLocaled(detailInfo[0].F_FKQX)}}</span>
        </p>
        <p>
          <span class="left">预收余额 : </span>
          <span class="right">{{numberLocaled(detailInfo[0].F_BBYUYE)}}元</span>
        </p>
        <p>
          <span class="left">应收余额 : </span>
          <span class="right">{{numberLocaled(detailInfo[0].F_BBYSYE)}}元</span>
        </p>
        <p>
          <span class="left">在途余额 : </span>
          <span class="right">{{numberLocaled(detailInfo[0].F_BBZTYE)}}元</span>
        </p>
        <p class="last">
          <span class="left">欠款余额 : </span>
          <span class="right">{{numberLocaled(detailInfo[0].F_QKYE)}}元</span>
        </p>
			</div>
		</div>
		<ajax-loading v-show='loading'></ajax-loading>
	</div>
</template>

<script>
	import navBar from '../../base/navbar/navbar'
	import cellGroup from '../../base/cell-group/cell-group'
	import Cell from '../../base/cell/cell'
	import ajaxLoading from '../../base/loading/ajax-loading'
	import { mapGetters } from 'vuex'
	export default {
		components: {
			navBar,
			cellGroup,
			Cell,
			ajaxLoading
		},
		data() {
			return {
				detailInfo: [],
				loading: false
			}
		},
		computed: {
			...mapGetters(['url'])
		},
		methods: {
			onClickLeft() {
				this.$router.go(-1)
			},
			numberLocaled(val) {
  			return Number(val).toLocaleString()
			},
			getDetailInfo() {
				this.loading = true
  			let urlstr = this.url + "/Handler/query.ashx"
  			let dwbh = this.$route.params.dwbh
  			let params = new URLSearchParams()
  			params.append("action", "customerDetail")
  			params.append("as_dwbh", dwbh)
  			this.$http
  				.post(urlstr, params)
  				.then(res => {
  					if (res.data.customerDetail.length > 0) {
							this.detailInfo = res.data.customerDetail
							this.loading = false
  					}
  				})
  				.catch(err => {
						this.loading = false
  					console.log(err)
  				})
  		}
		},
		mounted() {
			this.getDetailInfo()
		},
		beforeDestroy() {
			this.loading = false
		}
	}
</script>

<style lang="stylus" scoped>
	@import '../../common/stylus/variable.styl'
	.clientDetail-wrapper
		.header-wrapper
			position fixed
			top 0
			left 0
			width 100%
			z-index 999
		.content-wrapper
			position absolute
			padding 5px 5px
			top 46px
			left 0
			width calc(100% - 10px)
			bottom 0
			background-color $color-background
			.basic-wrapper
				color #000
				width 100%
				background-color #fff
				border-radius 3px
				margin-bottom 15px
				padding-bottom 15px
				border-bottom none
				p
					padding 3px 10px
					min-height 20px
					line-height 20px
					display flex
				.title
					font-size 14px
					border-bottom 1px solid #ccc
					padding-top 5px
					padding-bottom 5px
				.first
					margin-top 8px
				.left 
					display inline-flex
					flex 0 0 28vw
					vertical-align top
					padding-left 5vw
				.lxr 
					color: blue
					text-decoration underline
				.right 
					display inline-flex
					flex 1
					max-width 55vw
					vertical-align top
					padding-left 2vw
			.wldw-wrapper
				color #000
				width 100%
				background-color #fff
				border-radius 3px
				margin-bottom 15px
				padding-bottom 15px
				border-bottom none
				p
					padding 3px 10px
					min-height 20px
					line-height 20px
					display flex
				.title
					font-size 14px
					border-bottom 1px solid #ccc
					padding-top 5px
					padding-bottom 5px
				.first
					margin-top 8px
				.left 
					display inline-flex
					flex 0 0 28vw
					vertical-align top
					padding-left 5vw
				.right 
					display inline-flex
					flex 1
					max-width 55vw
					vertical-align top
					padding-left 2vw
</style>


