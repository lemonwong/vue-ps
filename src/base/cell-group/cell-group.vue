<template>
  <div class="van-cell-group" :class="{ 'van-hairline--top-bottom': border }">
    <slot />
  </div>
</template>

<script>
import create from 'vant/lib/utils/create'
import 'vant/lib/vant-css/base.css'
import 'vant/lib/vant-css/cell.css'

export default create({
  props: {
    border: {
      type: Boolean,
      default: true
    }
  }
})
</script>