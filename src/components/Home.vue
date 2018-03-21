<template>
  <div class="hook">
    <button @click='btnClicked'>TEXT</button>
    <router-link :to="{path:'/dbrw'}">
      <div class="item">待办任务</div>
    </router-link>
    <router-link :to="{path:'/alert'}">
      <div class="item">Alert</div>
    </router-link>
    <router-link :to="{path:'/amap'}">
      <div class="item">AMap</div>
    </router-link>
    <router-link :to="{path:'/checkin'}">
      <div class="item">CheckIN</div>
    </router-link>
    <x-button></x-button>
    <van-cell-group>
      <van-cell title="单元格" icon="" label=""/>
    </van-cell-group>
    <cell-group>
      <cell title="单元格2" icon="location" label="描述信息" is-link></cell>
    </cell-group>  
    <van-button size="large" type='default'>大号按钮</van-button>
    <x-button size="large" type='default' disabled>大号按钮2</x-button>
  </div>
</template>


<script>
  import { Dialog } from 'vant'
  import CellGroup from '../base/cell-group/cell-group'
  import Cell from '../base/cell/cell'
  import XButton from '../base/button/button'
  export default {
    components: {
      XButton,
      Cell,
      CellGroup
    },
  	methods: {
  		btnClicked() {
        this.$toast.success('提交成功')
      //   Dialog.alert({
      //   title: '标题',
      //   message: '弹窗内容'
      // }).then(() => {
      //   // on close
      // });
      }
  	},
    mounted() {
 
    }
  }
</script>

<style lang="stylus" scoped>
  .hook
    .item
      border: 1px solid #666
      border-radius: 5px
      height: 44px
      width: 50vw
      color: black
    .van-button__text
      color blue
</style>

