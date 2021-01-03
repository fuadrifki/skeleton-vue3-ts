<template>
  <div id="app" class="font-poppins">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
@Options({
  name: "App"
})
export default class extends Vue {}
</script>