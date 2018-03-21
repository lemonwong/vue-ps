<template>
  <component
    :is="tag"
    :type="nativeType"
    :disabled="disabled"
    class="van-button"
    :class="[
      'van-button--' + type,
      'van-button--' + size,
      {
        'van-button--disabled': disabled,
        'van-button--loading': loading,
        'van-button--block': block,
        'van-button--bottom-action': bottomAction
      }
    ]"
    @click="onClick"
  >
    <loading v-if="loading" size="20px" :color="type === 'default' ? 'black' : 'white'" />
    <span class="van-button__text">
      <slot>{{ text }}</slot>
    </span>
  </component>
</template>

<script>
import create from 'vant/lib/utils/create'

export default create({
  props: {
    text: String,
    block: Boolean,
    loading: Boolean,
    disabled: Boolean,
    nativeType: String,
    bottomAction: Boolean,
    tag: {
      type: String,
      default: 'button'
    },
    type: {
      type: String,
      default: 'default'
    },
    size: {
      type: String,
      default: 'normal'
    }
  },

  methods: {
    onClick(event) {
      if (!this.loading && !this.disabled) {
        this.$emit('click', event);
      }
    }
  }
});
</script>

<style>
.van-button__text{
	color:#FFFFFF
}
.van-button::before{
	background-color: #0066cc
}
.van-button--default {
	color: #FFFFFF;
	background-color: #0073C6;
	border: 1px solid #e5e5e5
}
.van-button--disabled {
	color: #F5F5F5;
	background-color: #cecece;
	border: 1px solid #ccc;
}
</style>
