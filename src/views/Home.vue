<template>
  <div class="flex flex-col h-full items-center justify-center text-gray-600 text-20px font-semibold">
    <img
      src="https://seeklogo.com/images/A/abstract-company-logo-E53BA09D43-seeklogo.com.png"
      alt=""
      class="w-40 mb-4"
    />
    <div>Selamat Datang di Aplikasi</div>
    <div>Sistem Pakar Penyakit Kulit</div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import Input from "@/components/input.vue";
import { setUserInfo } from "@/utils/Cookies";
import router from "@/router";

export default class Home extends Vue {
  formData = {
    name: "",
    password: "",
  };

  setUsername(value: string) {
    this.formData.name = value;
  }
  setPassword(value: string) {
    this.formData.password = value;
  }
  _onLogin() {
    const isValidate =
      (this.formData.name === "admin" ||
        this.formData.name === "admin@admin.com") &&
      this.formData.password === "12345";
    if (isValidate) {
      setUserInfo({ name: this.formData.name });
      router.push("/beranda");
    }
  }
}
</script>
