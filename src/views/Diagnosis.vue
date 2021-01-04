<template>
  <div
    class="flex flex-col h-full items-center justify-center text-gray-600 text-20px font-semibold"
  >
    <div>
      Sebelum melakukan diagnosa, pastikan informasi yang diberikan pasien
      sesuai
    </div>
    <div>Klik tombol dibawah ini untuk mulai</div>
    <div class="flex">
      <Button title="Mulai Diagnosa" class="mt-4" :onClick="_onDiagnosa" />
    </div>
  </div>
  <Modal
    v-show="isDiagnosis"
    :onClose="() => setDiagnosa(false)"
    :onSubmit="_onSubmit"
  >
    <template #header v-if="dataReport.length > 0">
      <div v-for="(item, index) in dataReport" :key="index">
        <div class="py-4">Data Pasien ke-{{ index + 1 }}</div>
      </div>
    </template>
    <template #content>
      <!-- Total Diagnosis -->
      <div v-if="dataReport.length === 0" class="w-full my-2 text-gray-600">
        <div class="py-4">
          <div class="text-14px px-4 font-medium">
            Jumlah data yang akan di diagnosa
          </div>
          <Input
            placeholder="1"
            class="my-2"
            :onChange="setTotalData"
            :isError="isError.total"
            errorText="Jumlah data tidak valid"
          />
        </div>
      </div>

      <!-- Biodata Pasien -->
      <div v-if="dataReport.length > 0" class="w-96 my-2 text-gray-600">
        <div v-for="(item, index) in dataReport" :key="index">
          <div class="my-4">
            <div class="text-14px px-4 font-medium">Nama</div>
            <Input
              placeholder="John Doe"
              class="my-2"
              :onChange="setNameData"
              :isError="isError.name"
              errorText="Nama tidak valid"
            />
          </div>
          <div class="my-4">
            <div class="text-14px px-4 font-medium">Alamat</div>
            <Input
              placeholder="Jl. Mawar No. 12 Yogyakarta"
              class="my-2"
              :onChange="setAddressData"
              :isError="isError.address"
              errorText="Alamat tidak valid"
            />
          </div>
          <div class="my-4">
            <div class="text-14px px-4 font-medium">Usia (tahun)</div>
            <Input
              placeholder="20"
              class="my-2"
              :onChange="setAgeData"
              :isError="isError.age"
              errorText="Usia tidak valid"
            />
          </div>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Button from "@/components/button.vue";
import Input from "@/components/input.vue";
import Modal from "@/components/modal.vue";
import { setUserInfo } from "@/utils/Cookies";
import { Diseases, Characteristicts } from "@/utils/Data";
import router from "@/router";
import { NumberOnly } from "@/utils/Library";

@Options({
  components: {
    Button,
    Modal,
    Input,
  },
})
export default class Diagnosis extends Vue {
  formData = {
    total: "",
    name: "",
    address: "",
    age: 1,
  };

  isError = {
    total: false,
    name: false,
    address: false,
    age: false,
  };

  setTotalData(e: any) {
    e.target.value = NumberOnly(e.target.value);
    this.formData.total = e.target.value;
  }

  setNameData(e: any) {
    this.formData.name = e.target.value;
  }

  setAddressData(e: any) {
    this.formData.address = e.target.value;
  }

  setAgeData(e: any) {
    this.formData.age = e.target.value;
  }
  _onDiagnosa() {
    this.setDiagnosa(true);
  }

  _onSubmit() {
    if (!Number(this.formData.total)) this.isError.total = true;
    else this.isError.total = false;

    if (this.formData.total) {
      for (let i = 0; i < Number(this.formData.total); i++) {
        this.dataReport.push({
          id: i + 1,
          name: "",
          address: "",
          age: 1,
        });
      }
    }
  }

  // Modal Diagnosa
  isDiagnosis = false;
  setDiagnosa(value: boolean) {
    this.isDiagnosis = value;
    this.dataReport = [];
  }

  // Data
  get diseasesData() {
    return Diseases;
  }
  get symtomsData() {
    return Characteristicts;
  }

  // Data Diagnosa
  dataReport: Array<{
    id: number;
    name: string;
    address: string;
    age: number;
  }> = [];
  setDataReportName(idx: number) {
    this.dataReport[idx].name = this.formData.name;
    this.dataReport[idx].address = this.formData.address;
    this.dataReport[idx].age = this.formData.age;
  }
}
</script>
