<template>
  <div>
    <header>
      <div class="container">
        <div class="header">
          <div class="header-left">
            <a href="login.html">
              <img class="logo" src="img/header_logo.png" />
            </a>
          </div>

          <div class="header-right">
            <a href="registerAdmin.html">管理者登録</a>
          </div>
        </div>
      </div>
    </header>
    <div class="top-wrapper">
      <div class="container">
        <div class="row register-page">
          <div class="error">エラーメッセージ</div>
          <form class="col s12" id="reg-form">
            <div class="row">
              <div class="input-field col s6">
                <input id="last_name" type="text" class="validate" v-model="lastName" required />
                <label for="last_name">姓</label>
              </div>
              <div class="input-field col s6">
                <input id="first_name" type="text" class="validate" v-model="firstName" required />
                <label for="first_name">名</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <input id="email" type="email" class="validate" v-model="mailAddress" required />
                <label for="email">メールアドレス</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <input
                  id="password"
                  type="password"
                  class="validate"
                  minlength="8"
                  v-model="password"
                  required
                />
                <label for="password">パスワード</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s6">
                <button
                  class="btn btn-large btn-register waves-effect waves-light"
                  v-on:click="registerAdmin"
                  type="button"
                >
                  登録
                  <i class="material-icons right">done</i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <footer>
      <div class="container">
        <div class="footer">
          <div class="footer-center">©️ xxx Inc.</div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
/**
 * 管理者登録機能vueファイル.
 */
import { Component, Vue } from "vue-property-decorator";
@Component
export default class RegisterAdmin extends Vue {
  private errorMessage = "エラーメッセージ";
  private lastName = "";
  private firstName = "";
  private mailAddress = "";
  private password = "";
}
</script>

<style scoped></style>
