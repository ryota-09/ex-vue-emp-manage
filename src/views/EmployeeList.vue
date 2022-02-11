<template>
  <div>
    <div class="top-wrapper">
      <div class="container">
        <div>従業員数: {{ employeeCount }} 人</div>
        <div class="row">
          <table class="striped">
            <thead>
              <tr>
                <th>名前</th>
                <th>入社日</th>
                <th>扶養人数</th>
              </tr>
            </thead>

            <tbody>
              <div id="pagination">
                <p><a href="#" v-on:click="showPrev">前のページへ</a></p>
                <p><a href="#" v-on:click="showNext">次のページへ</a></p>
              </div>
              <tr v-for="employee of dispEmployees" v-bind:key="employee.id">
                <td>
                  <router-link :to="'/employeeDetail/' + employee.id">
                    {{ employee.name }}
                  </router-link>
                </td>
                <td>
                  {{ employee.hireDate }}
                </td>
                <td>
                  {{ employee.dependentsCount }}
                </td>
              </tr>
            </tbody>
          </table> 
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Employee } from "@/types/employee";
import { Component, Vue } from "vue-property-decorator";
@Component
export default class EmployeeList extends Vue {
  /**
   * Vuexストアのアクション経由で非同期でWebAPIから従業員一覧を取得する.
   */
  private page = 0;
  private dispEmployeesCount = 10;
  private isStartPage = true;
  private isEndPage = false;
  /**
   * 
   */
  created(): void{
    this.$store.dispatch("getEmployeeList");

    if (this.isLogedin === true){
      this.$router.push("/employeeList");
    } else {
      alert("エラーメッセージ: ログインしてください。")
      this.$router.push("/loginAdmin");
    }
  }
  /////////////ここからページネーションの機能////////////

  showPrev (): void{
    if( this.isStartPage ){
      return;
    }
    this.page--;
  }

  showNext (): void{
    if( this.isEndPage ){
      return;
    }
    this.page++;
  }

  dispEmployees (): Array<Employee>{
    let startPage = this.page * this.dispEmployeesCount;
    return this.employees.slice(startPage, startPage + this.dispEmployeesCount)
  }

  startPageOrNot(): boolean{
    return this.page === 0;
  }

  endPageOrNot(): boolean{
    return (this.page + 1) * this.dispEmployeesCount >= this.employees.length;
  }

  /////////////////ここまでページネーションの機能////////////////

  /**
   * 非同期で取得したVuexストア内の従業員数を取得し返す.
   * @returns 従業員数
   */
  get employeeCount(): number {
    return this.$store.getters.getEmployeeCount;
  }
  /**
   * 非同期で取得したVuexストア内の従業員一覧を取得し返す.
   * @returns 従業員一覧
   */
  get employees(): Array<Employee> {
    return this.$store.getters.getEmployees;
  }
  
  get isLogedin (): boolean{
    return this.$store.getters.getIsLogedin;
  }
}
</script>

<style scoped></style>
