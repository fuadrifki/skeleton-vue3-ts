<template>
  <div class="flex flex-row h-screen max-h-screen overflow-hidden">
    <div class="w-2/5 bg-blue-100 flex items-center justify-center">
      <div class="w-full max-w-sm">
        <div class="font-bold text-20px mb-10 text-gray-500 text-center">
          Log In to your account
        </div>
        <div class="w-full my-3 text-gray-600">
          <div class="text-14px px-4 font-medium">Username/Email</div>
          <Input
            :isDisable="false"
            placeholder="admin@admin.com"
            class="my-2"
            :onChange="setUsername"
            :isError="isError.name"
            errorText="Username/email tidak valid"
            @keyup.enter="_onLogin"
          />
        </div>
        <div class="w-full my-3 text-gray-600">
          <div class="text-14px px-4 font-medium">Password</div>
          <Input
            type="password"
            :isDisable="false"
            placeholder="*****"
            class="my-2"
            :onChange="setPassword"
            :isError="isError.password"
            errorText="Password tidak valid"
            @keyup.enter="_onLogin"
          />
        </div>
        <Button title="Login" class="mt-4" :onClick="_onLogin" />
      </div>
    </div>
    <div class="w-3/5">
      <img
        src="https://previews.123rf.com/images/number168/number1681507/number168150700646/42341960-abstract-molecules-technology-background.jpg"
        class="w-full"
        alt=""
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Input from "@/components/input.vue";
import Button from "@/components/button.vue";
import { setUserInfo } from "@/utils/Cookies";
import router from "@/router";

@Options({
  components: {
    Input,
    Button,
  },
})
export default class Login extends Vue {
  formData = {
    name: "",
    password: "",
  };

  isError = {
    name: false,
    password: false,
  };

  setUsername(e: any) {
    this.formData.name = e.target.value;
  }
  setPassword(e: any) {
    this.formData.password = e.target.value;
  }
  _onLogin() {
    const username =
      this.formData.name &&
      (this.formData.name === "admin" ||
        this.formData.name === "admin@admin.com");
    const password =
      this.formData.password && this.formData.password === "12345";
    if (username && password) {
      setUserInfo({ name: this.formData.name });
      router.push("/beranda");
    } 
    if (!username) this.isError.name = true;
    else this.isError.name = false;
    if (!password) this.isError.password = true;
    else this.isError.password = false;
  }
}
</script>
