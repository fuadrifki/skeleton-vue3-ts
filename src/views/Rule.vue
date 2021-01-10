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
      name: "Kode",
      key: "name",
      styleHead: "w-2/12 text-center",
      render: (item: any) => {
        return `<div class='text-center ${
          item.id.toLowerCase().includes("dis")
            ? "text-green-600"
            : "text-blue-600"
        }'>${item.id}</div>`;
      },
    },
    {
      name: "Nama Penyakit",
      key: "name",
      styleHead: "w-auto text-left",
      render: (item: any) => {
        return `<div class='text-left text-gray-700'>${item.name}</div>`;
      },
    },
    {
      name: "Jawaban Benar",
      key: "isTrue",
      styleHead: "w-2/12 text-center",
      render: (item: any) => {
        return `<div class='text-center ${
          item.isTrue.toLowerCase().includes("end")
            ? "text-red-600 font-semibold"
            : item.isTrue.toLowerCase().includes("dis")
            ? "text-green-600"
            : "text-blue-600"
        }'>${item.isTrue}</div>`;
      },
    },
    {
      name: "Jawaban Salah",
      key: "isFalse",
      styleHead: "w-2/12 text-center",
      render: (item: any) => {
        return `<div class='text-center ${
          item.isFalse.toLowerCase().includes("end")
            ? "text-red-600 font-semibold"
            : item.isFalse.toLowerCase().includes("dis")
            ? "text-green-600"
            : "text-blue-600"
        }'>${item.isFalse}</div>`;
      },
    },
  ];

  get listData() {
    return Rule;
  }
}
</script>
