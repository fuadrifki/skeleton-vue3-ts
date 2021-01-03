<template>
  <div
    class="flex flex-row h-screen max-h-screen overflow-hidden"
    v-if="_checkAuth"
  >
    <div class="w-1/5 bg-blue-200 flex flex-col justify-between">
      <div class="flex flex-col">
        <div
          class="flex flex-row items-center cursor-pointer border-b border-white mb-2 py-4 px-6"
          @click="_onToMenu('/')"
        >
          <img
            src="https://seeklogo.com/images/A/abstract-company-logo-E53BA09D43-seeklogo.com.png"
            alt=""
            class="w-10 mr-3"
          />
          <div class="text-20px font-semibold uppercase">Sistem Pakar</div>
        </div>
        <div v-for="(item, index) in routeList" :key="index">
          <div
            v-if="item.meta.show"
            :class="`${
              currentRoute === item.name ? 'text-blue-700' : 'text-gray-600'
            } py-1.5 hover:text-blue-700 text-14px px-6 font-medium cursor-pointer`"
            @click="() => _onToMenu(item.path)"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
      <div
        class="border-t border-white mt-2 text-14px font-semibold py-1.5 hover:text-blue-600 px-6 text-gray-600 cursor-pointer"
        @click="_onLogout"
      >
        Logout
      </div>
    </div>
    <div class="w-4/5 border-l border-gray-300 bg-gray-100 py-4 pl-4">
      <div
        v-if="currentRoute.toLowerCase() !== 'beranda'"
        class="flex flex-row items-center text-16px text-gray-600 font-semibold py-4 border-b border-gray-300 mr-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
          class="mr-2 w-5 cursor-pointer"
          @click="_onToMenu('/beranda')"
        >
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M9.41 1.91c.326-.325.854-.325 1.18 0l7.5 7.5c.325.326.325.854 0 1.18-.326.325-.854.325-1.18 0l-.244-.245v6.322c0 .442-.175.866-.488 1.178-.312.313-.736.488-1.178.488H5c-.442 0-.866-.175-1.179-.488-.312-.312-.488-.736-.488-1.178v-6.322l-.244.244c-.325.326-.853.326-1.178 0-.326-.325-.326-.853 0-1.178l7.5-7.5zM5 8.68v7.988h2.5v-3.334c0-.442.175-.866.488-1.178.313-.313.736-.488 1.178-.488h1.667c.442 0 .866.175 1.179.488.312.312.488.736.488 1.178v3.334H15V8.679l-5-5-5 5zm5.833 7.988v-3.334H9.166v3.334h1.667z"
            clip-rule="evenodd"
          />
        </svg>
        {{ "/ " + currentRoute }}
      </div>
      <router-view class="pt-4" />
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
export default class LayoutAccess extends Vue {
  get routeList() {
    return router.options.routes;
  }
  get currentRoute() {
    return this.$route.name;
  }
  _onToMenu(path: string) {
    router.push(path);
  }
  get _checkAuth() {
    const auth = getUserInfo();
    if (!auth) {
      this._onToMenu("/");
      removeAuthCredential();
    }
    return true;
  }
  _onLogout() {
    this._onToMenu("/");
    removeAuthCredential();
  }
}
</script>
