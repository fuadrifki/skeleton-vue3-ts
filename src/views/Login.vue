<template>
  <div class="flex flex-row h-screen max-h-screen overflow-hidden">
    <div class="w-2/5 bg-blue-100 flex items-center justify-center">
      <div class="w-full max-w-96">
        <div class="font-bold text-20px mb-10 text-gray-500 text-center">
          Log In to your account
        </div>
        <div class="w-full my-3 text-gray-600">
          <div class="text-14px px-4 font-medium">Username/Email</div>
          <Input
            v-model="formData.name"
            :isDisable="false"
            placeholder="admin@admin.com"
            class="my-2"
            :isError="isError.name"
            errorText="Username/email tidak valid"
            @keyup.enter="_onLogin"
          />
        </div>
        <div class="w-full my-3 text-gray-600">
          <div class="text-14px px-4 font-medium">Password</div>
          <Input
            v-model="formData.password"
            type="password"
            :isDisable="false"
            placeholder="*****"
            class="my-2"
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

  _onLogin() {
    const username =
      this.formData.name &&
      (this.formData.name === "fuad.rifki_" ||
        this.formData.name === "fuad.rifki_@admin.com");
    const password =
      this.formData.password && this.formData.password === "Fuadrifki111";

    // Handle error
    if (!username) this.isError.name = true;
    else this.isError.name = false;
    if (!password) this.isError.password = true;
    else this.isError.password = false;

      // Handle success
    if (username && password) {
      setUserInfo({ name: this.formData.name });
      router.push("/beranda");
    } 
  }
}
</script>
