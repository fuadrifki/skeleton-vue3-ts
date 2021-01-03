<template>
  <button
    @click="() => onClick()"
    :class="`${
      type === 'fill'
        ? 'bg-blue-600 hover:bg-blue-800 hover:text-blue-100 text-white'
        : 'bg-white hover:bg-gray-400 hover:text-white hover:border-white text-blue-700 border border-blue-700 rounded'
    } w-full text-12px py-1.5 px-4 rounded focus:outline-none`"
    :disabled="isDisable"
  >
    {{ title }}
  </button>
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
    title: {
      default: "",
      type: String,
    },
    type: {
      default: "fill",
      type: String,
    },
    onClick: {
      default: Function as PropType<() => void>,
      type: Function,
    },
  },
})
export default class Button extends Vue {}
</script>
