<template>
  <div class="w-full flex flex-col">
    <input
      :type="type.toLowerCase().includes('password') ? 'password' : 'text'"
      :placeholder="placeholder"
      @input="onChange($event)"
      @keyup.enter="onSubmit"
      :class="`${
        capitalize && 'capitalize'
      } w-full text-12px py-1.5 px-4 text-gray-900 border border-gray-300 rounded focus:outline-none`"
      :maxlength="maxLength"
    />
    <div v-show="isError" class="mt-2 text-12px px-4 text-red-600">
      {{ errorText }}
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { PropType } from "vue";
import { NumberOnly } from "@/utils/Library";

@Options({
  props: {
    isDisable: {
      default: false,
      type: Boolean,
    },
    placeholder: {
      default: "",
      type: String,
    },
    isError: {
      default: false,
      type: Boolean,
    },
    capitalize: {
      default: false,
      type: Boolean,
    },
    numberOnly: {
      default: false,
      type: Boolean,
    },
    errorText: {
      default: "",
      type: String,
    },
    type: {
      default: "",
      type: String,
    },
    modelValue: {
      required: true,
    },
    maxLength: {
      default: 255,
      type: Number,
    },
    onSubmit: {
      default: Function as PropType<() => void>,
      type: Function,
    },
  },
})
export default class Input extends Vue {
  props: any = this.$props;

  onChange(e: any) {
    if (this.props.numberOnly) {
      e.target.value = NumberOnly(e.target.value);
      this.$emit("update:modelValue", e.target.value);
    } else this.$emit("update:modelValue", e.target.value);
  }
}
</script>
