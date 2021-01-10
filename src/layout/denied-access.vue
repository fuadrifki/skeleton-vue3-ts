<template>
  <div class="relative">
    <router-view class="min-h-screen" />
    <div
      class="absolute bottom-0 text-center py-4 w-full text-12px opacity-75"
    >
      &copy; {{ new Date().getFullYear() }}
      <span
        class="cursor-pointer text-blue-700 hover:text-blue-800 font-semibold hover:underline"
        @click="onCopyright"
        >Fuad Rifki</span
      >. All Right Reserved
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Input from "@/components/input.vue";
import Button from "@/components/button.vue";
import {
  getUserInfo,
  removeAuthCredential,
  setUserInfo,
} from "@/utils/Cookies";
import router from "@/router";

@Options({
  components: {
    Input,
    Button,
  },
})
export default class Layout extends Vue {
  _onToMenu(path: string) {
    router.push(path);
  }

  onCopyright() {
    window.open("https://github.com/fuadrifki");
  }
}
</script>
