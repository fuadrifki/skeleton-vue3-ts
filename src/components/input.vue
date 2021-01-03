<template>
  <div class="w-full flex flex-col">
    <input
      :type="type.toLowerCase().includes('password') ? 'password' : 'text'"
      :placeholder="placeholder"
      @input="(e) => onChange(e)"
      class="w-full text-12px py-1.5 px-4 text-gray-900 border border-gray-300 rounded focus:outline-none"
    />
    <div v-show="isError" class="mt-2 text-12px px-4 text-red-600">{{ errorText }}</div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { PropType } from "vue";

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
    errorText: {
      default: "",
      type: String,
    },
    type: {
      default: "",
      type: String,
    },
    onChange: {
      default: Function as PropType<() => void>,
      type: Function,
    },
  },
})
export default class Input extends Vue {}
</script>
