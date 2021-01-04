<template>
  <div class="h-full max-h-screen overflow-auto pb-20 mt-2 pr-4">
    <Table :columns="columns" :data="listData" :isDetailable="false" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Table from "@/components/table.vue";
import { Rule } from "@/utils/Data";

@Options({
  components: {
    Table,
  },
})
export default class RulePage extends Vue {
  // Data Table
  columns = [
    {
      name: "No",
      key: "no",
      styleHead: "w-1/12 text-left whitespace-no-wrap",
      styleBody: "text-red-lp-200",
      render: (item: any, index: number) => {
        return `<span class='text-center text-red-600'>${index + 1}</span>`;
      },
    },
    {
      name: "Nama Penyakit",
      key: "name",
      styleHead: "w-auto text-left",
      styleBody: "text-left rounded px-2 py-0",
      render: (item: any) => {
        return `<div class='text-left text-gray-700'>${item.name}</div>`;
      },
    },
    {
      name: "Jawaban Benar",
      key: "isTrue",
      styleHead: "w-2/12 text-center",
      styleBody: "text-left rounded px-2 py-0",
      render: (item: any) => {
        return `<div class='text-center text-gray-700'>${item.isTrue}</div>`;
      },
    },
    {
      name: "Jawaban Salah",
      key: "isFalse",
      styleHead: "w-2/12 text-center",
      styleBody: "text-left rounded px-2 py-0",
      render: (item: any) => {
        return `<div class='text-center text-gray-700'>${item.isFalse}</div>`;
      },
    },
  ];

  get listData() {
    return Rule;
  }
}
</script>
