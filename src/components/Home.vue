<template>
  <div class="hook">
    <button @click='btnClicked'>TEXT</button>
    <router-link :to="{path:'/dbrw'}">
      <div class="item">待办任务</div>
    </router-link>
    <router-link :to="{path:'/alert'}">
      <div class="item">Alert</div>
    </router-link>
  </div>
</template>


<script>
  export default {
  	methods: {
  		btnClicked() {}
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
</style>

