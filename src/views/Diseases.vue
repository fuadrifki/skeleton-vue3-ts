<template>
  <div class="h-full max-h-screen overflow-auto pb-20 mt-2 pr-4">
    <Table :columns="columns" :data="listData" :isDetailable="false" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Table from "@/components/table.vue";
import { Diseases } from "@/utils/Data";

@Options({
  components: {
    Table,
  },
})
export default class Rule extends Vue {
  // Data Table
  columns = [
    {
      name: "No",
      key: "no",
      styleHead: "w-1/12 text-left whitespace-no-wrap",
      styleBody: "text-red-lp-200",
      render: (item: any, index: number) => {
        return `<span class='text-center text-red-lp-200'>${index + 1}</span>`;
      },
    },
    {
      name: "Nama Penyakit",
      key: "name",
      styleHead: "w-auto text-left",
      styleBody: "text-left rounded px-2 py-0",
      render: (item: any) => {
        return `<div class='flex text-black-lp-300'>${item.name}</div>`;
      },
    },
  ];

  get listData() {
    return Diseases;
  }
}
</script>
