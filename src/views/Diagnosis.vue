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
    <template #content>
      <div class="w-full my-3 text-gray-600">
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
    </template>
  </Modal>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Button from "@/components/button.vue";
import Input from "@/components/input.vue";
import Modal from "@/components/modal.vue";
import { setUserInfo } from "@/utils/Cookies";
import router from "@/router";

@Options({
  components: {
    Button,
    Modal,
    Input
  },
})
export default class Diagnosis extends Vue {
  formData = {
    total: "",
  };

  isError = {
    total: false,
  };

  setTotalData(e: any) {
    e.target.value = e.target.value.replace(/[^0-9]+/g, "");
    this.formData.total = e.target.value;
  }

  _onDiagnosa() {
    this.setDiagnosa(true);
  }

  _onSubmit() {
    if (!Number(this.formData.total)) this.isError.total = true;
    else this.isError.total = false;

    if (this.formData.total) this.setDiagnosa(true);
  }

  // Modal Diagnosa
  isDiagnosis = false;
  setDiagnosa(value: boolean) {
    this.isDiagnosis = value;
  }
}
</script>
