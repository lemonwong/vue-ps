<template>
  <cell
    :title="label"
    :center="center"
    :required="required"
    class="van-field"
    :class="{
      'van-field--disabled': $attrs.disabled,
      'van-field--error': error,
      'van-field--min-height': type === 'textarea' && !autosize,
      'van-field--has-icon': hasIcon
    }"
  >
    <textarea
      v-if="type === 'textarea'"
      v-bind="$attrs"
      v-on="listeners"
      ref="textarea"
      class="van-field__control"
      :value="value"
    />
    <input
      v-else
      v-bind="$attrs"
      v-on="listeners"
      class="van-field__control"
      :type="type"
      :value="value"
    >
    <div
      v-if="errorMessage"
      v-text="errorMessage"
      class="van-field__error-message"
    />
    <div
      v-if="hasIcon"
      v-show="$slots.icon || value"
      class="van-field__icon"
      @touchstart.prevent="onClickIcon"
    >
      <slot name="icon">
        <icon :name="icon" />
      </slot>
    </div>
    <div class="van-field__button" v-if="$slots.button" slot="extra">
      <slot name="button" />
    </div>
  </cell>
</template>

<script>
import create from 'vant/lib/utils/create'
import { isObj } from 'vant/lib/utils'

export default create({
  name: 'field',

  inheritAttrs: false,

  props: {
    type: {
      type: String,
      default: 'text'
    },
    value: {},
    icon: String,
    label: String,
    error: Boolean,
    center: Boolean,
    border: Boolean,
    required: Boolean,
    autosize: [Boolean, Object],
    errorMessage: String,
    onIconClick: {
      type: Function,
      default: () => {}
    }
  },

  watch: {
    value() {
      this.$nextTick(this.adjustSize);
    }
  },

  mounted() {
    this.$nextTick(this.adjustSize);
  },

  computed: {
    hasIcon() {
      return this.$slots.icon || this.icon;
    },

    listeners() {
      return {
        ...this.$listeners,
        input: this.onInput,
        keypress: this.onKeypress
      };
    }
  },

  methods: {
    onInput(event) {
      this.$emit('input', event.target.value);
    },

    onClickIcon() {
      this.$emit('click-icon');
      this.onIconClick();
    },

    onKeypress(event) {
      if (this.type === 'number') {
        const { keyCode } = event;
        const allowPoint = this.value.indexOf('.') === -1;
        const isValidKey = (keyCode >= 48 && keyCode <= 57) || (keyCode === 46 && allowPoint);
        if (!isValidKey) {
          event.preventDefault();
        }
      }
      this.$emit('keypress', event);
    },

    adjustSize() {
      if (!(this.type === 'textarea' && this.autosize)) {
        return;
      }

      const el = this.$refs.textarea;
      if (!el) {
        return;
      }

      el.style.height = 'auto';

      let height = el.scrollHeight;
      if (isObj(this.autosize)) {
        const { maxHeight, minHeight } = this.autosize;
        if (maxHeight) {
          height = Math.min(height, maxHeight);
        }
        if (minHeight) {
          height = Math.max(height, minHeight);
        }
      }

      if (height) {
        el.style.height = height + 'px';
      }
    }
  }
});
</script>