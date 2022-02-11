<template>
  <div>
    <div class="top-wrapper">
      <div class="container">
        <div class="row">
          <form>
            <fieldset>
              <legend>従業員情報</legend>
              <table>
                <tr>
                  <th nowrap>従業員名</th>
                  <td>
                    <span>{{ currentEmployee.name }}</span>
                  </td>
                </tr>
                <tr>
                  <th nowrap>写真</th>
                  <td>
                    <img v-bind:src="currentEmployeeImage"/>
                  </td>
                </tr>
                <tr>
                  <th nowrap>性別</th>
                  <td>
                    <span>{{ currentEmployee.gender }}</span>
                  </td>
                </tr>
                <tr>
                  <th nowrap>入社日</th>
                  <td>
                    <span>{{ currentEmployee.hireDate }}</span>
                  </td>
                </tr>
                <tr>
                  <th nowrap>メールアドレス</th>
                  <td>
                    <span>{{ currentEmployee.mailAddress }}</span>
                  </td>
                </tr>
                <tr>
                  <th nowrap>郵便番号</th>
                  <td>
                    <span>{{ currentEmployee.zipCode}}</span>
                  </td>
                </tr>
                <tr>
                  <th nowrap>住所</th>
                  <td>
                    <span>{{ currentEmployee.address }}</span>
                  </td>
                </tr>
                <tr>
                  <th nowrap>電話番号</th>
                  <td>
                    <span>{{ currentEmployee.telephone }}</span>
                  </td>
                </tr>
                <tr>
                  <th nowrap>給料</th>
                  <td>
                    <span>{{ currentEmployee.salary }}円</span>
                  </td>
                </tr>
                <tr>
                  <th nowrap>特性</th>
                  <td>
                    <span
                      >{{ currentEmployee.characteristics }}</span
                    >
                  </td>
                </tr>
                <tr>
                  <th nowrap>扶養人数</th>
                  <td>
                    <div class="input-field col s12">
                      <div class="error">更新できませんでした。({{ errorMessage }})</div>
                      <input
                        id="dependentsCount"
                        type="text"
                        class="validate"
                        value="3"
                        v-model="currentDependentsCount"
                        required
                      />
                      <label for="dependentsCount2">扶養人数</label>
                    </div>
                  </td>
                </tr>
              </table>

              <button class="btn btn-register waves-effect waves-light" v-on:click="update" type="button">
                更新
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
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
  private errorMessage = "";
  //対象の従業員のimageパス
  private currentEmployeeImage = "";
  //対象の従業員の扶養人数
  private currentDependentsCount = 0;
  //変更前の扶養人数(入力値チェック用)
  private previousDependentsCount = 0;

  /**
   * リクエストパラメータから送られてきたIDを使って対象の従業員オブジェクトをセットする.
   * 
   */
   created(): void{
    const employeeId = Number(this.$route.params.id);
    this.currentEmployee = this.$store.getters.getEmployeeByID(employeeId);
    //入力チェックのために変更前の扶養人数をpreviousDependentsCountに格納しておく。
    this.previousDependentsCount = this.currentEmployee.dependentsCount;

    this.currentEmployeeImage = 'http://153.127.48.168:8080/ex-emp-api/img/' + this.currentEmployee.image

    this.currentDependentsCount = this.currentEmployee.dependentsCount;
  }
  /**
   * 扶養人数を更新する.
   * @returns プロミスオブジェクト
   */
  async update (): Promise<void>{
    if ( this.currentDependentsCount === this.previousDependentsCount ){
      alert("エラーメッセージ: 変更されていません。")
      return;
    }
    const res = await axios.post("http://153.127.48.168:8080/ex-emp-api/employee/update",{
      id: this.currentEmployee.id,
      dependentsCount: this.currentDependentsCount
      }
    );
    if (res.data.status === "success") {
      this.$router.push("/employeeList");
    } else {
      this.errorMessage = res.data.message;
      alert("エラーメッセージ:" + this.errorMessage);
    }

  }
}
</script>

<style scoped>

</style>
