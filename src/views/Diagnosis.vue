<template>
  <div
    class="flex flex-col h-full items-center justify-center text-gray-600 text-20px font-semibold relative"
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
      isSuccess || isLastDiseases
        ? ''
        : startQuestion && !isSuccess
        ? 'Tidak'
        : 'Kembali'
    "
    :successText="
      isSuccess || isLastDiseases
        ? 'Oke'
        : startQuestion && !isSuccess
        ? 'Ya'
        : 'Simpan'
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
          v-model="formData.total"
          placeholder="1"
          class="my-2"
          :isError="isError.total"
          errorText="Jumlah data tidak valid"
          :onSubmit="_onSubmit"
          :maxLength="2"
          numberOnly
        />
      </div>

      <!-- Biodata Pasien -->
      <div
        v-else-if="
          dataReport.length > 0 &&
          !startQuestion &&
          !isSuccess &&
          !isLastDiseases
        "
        class="w-96 pb-4 text-gray-600"
      >
        <div class="py-2">
          <div class="text-14px px-4 font-medium">Nama</div>
          <Input
            v-model="formData.name"
            placeholder="John Doe"
            class="my-2"
            :isError="isError.name"
            errorText="Nama tidak valid"
            :onSubmit="_onSubmit"
            capitalize
          />
        </div>
        <div class="py-2">
          <div class="text-14px px-4 font-medium">Alamat</div>
          <Input
            v-model="formData.address"
            placeholder="Jl. Pahlawan No. 12 Yogyakarta"
            class="my-2"
            :isError="isError.address"
            errorText="Alamat tidak valid"
            :onSubmit="_onSubmit"
            capitalize
          />
        </div>
        <div class="py-2">
          <div class="text-14px px-4 font-medium">Usia (tahun)</div>
          <Input
            v-model="formData.age"
            placeholder="20"
            class="my-2"
            :isError="isError.age"
            errorText="Usia tidak valid"
            :onSubmit="_onSubmit"
            :maxLength="2"
          />
        </div>
      </div>

      <!-- Question -->
      <div
        v-else-if="startQuestion && !isSuccess && !isLastDiseases"
        class="w-full text-gray-600 text-14px px-4 py-8 font-medium"
      >
        Apakah pasien mengalami {{ ruleQuestions.name }}?
      </div>

      <!-- Success -->
      <div
        v-else-if="isSuccess || isLastDiseases"
        class="max-w-80 items-center justify-center flex flex-col py-4"
      >
        <svg
          v-if="isLastDiseases"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 122.88 122.87"
          class="w-28 mb-4"
        >
          <g>
            <path
              fill="#F70000"
              d="M33.04,38.05c19.9,19.19,34.44,39.39,49.12,64.97c7.72-8.39,9.65-11.22,3.66-23.28 c-8.88-17.88-33.44-43.55-47.9-48.9c-1.73-0.64-3.32-0.96-4.67-0.92c-0.79,0.03-1.86,0.8-2.58,1.81 C29.06,33.99,30.79,35.88,33.04,38.05L33.04,38.05z"
            />
            <path
              fill="#F70000"
              d="M88.74,15.17c-20.9,28.84-42.87,56.96-70.18,82.96c9.9,8.8,13.67,8.41,23.79-0.31 C59.72,82.84,85.39,46.96,94.31,26.7c1.49-3.38,3.02-8.87-0.81-11.05C91.94,14.76,89.89,14.33,88.74,15.17L88.74,15.17z"
            />
            <path
              fill="#999999"
              d="M51.21,0.87l0.44-0.07L52,0.74l0.1-0.01l0.44-0.07l0.25-0.03l0.19-0.03l0.44-0.06l0.15-0.02l0.29-0.04 l0.44-0.05l0.05-0.01l0.39-0.04l0.39-0.04l0.04,0l0.44-0.04l0.3-0.03l0.14-0.01l0.44-0.04l0.2-0.02l0.24-0.02l0.43-0.03l0.11-0.01 l0.33-0.02l0.44-0.02l0.01,0l0.42-0.02l0.35-0.02l0.08,0l0.44-0.02l0.25-0.01l0.18-0.01l0.43-0.01l0.16,0l0.28,0l0.43,0l0.06,0 l0.37,0l0.4,0l0.03,0l0.43,0.01l0.3,0l0.13,0l0.43,0.01l0.21,0.01l0.22,0.01l0.43,0.02l0.12,0l0.31,0.02l0.43,0.02l0.02,0 l0.41,0.02l0.08,0.01l0.35,0.03l0.43,0.03l0.26,0.02l0.17,0.01l0.59,0.06l0.26,0.03l0.42,0.04l0.07,0.01l0.35,0.04l0.4,0.05l0.02,0 l0.42,0.05l0.3,0.04l0.11,0.02l0.42,0.06l0.21,0.03l0.21,0.03l0.42,0.07l0.12,0.02l0.3,0.05l0.42,0.07l0.03,0l0.39,0.07l0.35,0.06 l0.07,0.01l0.41,0.08l0.26,0.05l0.16,0.03l1.24,0.26l0.07,0.02l0.34,0.08l0.39,0.09l0.02,0l0.71,0.18l0.11,0.02 c0.68,0.17,1.35,0.35,2.02,0.55c-2.82,3.12-5.42,6.1-7.82,8.95c-1.6-0.29-3.22-0.51-4.85-0.65v0c-1.26-0.11-2.52-0.17-3.79-0.18 l-0.05,0c-0.62,0-1.24,0-1.86,0.02l-0.08,0l-0.28,0.01l-0.28,0.01l0,0l-0.28,0.01l-0.28,0.01l-0.09,0.01l-0.19,0.01l-0.45,0.03 l-0.11,0.01l-0.54,0.04l-0.02,0l-0.28,0.02l-0.28,0.02l-0.06,0.01l-0.5,0.05L56.2,10.8l-0.13,0.01l-0.5,0.05l-0.02,0l-0.05,0.01 l-0.28,0.03l-0.28,0.03l-0.04,0.01l-0.25,0.03l-0.28,0.04l-0.12,0.02l-0.16,0.02l-0.28,0.04l-0.21,0.03l-0.08,0.01l-0.28,0.05 l-0.28,0.05l-0.01,0l-0.64,0.11l-0.01,0l-0.63,0.12l-0.01,0l-0.63,0.13l-0.01,0l-0.63,0.14l-0.01,0l-0.62,0.14l-0.01,0l-0.62,0.15 l-0.01,0l-0.62,0.16l-0.01,0l-0.62,0.17l-0.01,0l-0.61,0.17l-0.01,0l-0.61,0.18l-0.01,0l-0.6,0.19l-0.01,0l-0.6,0.2l-0.01,0 l-0.59,0.2l-0.01,0l-0.59,0.21l-0.01,0l-0.59,0.22l-0.01,0l-0.58,0.22l-0.01,0l-1.17,0.47l-0.01,0 c-8.95,3.72-16.47,9.86-21.89,17.5C12.4,42.56,8.9,56.05,11.24,69.91c0.56,3.29,1.42,6.47,2.55,9.49 c-2.03,3.83-4.13,7.67-6.28,11.48l-0.15-0.27l-0.03-0.06l-0.68-1.31l-0.01-0.02l-0.01-0.01l-0.13-0.27l-0.2-0.41l-0.08-0.15 L6.08,88.1l-0.12-0.25l-0.02-0.04l-0.13-0.28l-0.13-0.28l-0.04-0.08l-0.22-0.49l-0.09-0.2l-0.04-0.08l-0.25-0.58l-0.02-0.04 l-0.47-1.13l-0.11-0.28l-0.01-0.02L4.2,83.77l-0.04-0.11l-0.27-0.71l-0.02-0.06l-0.22-0.6l-0.02-0.06l-0.08-0.24l-0.17-0.49 l-0.04-0.12l-0.1-0.3l-0.1-0.3l0-0.01l-0.1-0.29l-0.29-0.92l-0.08-0.26l-0.01-0.04l-0.09-0.31l-0.09-0.31l-0.03-0.08l-0.07-0.23 l-0.09-0.31L2.22,77.8L2.2,77.7l-0.08-0.31l-0.08-0.31l-0.01-0.03l-0.07-0.28l-0.08-0.31l-0.04-0.16l-0.04-0.15l-0.08-0.31 l-0.07-0.29l0-0.02l-0.07-0.31L1.5,74.87l-0.03-0.11l-0.05-0.21l-0.07-0.32l-0.05-0.24l-0.02-0.08l-0.07-0.32l-0.06-0.32 l-0.01-0.05L1.1,72.95l-0.06-0.32L1,72.44l-0.02-0.13l-0.06-0.32l-0.06-0.32c-2.82-16.72,1.4-33.02,10.51-45.82 C20.49,13.03,34.49,3.69,51.21,0.87L51.21,0.87L51.21,0.87z M57.11,112.17L57.11,112.17c1.88,0.16,3.79,0.22,5.71,0.16l0.08,0 l0.28-0.01l0.28-0.01h0l0.28-0.01l0.28-0.01l0.09-0.01l0.19-0.01l0.45-0.03l0.11-0.01l0.54-0.04l0.02,0l0.28-0.02l0.28-0.03 l0.06-0.01l0.5-0.05l0.15-0.02l0.13-0.01l0.5-0.05l0.02,0l0.05-0.01l0.28-0.03l0.28-0.03l0.04-0.01l0.25-0.03l0.28-0.04l0.12-0.02 l0.16-0.02l0.28-0.04l0.21-0.03l0.08-0.01l0.28-0.04l0.28-0.05l0.01,0l0.64-0.11h0.01l0.63-0.12l0.01,0l0.63-0.13l0.01,0l0.63-0.13 l0.01,0l0.62-0.14l0.01,0l0.62-0.15l0.01,0l0.62-0.16h0.01l0.62-0.17h0.01l0.61-0.17l0.01,0l0.61-0.18l0.01,0l0.6-0.19l0.01,0 l0.6-0.2l0.01,0l0.59-0.2l0.01,0l0.59-0.21l0.01,0l0.59-0.21l0.01,0l0.58-0.22l0.01,0l1.17-0.47h0.01 c8.94-3.72,16.47-9.86,21.89-17.5c7.55-10.62,11.05-24.11,8.71-37.97c-0.56-3.29-1.42-6.47-2.55-9.49 c2.03-3.83,4.13-7.67,6.28-11.48l0.15,0.27l0.03,0.06l0.68,1.31l0.01,0.02l0.01,0.01l0.13,0.27l0.2,0.41l0.08,0.15l0.14,0.28 l0.12,0.25l0.02,0.04l0.13,0.28l0.13,0.28l0.04,0.08l0.22,0.49l0.09,0.2l0.04,0.08l0.25,0.58l0.02,0.04l0.47,1.13l0.11,0.28 l0.01,0.02l0.23,0.59l0.04,0.11l0.27,0.71l0.02,0.07l0.22,0.6l0.02,0.06l0.08,0.24l0.17,0.49l0.04,0.12l0.1,0.3l0.1,0.3l0,0.01 l0.1,0.3l0.29,0.92l0.08,0.26l0.01,0.04l0.09,0.31l0.09,0.31l0.03,0.08l0.06,0.23l0.09,0.31l0.06,0.21l0.03,0.1l0.08,0.31 l0.08,0.31l0.01,0.03l0.07,0.28l0.08,0.31l0.04,0.16l0.04,0.15l0.08,0.31l0.07,0.29l0,0.02l0.07,0.31l0.07,0.32l0.03,0.11 l0.05,0.21l0.07,0.32l0.05,0.24l0.02,0.08l0.07,0.32l0.06,0.32l0.01,0.05l0.05,0.27l0.06,0.32l0.04,0.19l0.02,0.14l0.06,0.32 l0.05,0.32c2.82,16.72-1.4,33.01-10.51,45.82c-9.11,12.81-23.11,22.15-39.83,24.97l-0.44,0.07l-0.34,0.05l-0.1,0.02l-0.44,0.07 l-0.25,0.04l-0.19,0.03l-0.44,0.06l-0.15,0.02l-0.29,0.04l-0.44,0.05l-0.05,0.01l-0.39,0.04l-0.39,0.04l-0.04,0l-0.44,0.04 l-0.3,0.03l-0.14,0.01l-0.44,0.04l-0.2,0.02l-0.24,0.02l-0.43,0.03l-0.11,0.01l-0.33,0.02l-0.44,0.02l-0.01,0l-0.42,0.02 l-0.35,0.02l-0.08,0l-0.43,0.02l-0.25,0.01l-0.18,0.01l-0.43,0.01l-0.16,0l-0.28,0l-0.43,0h-0.06h-0.37l-0.4,0h-0.03l-0.43-0.01 l-0.3-0.01l-0.13,0l-0.43-0.01l-0.21-0.01l-0.22-0.01l-0.43-0.02l-0.12,0l-0.31-0.02l-0.43-0.02l-0.02,0l-0.41-0.03l-0.08,0 l-0.35-0.03l-0.43-0.03l-0.26-0.02l-0.17-0.01l-0.59-0.05l-0.26-0.03l-0.42-0.04l-0.07-0.01l-0.35-0.04l-0.4-0.05l-0.02,0 l-0.42-0.05l-0.3-0.04l-0.11-0.02l-0.42-0.06l-0.21-0.03l-0.21-0.03l-0.42-0.07l-0.12-0.02l-0.3-0.05l-0.42-0.07l-0.03,0 l-0.39-0.07l-0.35-0.06l-0.07-0.01l-0.41-0.08l-0.26-0.05l-0.16-0.03l-1.24-0.26l-0.07-0.02l-0.34-0.08l-0.39-0.09l-0.02,0 l-0.71-0.18l-0.1-0.03c-0.68-0.17-1.35-0.36-2.02-0.55c2.82-3.12,5.42-6.1,7.82-8.95C53.85,111.81,55.47,112.03,57.11,112.17 L57.11,112.17z"
            />
          </g>
        </svg>
        <svg
          v-else
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
          Rekam Data Sukses
        </div>
        <div class="text-14px text-center text-gray-600">
          Data Pasien dengan nama "{{ patientName }}"
          <span v-if="isLastDiseases">tidak memiliki penyakit kulit</span
          ><span v-else>berhasil disimpan</span>
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
import { setDataReport, setUserInfo } from "@/utils/Cookies";
import { Diseases, Characteristicts, Rule } from "@/utils/Data";
import router from "@/router";
import { NumberOnly } from "@/utils/Library";
import { ReportInterface, RuleInterface } from "@/utils/Interface";

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
          diseases: "",
          symptoms: [],
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
  dataReport: Array<ReportInterface> = [];

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
  isLastDiseases = false;

  get ruleQuestions(): any {
    if (this.nextIdQuestion)
      return this.ruleData.find((e) => e.id === this.nextIdQuestion);
    else return this.ruleData[0];
  }
  setSuccess(value: boolean) {
    this.isSuccess = value;
  }
  setStartQuestion(value: boolean) {
    this.startQuestion = value;
  }
  setLastDiseases(value: boolean) {
    this.isLastDiseases = value;
  }

  // Next Question
  setNextQuestion(value: string) {
    // Last question
    if (
      this.diseasesData[this.diseasesData.length - 1].id ===
        this.nextIdQuestion &&
      value.toLowerCase() === "end"
    ) {
      this.setLastDiseases(true);
    } else if (value.toLowerCase() === "end") this.setSuccess(true);

    // Not last question
    this.nextIdQuestion = value;
  }

  // Handle Close
  _onClose() {
    // Reset when not yet start question
    if (!this.startQuestion) this._onReset();
    // Answer for "No" after start question
    else this.setNextQuestion(this.ruleQuestions.isFalse);
  }

  // Handle Submit
  _onSubmit() {
    // Input Total Data
    if (this.dataReport.length === 0) return this._onSetTotal();

    if (!this.formData.name) this.isError.name = true;
    else this.isError.name = false;
    if (!this.formData.address) this.isError.address = true;
    else this.isError.address = false;
    if (!this.formData.age) this.isError.age = true;
    else this.isError.age = false;

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
        return this._onSaveAnswer();
      }

      // Next data
      else if (this.formData.indexData < Number(this.formData.total)) {
        return this._onSetDataReport();
      }
    }
  }

  // Temporary Answer
  tempAnswer: Array<any> = [];
  _onSaveAnswer() {
    // Save Answer
    if (this.nextIdQuestion) this.tempAnswer.push(this.nextIdQuestion);
    else this.tempAnswer.push(this.ruleData[0].id);

    // Next question
    this.setNextQuestion(this.ruleQuestions.isTrue);
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

  // Save Data Diagnosa
  _onSaveDataDiagnosa() {
    this.dataReport[this.formData.indexData] = {
      ...this.dataReport[this.formData.indexData],
      diseases: this.tempAnswer[0],
      symptoms: this.tempAnswer.slice(1),
    };
    this.tempAnswer = [];
  }

  _onSetDataReport() {
    // Save data answer
    this._onSaveDataDiagnosa();

    // Reset
    this.setSuccess(false);
    this.setLastDiseases(false);
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
    if (this.formData.indexData === Number(this.formData.total)) {
      // Save to cookies
      setDataReport(this.dataReport)

      // Reset
      this._onReset();
      this.$router.push("/report");
    }
  }
}
</script>
