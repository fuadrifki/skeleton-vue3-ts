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
        @click="() => setConfirm(true)"
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

  <!-- Modal Diagnosa -->
  <Modal
    v-show="isConfirm"
    :onClose="_onLogout"
    :onSubmit="() => setConfirm(false)"
    cancelText="Ya"
    successText="Tidak"
    class="max-w-lg"
  >
    <template #content>
      <div class="w-80 items-center justify-center flex flex-col py-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 1000"
          class="w-40 mb-4"
        >
          <g>
            <g
              transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)"
            >
              <path
                fill="#F70000"
                d="M4818.1,4991.7c-50.9-10.2-150.6-46.8-223.9-81.4c-122.1-59-303.2-234-2230.4-2163.2C52.2,437.4,172.3,569.7,115.3,252.2c-20.4-114-20.4-170.9,0-284.9c57-317.5-63.1-185.2,2248.7-2494.9c1933.2-1933.2,2108.3-2104.2,2230.4-2163.2c268.6-130.2,545.4-130.2,814,0c122.1,59,299.2,230,2230.3,2163.2C9571.9-596.4,9742.8-419.3,9801.8-297.2c36.6,73.3,75.3,195.4,87.5,270.7c28.5,177.1,0,364.3-87.5,543.3c-59,122.1-230,297.1-2163.2,2230.4c-1599.5,1597.5-2122.5,2110.3-2201.9,2151C5245.5,4997.8,5021.6,5032.4,4818.1,4991.7z M5296.4,4586.8c118-42.7,195.4-118,2118.4-2043.1C9325.7,634.8,9415.2,541.2,9460,425.2c36.7-95.6,46.8-162.8,46.8-305.2s-10.2-209.6-46.8-305.3c-44.8-116-134.3-209.6-2045.2-2118.4C5506-4214.6,5412.4-4304.1,5296.4-4348.9c-170.9-67.2-439.6-67.2-610.5,0c-116,44.8-209.6,134.3-2118.4,2045.1C652.5-390.8,567-303.3,522.3-185.3c-65.1,170.9-65.1,439.6,0,610.5c44.8,116,132.3,205.5,2014.6,2092c1080.6,1082.6,1996.3,1988.2,2032.9,2012.6C4769.3,4653.9,5056.2,4676.3,5296.4,4586.8z"
              />
              <path
                fill="#F70000"
                d="M4706.2,2266.9c-512.8-91.6-854.7-390.7-1003.2-875c-20.4-73.3-44.8-175-52.9-227.9l-14.2-93.6l77.3-12.2c42.7-6.1,128.2-16.3,189.2-22.4c61.1-6.1,144.5-16.3,185.2-22.4l73.3-10.2l36.6,148.6c52.9,219.8,150.6,398.8,282.9,520.9c152.6,138.4,268.6,177.1,531.1,177.1c185.2,0,215.7-6.1,335.8-63.1c168.9-81.4,331.7-238.1,402.9-388.7c46.8-99.7,55-144.5,55-291c0-260.5-38.7-319.5-478.2-752.9c-201.5-199.4-384.6-398.9-417.2-453.8C4801.9-287,4753-468.2,4740.8-728.6l-10.2-240.1h244.2H5219l12.2,189.2c8.1,107.9,32.5,242.2,59,319.5c42.7,126.2,63.1,150.6,455.8,539.3c439.6,437.5,496.5,516.9,567.8,793.7c124.1,488.4-132.3,1019.5-608.5,1251.5c-91.6,44.8-219.8,95.7-286.9,114C5276,2275,4852.7,2293.3,4706.2,2266.9z"
              />
              <path
                fill="#F70000"
                d="M4635-1731.9V-2027h295.1h295.1v295.1v295.1h-295.1H4635V-1731.9z"
              />
            </g>
          </g>
        </svg>
        <div class="text-18px text-center text-gray-800 font-semibold">
          Konfirmasi
        </div>
        <div class="text-14px py-2 text-center text-gray-800">
          Apakah yakin akan keluar?
        </div>
      </div>
    </template>
  </Modal>
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
import Modal from "@/components/modal.vue";

@Options({
  components: {
    Input,
    Button,
    Modal,
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

  // Logout
  isConfirm = false;
  setConfirm(value: boolean) {
    this.isConfirm = value;
  }
  _onLogout() {
    this.setConfirm(false);
    this._onToMenu("/");
    removeAuthCredential();
  }
}
</script>
