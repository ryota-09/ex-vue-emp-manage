<template>
  <div>
    <div class="top-wrapper">
      <div class="container">
        <div class="row login-page">
          <div class="col s12 z-depth-6 card-panel">
            <div class="error">エラーメッセージ</div>
            <form class="login-form">
              <div class="row"></div>
              <div class="row">
                <div class="input-field col s12">
                  <i class="material-icons prefix">mail_outline</i>
                  <input class="validate" id="mailAddress" type="email" v-model="mailAddress" />
                  <label
                    for="mailAddress"
                    data-error="wrong"
                    data-success="right"
                    >メールアドレス</label
                  >
                </div>
              </div>
              <div class="row">
                <div class="input-field col s12">
                  <i class="material-icons prefix">lock_outline</i>
                  <input id="password" type="password" v-model="password"/>
                  <label for="password">パスワード</label>
                </div>
              </div>
              <div class="row">
                <div class="input-field col s12">
                  <button
                    class="btn btn-register waves-effect waves-light col s12"
                    v-on:click="loginAdmin"
                    type="button"
                  >
                    ログイン
                  </button>
                </div>
              </div>
              <div class="row">
                <div class="input-field col s6 m6 l6">
                  <p class="margin medium-small">
                    <router-link to="/registerAdmin">管理者登録はこちら</router-link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
@Component
export default class LoginAdmin extends Vue {
  //エラーメッセージ
  private errorMessage = "エラーメッセージ";
  //メールアドレス
  private mailAddress = "";
  //パスワード
  private password = "";

  /**
   * ログインをする.
   */
  async loginAdmin():Promise<void>{
    const res = await axios.post("http://153.127.48.168:8080/ex-emp-api/login", {
      mailAddress: this.mailAddress,
      password: this.password
    });
    if (res.data === "success"){
      console.log(res);
      this.$router.push("/employeeList");
    } else{
      console.log(res);
      this.errorMessage = res.data.message;
      alert("エラーメッセージ:" + this.errorMessage)
    }
  }
}
</script>

<style scoped>

</style>
