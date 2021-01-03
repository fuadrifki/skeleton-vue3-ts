<template>
  <router-view v-if="_checkAuth" />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Input from "@/components/input.vue";
import Button from "@/components/button.vue";
import { getUserInfo, removeAuthCredential, setUserInfo } from "@/utils/Cookies";
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
  get _checkAuth() {
    const auth = getUserInfo();
    if (auth.name) {
      this._onToMenu("/beranda");
    }
    return true;
  }
}
</script>
