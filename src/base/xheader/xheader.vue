<template>
	<div class="header">
		<div class="header-left-wrapper" @click="onClickBack">
			<div class="left-arrow-wrapper" v-if="showBack">
				<span class="icon-back"></span>
			</div>
		</div>
		<div class="header-title-wrapper">
			<h3 class="header-title">
				<span>{{title}}</span>
			</h3>
		</div>
		<div class="header-right-wrapper" @click="onClickRight">
			<div class="header-right" v-if="showRightBtn">
				<slot name="right-icon">
					<span class="icon-back"></span>
				</slot>
			</div>
		</div>
		<div class="header-right-wrapper" @click="onClickMore" v-if="showRightBtn && showMore ">
			<div class="header-right">
				<slot name="showMore-icon">
					<span class="icon-back"></span>
				</slot>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			showBack: {
				type: Boolean,
				default: true
			},
			preventGoBack: {
				type: Boolean,
				default: false
			},
			title: {
				type: String,
				default: ''
			},
			showRightBtn: {
				type: Boolean,
				default: false
			},
			showMore: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			onClickBack() {
				if (this.preventGoBack) {
					this.$emit('back-click')
				} else {
					this.$router ? this.$router.back() : window.history.back()
				}
			},
			onClickRight() {
				this.$emit('right-click')
			},
			onClickMore() {
				this.$emit('more-click')
			}
		}
	}
</script>

<style lang="stylus" scoped>
	@import '../../common/stylus/variable'

	.header
		height: 44px
		width: 100%
		display: inline-flex
		background-color: $color-background-header
		.header-left-wrapper
			flex: 0 0 44px
			height: 20px
			position: relative
			.left-arrow-wrapper
				position: absolute
				height: 20px
				width: 20px
				top: 12px
				left: 12px
		.header-title-wrapper
			flex: 1
			height: 20px
			position: relative
			text-align: center
			.header-title
				width: 100%
				position: absolute
				height: 20px
				line-height: 20px
				top: 12px
				text-align: center
				overflow: hidden
				text-overflow: ellipsis
		.header-right-wrapper
			flex: 0 0 44px
			height: 20px
			position: relative
			.header-right
				position: absolute
				height: 20px
				line-height: 20px
				top: 12px
				text-align: center
</style>