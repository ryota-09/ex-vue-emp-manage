<template>
  <div>
    
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Employee } from "@/types/employee";
import axios from "axios";
/**
 * Vuexストアのgetter経由で受け取ったリクエストパラメータのIDから1件の従業員を取得する.
 */
@Component
export default class EmployeeDetail extends Vue { 
  //対象の従業員オブジェクト
  private currentEmployee = new Employee(0, "", "", "", new Date(), "", "", "", "", 0, "", 0);
  //エラーメッセージ
  private errorMessage = "エラーメッセージ";
  //対象の従業員のimageパス
  private currentEmployeeImage = "";
  //対象の従業員の扶養人数
  private currentDependentsCount = 0;

  /**
   * リクエストパラメータから送られてきたIDを使って対象の従業員オブジェクトをセットする.
   * @returns プロミスオブジェクト
   */
  async created(): Promise<void>{
    const employeeId = Number(this.$route.params.id);
    this.currentEmployee = this.$store.getters.getEmployeeByID(employeeId);

    const res = await axios.get("'http://153.127.48.168:8080/ex-emp-api/img/' + this.currentEmployee.image");
    this.currentEmployeeImage = res.data;

    this.currentDependentsCount = this.currentEmployee.dependentsCount;
  }
}
</script>

<style scoped>

</style>
