<template>
	<div id="app">
		<keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
	</div>
</template>

<script>
	export default {
		name: 'App'
	}
</script>

<style>
	.van-dialog__message--withtitle{
		color:#000;
	}
	.van-dialog__message{
		color:#000;
	}
</style>
