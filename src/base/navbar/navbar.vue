<template>
  <div
    class="van-nav-bar van-hairline--bottom"
    :class="{ 'van-nav-bar--fixed': fixed }"
    :style="style"
  >
    <div class="van-nav-bar__left" @click="$emit('click-left')">
      <slot name="left">
        <span v-if="leftArrow" class="icon-back" name="arrow" />
        <span v-if="leftText" v-text="leftText" class="van-nav-bar__text" />
      </slot>
    </div>
    <div class="van-nav-bar__title">
      <slot name="title">{{ title }}</slot>
    </div>
    <div class="van-nav-bar__right" @click="$emit('click-right')">
      <slot name="right">
        <span v-if="rightText" v-text="rightText" class="van-nav-bar__text" />
      </slot>
    </div>
  </div>
</template>

<script>
import create from 'vant/lib/utils/create'

export default create({
  name: 'nav-bar',

  props: {
    title: String,
    leftText: String,
    rightText: String,
    leftArrow: Boolean,
    fixed: Boolean,
    zIndex: {
      type: Number,
      default: 999
    }
  },

  computed: {
    style() {
      return {
        zIndex: this.zIndex
      };
    }
  }
});
</script>

<style>

.van-nav-bar{
	color:#eee;
	background-color: #0073c6
}
.van-nav-bar__text{
	color:#eee 
}
.van-icon{
	color:#eee !important
}
</style>
