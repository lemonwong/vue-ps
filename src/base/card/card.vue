<template>
	<div class="card-wrapper" @click="select">
		<div>
			<div class="title-wrapper" v-if='title'>
				<span class="title">{{title}}</span>
				<slot name='title-right' class="title-right"></slot>
			</div>
			<div class="content-wrapper">
				<slot name="content"></slot>
			</div>
		</div>
		<div class="bottom" v-show="bottom">
			<!-- slot插槽的点击事件只能写在引用Card的组件内部，无法监听slot插槽的点击事件 -->
			<slot name='left' class="bottom-left"></slot>
			<slot name='middle' class="bottom-middle"></slot>
			<slot name='right' class="bottom-right"></slot>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				default: function() {
					return {}
				}
			},
			title: {
				type: String,
				default: ''
			},
			bottom: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			select() {
				let payload = this.item
				this.$emit('card-select', payload)
			}
		}
	}
</script>

<style lang="stylus" scoped>
	@import '../../common/stylus/variable'

	.card-wrapper
		position relative
		margin: 10px 8px 10px 8px
		min-height: 100px
		border-radius: 5px
		background-color: #fff
		// box-shadow: 2px 2px 1px #888888
		.title-wrapper
			display inline-flex
			width 100%
			padding-top: 8px
			padding-bottom: 8px			
			border-bottom: 1px solid #ccc
			font-size: $font-size-medium-x
			font-weight: bold
			color: #000
			.title
				flex 1
				padding-left: 20px
				padding-right: 8px
				font-weight: bold
			.title-right
				flex 0 0 40px
				padding-right 15px
		.content-wrapper
			margin-left: 16px
			margin-right: 8px
			p
				padding-top: 8px
				padding-bottom: 8px
				font-size: $font-size-text
				color: black
		.bottom
			display: inline-flex
			justify-content: space-around
			width: 100%
			height: 40px
			border-top: 1px solid #d8c5e7
			line-height: 40px
			font-size: $font-size-text
			color: $color-tab-deactive-text
			.bottom-left
				flex: 1
				height: 100%
				text-align: left
			.bottom-middle
				flex: 1
				height: 100%
				text-align: center
			.bottom-right
				flex: 1
				height: 100%
				text-align: right
</style>


