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

  <!-- Modal Diagnosa -->
  <Modal v-show="isDiagnosis" :onClose="_onReset" :onSubmit="_onSubmit">
    <template #header v-if="dataReport.length > 0">
      <div>
        <div class="py-4">Data Pasien ke-{{ formData.index + 1 }}</div>
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
            :value="formData.total"
            placeholder="1"
            class="my-2"
            :onChange="setTotalData"
            :isError="isError.total"
            errorText="Jumlah data tidak valid"
            :onSubmit="_onSetTotal"
          />
        </div>
      </div>

      <!-- Biodata Pasien -->
      <div v-if="dataReport.length > 0" class="w-96 my-2 text-gray-600">
        <div>
          <div class="my-4">
            <div class="text-14px px-4 font-medium">Nama</div>
            <Input
              :value="formData.name"
              placeholder="John Doe"
              class="my-2"
              :onChange="setNameData"
              :isError="isError.name"
              errorText="Nama tidak valid"
              :onSubmit="_onSetDataReport"
            />
          </div>
          <div class="my-4">
            <div class="text-14px px-4 font-medium">Alamat</div>
            <Input
              :value="formData.address"
              placeholder="Jl. Pahlawan No. 12 Yogyakarta"
              class="my-2"
              :onChange="setAddressData"
              :isError="isError.address"
              errorText="Alamat tidak valid"
              :onSubmit="_onSetDataReport"
            />
          </div>
          <div class="my-4">
            <div class="text-14px px-4 font-medium">Usia (tahun)</div>
            <Input
              :value="formData.age"
              placeholder="20"
              class="my-2"
              :onChange="setAgeData"
              :isError="isError.age"
              errorText="Usia tidak valid"
              :onSubmit="_onSetDataReport"
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
    age: "",
    index: 0,
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
    e.target.value = NumberOnly(e.target.value);
    this.formData.age = e.target.value;
  }
  _onDiagnosa() {
    this.setDiagnosa(true);
  }

  _onSetTotal() {
    if (!Number(this.formData.total)) this.isError.total = true;
    else this.isError.total = false;

    if (this.formData.total) {
      for (let i = 0; i < Number(this.formData.total); i++) {
        this.dataReport.push({
          id: i + 1,
          name: "",
          address: "",
          age: "",
        });
      }
    }
  }

  // Modal Diagnosa
  isDiagnosis = false;
  setDiagnosa(value: boolean) {
    this.isDiagnosis = value;
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
    age: string;
  }> = [];

  _onSetDataReport() {
    this.dataReport[this.formData.index].name = this.formData.name;
    this.dataReport[this.formData.index].address = this.formData.address;
    this.dataReport[this.formData.index].age = this.formData.age;
    this.formData = {
      total: this.formData.total,
      name: "",
      address: "",
      age: "",
      index: this.formData.index + 1,
    };
    if (this.formData.index === Number(this.formData.total)) this._onReset();
  }

  // Reset Data
  _onReset() {
    this.formData = {
      total: "",
      name: "",
      address: "",
      age: "",
      index: 0,
    };
    this.dataReport = [];
    this.setDiagnosa(false);
  }

  // Handle Submit
  _onSubmit() {
    if (this.dataReport.length === 0) this._onSetTotal();
    else if (this.formData.index < Number(this.formData.total))
      this._onSetDataReport();
  }
}
</script>
