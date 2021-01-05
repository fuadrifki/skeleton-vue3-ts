<template>
  <div class="font-poppins">
    <div
      class="justify-center items-center flex overflow-hidden fixed inset-0 z-20 outline-none focus:outline-none"
    >
      <div
        class="relative max-w-3xl flex flex-col justify-between bg-white rounded"
      >
        <div class="px-8 py-4 mb-2 rounded-t">
          <slot name="header" />
        </div>
        <div class="max-h-96 overflow-auto px-8">
          <slot name="content" />
        </div>
        <div
          class="items-center justify-center flex flex-row rounded-b-md text-xs bg-gray-lp-700 px-8 py-6 mt-2 border-t border-gray-300"
        >
          <div class="flex">
            <Button
              v-if="cancelText"
              type="outline"
              :title="cancelText"
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
    cancelText: {
      default: "Kembali",
      type: String,
    },
    successText: {
      default: "Simpan",
      type: String,
    },
  },
})
export default class extends Vue {}
</script>
