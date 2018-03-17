<template>
	<div class="tab-wrapper">
		<template v-for='(item,index) in tabItems'>
			<p class="tab-item" :class="{'select':currentIndex===item.index}" @click='select(item.index)'>{{item.text}}</p>
		</template>

	</div>
</template>

<script>
	export default {
		props: {
			tabItems: {
				/** 数据格式
				 *	tabItems: [
				 *		{ index: 4, text: '单据详情' },
				 *		{ index: 1, text: '审批路线' },
				 *		{ index: 5, text: '龙战于野' }
				 *	]
				 */
				type: Array,
				default() {
					return []
				}
			}
		},
		data() {
			return {
				currentIndex: 0
			}
		},
		methods: {
			select(index) {
				this.currentIndex = index
				this.$emit('tab-select', index)
			}
		},
		created() {
			if (this.tabItems.length) {
				this.currentIndex = this.tabItems[0].index
			}
		},
		mounted() {}
	}
</script>

<style lang="stylus" scoped>
	@import '../../common/stylus/variable'

	.tab-wrapper
		display: inline-flex
		width: calc(100% - 60px)
		margin: 0 30px
		height: 40px
		border-radius: 5px
		.tab-item
			flex: 1
			align-items: center
			height: 100%
			line-height: 40px
			text-align: center
			color: $color-tab-deactive-text
			background-color: #FFF
			&:first-child
				border-bottom-left-radius: 5px
				border-top-left-radius: 5px
			&:last-child
				border-bottom-right-radius: 5px
				border-top-right-radius: 5px
		.select
			color: #FFF
			background-color: $color-tab-active-bgcolor
</style>


