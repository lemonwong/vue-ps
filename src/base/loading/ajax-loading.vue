<template>
	<div class="modal">
		<div class="loading-wrapper">
			<looping-rhombuses-spinner :rhombus-size="15" color="#0073c6" class="loading"/>
			<span class="text">{{text}}</span>
		</div>
	</div>
</template>

<script>
	import { LoopingRhombusesSpinner } from 'epic-spinners'
	export default {
		props: {
			text: {
				type: String,
				default: '加载中...'
			}
		},
		components: {
			LoopingRhombusesSpinner
		}
	}
</script>

<style lang="stylus" scoped>
	.modal
		position: relative
		top: 46px
		width: 100vw
		height: calc(100vh - 46px)
		z-index: 99
		background-color: rgba(0, 0, 0, 0.3)
		.loading-wrapper
			z-index: 99
			position: absolute
			width: 100px
			height: 80px
			top: calc((100vh - 46px) / 2 - 40px)
			left: calc(50vw - 50px)
			background-color: rgba(255, 255, 255, 0)
			transform: translateY(-50%)
			.loading
				margin 0 30px 0 10px
			.text
				display: block
				text-align center
				color: #000
				margin-top: 8px
				width: 100px
</style>


