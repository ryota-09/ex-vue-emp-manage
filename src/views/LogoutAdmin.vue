<template>
  <div>
    <div>ログアウト中.....</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";

@Component
export default class LogoutAdmin extends Vue {
  /**
   * ログアウトする.
   * @returns プロミスオブジェクト
   */
  async created(): Promise<void>{
    const res = await axios.get("http://153.127.48.168:8080/ex-emp-api/logout");
    if (res.data.status === "success") {
      this.$store.commit("isLogedinHandler");
      this.$router.push("/loginAdmin");
      return;
    }
  }
}
</script>

<style scoped>

</style>
