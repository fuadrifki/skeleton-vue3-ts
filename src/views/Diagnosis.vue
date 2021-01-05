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
  <Modal
    v-show="isDiagnosis"
    :onClose="_onClose"
    :onSubmit="_onSubmit"
    :cancelText="
      isSuccess ? '' : startQuestion && !isSuccess ? 'Tidak' : 'Kembali'
    "
    :successText="
      isSuccess ? 'Oke' : startQuestion && !isSuccess ? 'Ya' : 'Simpan'
    "
    class="max-w-lg"
  >
    <template #header v-if="dataReport.length > 0 && !isSuccess">
      <div class="text-20px pt-4 text-center text-gray-600 font-semibold">
        Data Pasien ke-{{ formData.indexData + 1 }}
      </div>
    </template>
    <template #content>
      <!-- Total Diagnosis -->
      <div v-if="dataReport.length === 0" class="w-full text-gray-600 py-4">
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
          :onSubmit="_onSubmit"
          :maxLength="2"
        />
      </div>

      <!-- Biodata Pasien -->
      <div
        v-else-if="dataReport.length > 0 && !startQuestion && !isSuccess"
        class="w-96 pb-4 text-gray-600"
      >
        <div class="py-2">
          <div class="text-14px px-4 font-medium">Nama</div>
          <Input
            :value="formData.name"
            placeholder="John Doe"
            class="my-2"
            :onChange="setNameData"
            :isError="isError.name"
            errorText="Nama tidak valid"
            :onSubmit="_onSubmit"
          />
        </div>
        <div class="py-2">
          <div class="text-14px px-4 font-medium">Alamat</div>
          <Input
            :value="formData.address"
            placeholder="Jl. Pahlawan No. 12 Yogyakarta"
            class="my-2"
            :onChange="setAddressData"
            :isError="isError.address"
            errorText="Alamat tidak valid"
            :onSubmit="_onSubmit"
          />
        </div>
        <div class="py-2">
          <div class="text-14px px-4 font-medium">Usia (tahun)</div>
          <Input
            :value="formData.age"
            placeholder="20"
            class="my-2"
            :onChange="setAgeData"
            :isError="isError.age"
            errorText="Usia tidak valid"
            :onSubmit="_onSubmit"
            :maxLength="2"
          />
        </div>
      </div>

      <!-- Question -->
      <div
        v-else-if="startQuestion && !isSuccess"
        class="w-full text-gray-600 text-14px px-4 py-8 font-medium"
      >
        Apakah pasien mengalami {{ ruleQuestions.name }}?
      </div>

      <!-- Success -->
      <div
        v-else-if="isSuccess"
        class="max-w-80 items-center justify-center flex flex-col py-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 117.72 117.72"
          class="w-28 mb-4"
        >
          <g>
            <path
              fill="#12e535"
              class="st0"
              d="M58.86,0c9.13,0,17.77,2.08,25.49,5.79c-3.16,2.5-6.09,4.9-8.82,7.21c-5.2-1.89-10.81-2.92-16.66-2.92 c-13.47,0-25.67,5.46-34.49,14.29c-8.83,8.83-14.29,21.02-14.29,34.49c0,13.47,5.46,25.66,14.29,34.49 c8.83,8.83,21.02,14.29,34.49,14.29s25.67-5.46,34.49-14.29c8.83-8.83,14.29-21.02,14.29-34.49c0-3.2-0.31-6.34-0.9-9.37 c2.53-3.3,5.12-6.59,7.77-9.85c2.08,6.02,3.21,12.49,3.21,19.22c0,16.25-6.59,30.97-17.24,41.62 c-10.65,10.65-25.37,17.24-41.62,17.24c-16.25,0-30.97-6.59-41.62-17.24C6.59,89.83,0,75.11,0,58.86 c0-16.25,6.59-30.97,17.24-41.62S42.61,0,58.86,0L58.86,0z M31.44,49.19L45.8,49l1.07,0.28c2.9,1.67,5.63,3.58,8.18,5.74 c1.84,1.56,3.6,3.26,5.27,5.1c5.15-8.29,10.64-15.9,16.44-22.9c6.35-7.67,13.09-14.63,20.17-20.98l1.4-0.54H114l-3.16,3.51 C101.13,30,92.32,41.15,84.36,52.65C76.4,64.16,69.28,76.04,62.95,88.27l-1.97,3.8l-1.81-3.87c-3.34-7.17-7.34-13.75-12.11-19.63 c-4.77-5.88-10.32-11.1-16.79-15.54L31.44,49.19L31.44,49.19z"
            />
          </g>
        </svg>
        <div class="text-16px py-2 font-semibold text-center text-gray-800">
          Rekam Data Sukses {{ nextIdQuestion }}
        </div>
        <div class="text-14px text-center text-gray-600">
          Data Pasien dengan nama "{{ patientName }}" berhasil disimpan
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
import { Diseases, Characteristicts, Rule, RuleInterface } from "@/utils/Data";
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
    indexData: 0,
    indexRule: 0,
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
  get symptomsData() {
    return Characteristicts;
  }
  get ruleData(): RuleInterface[] {
    return Rule;
  }

  // Data Diagnosa
  dataReport: Array<{
    id: number;
    name: string;
    address: string;
    age: string;
  }> = [];

  // Patient Name
  get patientName() {
    return this.dataReport.length > 0
      ? this.dataReport[this.formData.indexData].name
      : "";
  }

  // Reset Data
  _onReset() {
    this.formData = {
      total: "",
      name: "",
      address: "",
      age: "",
      indexData: 0,
      indexRule: 0,
    };
    this.dataReport = [];
    this.setDiagnosa(false);
    this.setStartQuestion(false);
    this.setSuccess(false);
    this.setNextQuestion("");
  }

  // Question
  startQuestion = false;
  nextIdQuestion = "";
  isSuccess = false;
  setSuccess(value: boolean) {
    this.isSuccess = value;
  }
  setStartQuestion(value: boolean) {
    this.startQuestion = value;
  }
  setNextQuestion(value: string) {
    this.nextIdQuestion = value;
    if (value.toLowerCase() === "end") {
      this.setSuccess(true);
    }
  }
  get ruleQuestions(): any {
    if (this.nextIdQuestion)
      return this.ruleData.find((e) => e.id === this.nextIdQuestion);
    else return this.ruleData[0];
  }

  // Handle Close
  _onClose() {
    // Reset when not yet start question
    if (!this.startQuestion) this._onReset();

    // Answer for "No" after start question
    else this.setNextQuestion(this.ruleQuestions.isFalse);
  }

  // Save Data
  _onSaveDataPatient() {
    this.dataReport[this.formData.indexData] = {
      ...this.dataReport[this.formData.indexData],
      name: this.formData.name,
      address: this.formData.address,
      age: this.formData.age,
    };
  }

  // Handle Submit
  _onSubmit() {
    // Input Total Data
    if (this.dataReport.length === 0) return this._onSetTotal();

    const isValidate =
      this.formData.name && this.formData.address && this.formData.age;

    if (isValidate) {
      // Start Question
      if (!this.startQuestion) {
        this._onSaveDataPatient();
        this.setStartQuestion(true);
      }

      // Next Question
      else if (
        this.startQuestion &&
        this.nextIdQuestion.toLowerCase() !== "end"
      ) {
        return this.setNextQuestion(this.ruleQuestions.isTrue);
      }

      // Next data
      else if (this.formData.indexData < Number(this.formData.total)) {
        return this._onSetDataReport();
      }
    } else {
      if (!this.formData.name) this.isError.name = true;
      else this.isError.name = false;
      if (!this.formData.address) this.isError.address = true;
      else this.isError.address = false;
      if (!this.formData.age) this.isError.age = true;
      else this.isError.age = false;
    }
  }

  _onSetDataReport() {
    this.setSuccess(false);
    this.setStartQuestion(false);
    this.setNextQuestion("");

    // Next Data
    this.formData = {
      total: this.formData.total,
      name: "",
      address: "",
      age: "",
      indexData: this.formData.indexData + 1,
      indexRule: 0,
    };

    // Reset when all data done
    if (this.formData.indexData === Number(this.formData.total))
      this._onReset();
  }
}
</script>
