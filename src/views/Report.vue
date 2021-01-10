<template>
  <div class="h-full max-h-screen overflow-auto pb-20 mt-2 pr-4">
    <Table :columns="columns" :data="listData" :isDetailable="false" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Table from "@/components/table.vue";
import { Characteristicts, Diseases } from "@/utils/Data";
import { getDataReport } from "@/utils/Cookies";

@Options({
  components: {
    Table,
  },
})
export default class DiseasesPage extends Vue {
  // Data Table
  columns = [
    {
      name: "No",
      key: "no",
      styleHead: "w-1/12 text-center whitespace-no-wrap",
      render: (item: any, index: number) => {
        return `<div class='text-center text-red-lp-200'>${index + 1}</div>`;
      },
    },
    {
      name: "Nama Pasien",
      key: "patientName",
      styleHead: "w-2/12 text-left",
      render: (item: any) => {
        return `<div class='text-black-lp-300'>${item.name}</div>`;
      },
    },
    {
      name: "Alamat",
      key: "address",
      styleHead: "w-2/12 text-left",
      render: (item: any) => {
        return `<div class='text-black-lp-300'>${item.address}</div>`;
      },
    },
    {
      name: "Usia",
      key: "age",
      styleHead: "w-2/12 text-left",
      render: (item: any) => {
        return `<div class='text-black-lp-300'>${item.age} Tahun</div>`;
      },
    },
    {
      name: "Nama Penyakit",
      key: "diseases",
      styleHead: "w-2/12 text-left",
      render: (item: any) => {
        return `<div class='text-black-lp-300'>${
          this.findDiseases(item.diseases)?.name || "-"
        }</div>`;
      },
    },
    {
      name: "Gejala",
      key: "symptoms",
      styleHead: "w-3/12 text-left",
      render: (item: any) => {
        return item.symptoms.length > 0 ? `<ol class="list-decimal">
    ${item.symptoms.map(
      (e: any) => `<li>
      ${this.findSymptoms(e)?.name}
    </li>`
    ).join("")}
  </ol>` : "-";
      },
    },
  ];

  get listData() {
    return getDataReport();
  }

  findDiseases(value: string) {
    return Diseases.find((e: any) => (e.id === value))
  }

  findSymptoms(value: string) {
    return Characteristicts.find((e: any) => (e.id === value))
  }
}
</script>
