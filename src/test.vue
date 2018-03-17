<template>
	<div>
		<!-- <tab :tabItems='tabItems' @tab-select='select'></tab> -->
		<xheader title="已办任务" @more-click="test">
			<span slot="right-icon" class="icon-prev"></span>
		</xheader>
		<scroll ref='scroll' :data='arr' :options="options" @pulling-down="onPullingDown" @pulling-up="onPullingUp">
			<card v-for="(item,index) in arr" :item="item" @card-select="select" :key="index" :title="item.bt[0]['单据名称']" :bottom=true>
				<div slot="content">
					<p v-for="(val,key,index) in item.mx[0]">{{key}} : {{val}}</p>
				</div>
				<div slot="left" @click.stop='clickLeft'>查看交货地址</div>
				<!-- <div slot="middle">我是中间的</div> -->
				<div slot="right" @click='clickRight'>我是右边的</div>
			</card>
		</scroll>
	</div>
</template>

<script>
	import Card from '@/base/card/card'
	import Xheader from '@/base/xheader/xheader'
	import Scroll from '@/base/scroll/scroll'
	import Tab from '@/base/tab/tab'
	export default {
		components: {
			Card,
			Xheader,
			Scroll,
			Tab
		},
		data() {
			return {
				arr: [
					{
						bt: [{ 单据名称: '采购计划', YWID: 'CGJH', DJLS: '12' }],
						mx: [
							{
								单据流水: '12',
								审批状态: '正在审批',
								提交人员: 'Test01',
								提交日期: '20180125'
							}
						]
					},
					{
						bt: [{ 单据名称: '采购计划', YWID: 'CGJH', DJLS: '13' }],
						mx: [
							{
								单据流水: '13',
								审批状态: '正在审批',
								提交人员: 'Test01',
								提交日期: '20180125'
							}
						]
					},
					{
						bt: [{ 单据名称: '采购请购单', YWID: 'CGQGD', DJLS: '15' }],
						mx: [
							{
								单据流水: '15',
								审批状态: '正在审批',
								提交人员: 'Test01',
								提交日期: '20180125'
							}
						]
					},
					{
						bt: [{ 单据名称: '采购请购单', YWID: 'CGQGD', DJLS: '16' }],
						mx: [
							{
								单据流水: '16',
								审批状态: '正在审批',
								提交人员: 'Test01',
								提交日期: '20180125'
							}
						]
					},
					{
						bt: [{ 单据名称: '采购请购单', YWID: 'CGQGD', DJLS: '17' }],
						mx: [
							{
								单据流水: '17',
								审批状态: '正在审批',
								提交人员: 'Test01',
								提交日期: '20180125'
							}
						]
					},
					{
						bt: [{ 单据名称: '生产入库单', YWID: 'SCRKD', DJLS: '68' }],
						mx: [
							{
								单据流水: '68',
								审批状态: '正在审批',
								提交人员: 'Test01',
								提交日期: '20180125'
							}
						]
					},
					{
						bt: [{ 单据名称: '生产入库单', YWID: 'SCRKD', DJLS: '70' }],
						mx: [
							{
								单据流水: '70',
								审批状态: '正在审批',
								提交人员: 'Test01',
								提交日期: '20180125'
							}
						]
					},
					{
						bt: [{ 单据名称: '生产入库单', YWID: 'SCRKD', DJLS: '72' }],
						mx: [
							{
								单据流水: '72',
								审批状态: '正在审批',
								提交人员: 'Test01',
								提交日期: '20180125'
							}
						]
					}
				],
				tabItems: [
					{ index: 4, text: '单据详情' },
					{ index: 1, text: '审批路线' },
					{ index: 5, text: '龙战于野' }
				],
				options: {
					pullDownRefresh: {
						threshold: 90,
						stop: 40,
						txt: 'Refresh success'
					},
					pullUpLoad: {
						threshold: 0,
						txt: {
							more: 'Load more',
							noMore: 'No more data'
						}
					}
				}
			}
		},
		methods: {
			onPullingDown() {
				// 模拟更新数据
				setTimeout(() => {
					if (Math.random() > 0.5) {
						// 如果有新数据
						this.items.unshift('I am new data: ' + +new Date())
					} else {
						// 如果没有新数据
						this.$refs.scroll.forceUpdate()
					}
				}, 1000)
			},
			onPullingUp() {
				// 更新数据
				setTimeout(() => {
					if (Math.random() > 0.5) {
						// 如果有新数据
						let newPage = [
							'I am line ' + ++this.itemIndex,
							'I am line ' + ++this.itemIndex,
							'I am line ' + ++this.itemIndex,
							'I am line ' + ++this.itemIndex,
							'I am line ' + ++this.itemIndex
						]

						this.items = this.items.concat(newPage)
					} else {
						// 如果没有新数据
						this.$refs.scroll.forceUpdate()
					}
				}, 1000)
			},
			select(val) {
				alert(val)
			},
			test() {
				alert(123)
			},
			clickLeft() {
				alert('left-clicked')
			},
			clickRight() {
				alert('right-clicked')
			}
		},
		mounted() {
			this.$refs.scroll.refresh()
		}
	}
</script>

<style lang="stylus" scoped>
</style>


