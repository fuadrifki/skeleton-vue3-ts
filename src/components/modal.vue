<template>
  <div class="font-poppins">
    <div
      class="justify-center items-center flex overflow-hidden fixed inset-0 z-20 outline-none focus:outline-none"
    >
      <div
        class="relative max-w-3xl max-h-xl flex flex-col justify-between bg-white rounded p-8"
      >
        <slot name="content"></slot>
        <div
          class="items-center justify-center flex flex-row rounded-b-md text-xs bg-gray-lp-700 mt-4"
        >
          <div class="flex">
            <Button
              type="outline"
              title="Kembali"
              @click="onClose"
              class="mr-2"
            />
          </div>
          <div class="flex">
            <Button :title="successText" @click="onSubmit" class="ml-2" />
          </div>
        </div>
      </div>
    </div>
    <div class="opacity-75 fixed inset-0 z-10 bg-black" />
  </div>
</template>

<script lang="ts">
import { PropType } from "vue";
import { Vue, Options } from "vue-class-component";
import Button from "@/components/button.vue";

@Options({
  components: {
    Button,
  },
  props: {
    onClose: {
      default: Function as PropType<() => void>,
      type: Function,
    },
    onSubmit: {
      default: Function as PropType<() => void>,
      type: Function,
    },
    successText: {
      default: "Simpan",
      type: String,
    },
  },
})
export default class extends Vue {}
</script>