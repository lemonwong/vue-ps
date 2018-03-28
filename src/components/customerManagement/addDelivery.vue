<template>
	<div class="add-delivery-wrapper">
		<div class="header-wrapper">
			<nav-bar
				title="新增交货地址"
				left-arrow
				@click-left="onClickLeft"
			/>
		</div>
		<div class="cell-wrapper">
			<cell-group>
				<field
					v-model="dwbh"
					label="客户"
					disabled
				/>
				<field
					v-model="deliveryAddress"
					label="交货地点"
					icon="clear"
					placeholder="请输入交货地点"
					required
					@click-icon="deliveryAddress = ''"
				/>
				<field
					v-model="contact"
					label="联系人"
					icon="clear"
					placeholder="请输入联系人"
					required
					@click-icon="contact = ''"
				/>
				<field
					v-model="phone"
					label="固定电话"
					icon="clear"
					placeholder="请输入固话"
					required
					@click-icon="phone = ''"
				/>
				<field
					v-model="telephone"
					label="手机号"
					icon="clear"
					placeholder="请输入手机号"
					@click-icon="telephone = ''"
				/>
			</cell-group>
		</div>
		<div class="btn-wrapper">
			<x-button type="default" size='large' @click='submit'>提交</x-button>
		</div>
		<ajax-loading v-show='loading'></ajax-loading>
	</div>
</template>

<script>
	import navBar from '../../base/navbar/navbar'
	import cellGroup from '../../base/cell-group/cell-group'
	import Cell from '../../base/cell/cell'
	import Field from '../../base/field/field'
	import ajaxLoading from '../../base/loading/ajax-loading'
	import XButton from '../../base/button/button'
	import { mapGetters } from 'vuex'
	export default {
		components: {
			navBar,
			cellGroup,
			Cell,
			ajaxLoading,
			XButton,
			Field
		},
		data() {
			return {
				customer: '',
				deliveryAddress: '',
				contact: '',
				phone: '',
				telephone: '',
				dwbh: '',
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
			submit() {
				let that = this
				this.loading = true
				let urlstr = this.url + "/Handler/JhzdsaveHandler.ashx"
				let params = new URLSearchParams()
				params.append("dwbh", this.dwbh)
				params.append("jhdd", this.deliveryAddress)
				params.append("lxr", this.contact)
				params.append("sjh", this.telephone)
				params.append("tel", this.phone)
				this.$http
					.post(urlstr, params)
					.then(res => {
						this.loading = false
						if (res.data == 1) {
							this.$toast.success({ message: "已增加", duration: 1500 })
							setTimeout(()=>{
								that.$router.go(-1)
							},1500)
						} else if (res.data == 2) {
							this.$toast.fail({ message: "该地点已经存在，请勿重复添加!", duration: 1500 })
							
						} else if (res.data == -1) {
							this.$toast.fail({ message: "流水编号重复，添加失败!", duration: 1500 })
						}
					})
					.catch(err => {
						this.loading = false
						console.log(err)
					})
			}
		},
		created() {
			this.dwbh = this.$route.params.dwbh
		}
	}
</script>

<style lang="stylus" scoped>
	.add-delivery-wrapper
		.header-wrapper
			position fixed
			top 0
			left 0
			width 100%
			z-index 999
		.cell-wrapper
			position absolute
			top 46px
			left 0
			width 100%
		.btn-wrapper
			position absolute
			bottom 15px
			left 15px
			right 15px
			width calc(100% - 32px)
			border 1px solid #eee
			border-radius 5px
</style>

